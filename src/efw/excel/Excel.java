/**** efw4.X Copyright 2019 efwGrp ****/
package efw.excel;

import static org.apache.poi.util.Units.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.common.usermodel.HyperlinkType;
import org.apache.poi.hssf.usermodel.HSSFEvaluationWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.openxml4j.opc.PackageAccess;
import org.apache.poi.openxml4j.opc.PackagePart;
import org.apache.poi.openxml4j.opc.PackageRelationship;
import org.apache.poi.poifs.crypt.EncryptionInfo;
import org.apache.poi.poifs.crypt.EncryptionMode;
import org.apache.poi.poifs.crypt.Encryptor;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.formula.EvaluationWorkbook;
import org.apache.poi.ss.formula.FormulaParser;
import org.apache.poi.ss.formula.FormulaRenderer;
import org.apache.poi.ss.formula.FormulaRenderingWorkbook;
import org.apache.poi.ss.formula.FormulaType;
import org.apache.poi.ss.formula.ptg.AreaPtg;
import org.apache.poi.ss.formula.ptg.Ptg;
import org.apache.poi.ss.formula.ptg.RefPtgBase;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Hyperlink;
import org.apache.poi.ss.usermodel.PrintSetup;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFEvaluationWorkbook;
import org.apache.poi.xssf.usermodel.XSSFPicture;
import org.apache.poi.xssf.usermodel.XSSFPictureData;
import org.apache.poi.xssf.usermodel.XSSFShape;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFSimpleShape;
import org.apache.poi.xssf.usermodel.XSSFTextParagraph;
import org.apache.poi.xssf.usermodel.XSSFTextRun;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import efw.file.FileManager;
/**
 * Excelオブジェクトを取り扱うクラス。
 * @author Chang Kejun
 *
 */
public final class Excel {
	/**
	 * Excelのパス。
	 */
	private File file;
	/**
	 * 大きいExcelかどうかのフラグ。
	 */
	private boolean isLarge;
	/**
	 * ExcelのPOIオブジェクト。
	 */
	private Workbook workbook;
	/**
	 * コンストラクタ
	 * @param path　Excelの相対パス。
	 * @param workbook　ExcelのPOIオブジェクト。
	 * @throws IOException 
	 * @throws InvalidFormatException 
	 * @throws EncryptedDocumentException 
	 */
	public Excel(File file,boolean isLarge) throws EncryptedDocumentException, InvalidFormatException, IOException {
		//一時ファイルを作成する。
		//引数のfileを一時ファイルにコピーする。
		//一時ファイルでexcelを開く。
		//閉じる際、一時ファイルを削除する。
		File tempFile=File.createTempFile("efw", "");
		FileManager.duplicate(file, tempFile);
		this.file=tempFile;
		this.isLarge=isLarge;
		if (this.isLarge){
			this.workbook = new SXSSFWorkbook(new XSSFWorkbook(tempFile));
		}else{
			this.workbook = WorkbookFactory.create(tempFile);
		}
	}
	/**
	 * ExcelのPOIオブジェクトを削除する。
	 * @throws IOException
	 */
	public void close(){
		try {
			workbook.close();
			this.file.delete();
		} catch (IOException e) {
			//throw e;エラーが発生してもなにもしない
		}
	}
	/**
	 * 一時ファイルの名称をキーとして利用する。
	 * @return
	 */
	public String getKey() {
		return this.file.getName();
	}
	/**
	 * 指定シートの利用されている最大行番号を戻る。0から開始。
	 * @param sheetName　シート名
	 * @return　最大行番号　0から開始
	 */
	public int getMaxRow(String sheetName){
		return this.workbook.getSheet(sheetName).getLastRowNum();
	}
	/**
	 * 指定シートの利用されている最大列番号を戻る。0から開始。
	 * @param sheetName　シート名
	 * @return　最大列番号　0から開始
	 */
	public int getMaxCol(String sheetName){
		return this.workbook.getSheet(sheetName).getLastRowNum();
	}
	/**
	 * セルを取得する。
	 * @param sheetName　シート名
	 * @param position セルの位置　"A0" のように表現する。
	 * @return セルオブジェクトを戻す
	 */
	private Cell getCell(String sheetName, String position){
		Sheet sheet =this.workbook.getSheet(sheetName);
		CellReference reference = new CellReference(position);
        Row row = this.workbook.getSheet(sheetName).getRow(reference.getRow());
        Cell cell = null;
        if (row == null) {
        	row = sheet.createRow(reference.getRow());
       	}
        cell = row.getCell(reference.getCol());
        if (cell==null){
        	cell=row.createCell(reference.getCol());
        }
        return cell;
	}
	/**
	 * セルを取得する。
	 * @param sheetName　シート名
	 * @param rowIndex セルの行インデックス
	 * @param rowIndex セルの列インデックス
	 * @return セルオブジェクトを戻す
	 */
	private Cell getCell(String sheetName, int rowIndex, int colIndex ){
		Sheet sheet =this.workbook.getSheet(sheetName);
        Row row = this.workbook.getSheet(sheetName).getRow(rowIndex);
        Cell cell = null;
        if (row == null) {
        	row = sheet.createRow(rowIndex);
       	}
        cell = row.getCell(colIndex);
        if (cell==null){
        	cell=row.createCell(colIndex);
        }
        return cell;
	}
	
	/**
	 * セルを結合する。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templatePosition　参考するセルの場所。
	 */
	public void setMergedRegion(String sheetName, String position, String templateSheetName, String templatePosition){
		Cell cell = getCell(sheetName,position);
        int rowIndex = cell.getRowIndex();
        int columnIndex = cell.getColumnIndex();
        Cell templateCell = getCell(templateSheetName,templatePosition);
        int templateRowIndex = templateCell.getRowIndex();
		int templateColumnIndex = templateCell.getColumnIndex();
		Sheet sheet = this.workbook.getSheet(sheetName);
		Sheet templateSheet = this.workbook.getSheet(templateSheetName);
		int size = templateSheet.getNumMergedRegions();
		for (int i = 0; i < size; i++) {
			CellRangeAddress range = templateSheet.getMergedRegion(i);
			if (range.isInRange(templateRowIndex, templateColumnIndex)) {
		        Cell lasttemplateCell = getCell(templateSheetName, range.getLastRow(), range.getLastColumn());
				CellRangeAddress cra =new CellRangeAddress(rowIndex, (rowIndex + range.getLastRow() - range.getFirstRow()), columnIndex, (columnIndex + range.getLastColumn() - range.getFirstColumn()));
				CellStyle templateCellStyle = templateCell.getCellStyle();
				CellStyle lasttemplateCellStyle = lasttemplateCell.getCellStyle();
				
				RegionUtil.setBorderBottom(lasttemplateCellStyle.getBorderBottom(), cra, sheet);
				RegionUtil.setBorderLeft(templateCellStyle.getBorderLeft(), cra, sheet);
				RegionUtil.setBorderRight(lasttemplateCellStyle.getBorderRight(), cra, sheet);
				RegionUtil.setBorderTop(templateCellStyle.getBorderTop(), cra, sheet);
				RegionUtil.setBottomBorderColor(lasttemplateCellStyle.getBottomBorderColor(), cra, sheet);
				RegionUtil.setLeftBorderColor(templateCellStyle.getLeftBorderColor(), cra, sheet);
				RegionUtil.setRightBorderColor(lasttemplateCellStyle.getRightBorderColor(), cra, sheet);
				RegionUtil.setTopBorderColor(templateCellStyle.getTopBorderColor(), cra, sheet);
				sheet.addMergedRegion(cra);
				break;
			}
		}
	}
	/**
	 * セルの値を取得する。
	 * @param sheetName　シート名
	 * @param position セルの位置　"A0" のように表現する。
	 * @return
	 */
	public Object get(String sheetName, String position) {
		try {
			Cell cell=getCell(sheetName,position);
			FormulaEvaluator evaluator = workbook.getCreationHelper()
					.createFormulaEvaluator();
			switch (cell.getCellType()) {
			case BOOLEAN:
				return cell.getBooleanCellValue();
			case ERROR:
				return cell.getErrorCellValue();
			case NUMERIC:
				if (DateUtil.isCellDateFormatted(cell)) {
					return cell.getDateCellValue();
				} else {
					return cell.getNumericCellValue();
				}
			case STRING:
				return cell.getStringCellValue();
			case FORMULA:
				CellValue cellValue = evaluator.evaluate(cell);
				switch (cellValue.getCellType()) {
				case BOOLEAN:
					return cellValue.getBooleanValue();
				case ERROR:
					return cellValue.getErrorValue();
				case NUMERIC:
					if (DateUtil.isCellDateFormatted(cell)) {
						return DateUtil.getJavaDate(cellValue.getNumberValue());
					} else {
						return cellValue.getNumberValue();
					}
				case STRING:
					return cellValue.getStringValue();
				case _NONE:
				case BLANK:
				default:
					break;
				}
			case _NONE:
			case BLANK:
			}
		} catch (Exception e) {
		}
		return null;
	}
	/**
	 * シートの印刷範囲を設定。
	 * @param sheetName　シート名。
	 * @param startRow　開始行番号。
	 * @param endRow　終了行番号。
	 * @param startCol 開始列番号。
	 * @param endCol 終了列番号。
	 */
	public void setPrintArea(String sheetName, int startRow, int endRow, int startCol, int endCol){
		Sheet sheet = workbook.getSheet(sheetName);
		workbook.setPrintArea(workbook.getSheetIndex(sheet), startCol, endCol, startRow, endRow);
	}
	/**
	 * シートを作成する。
	 * @param sheetName　シート名。
	 * @param templateSheetName　コピー元シート名。
	 */
	public void createSheet(String sheetName,String templateSheetName){
		if (templateSheetName==null){
			workbook.createSheet(sheetName);
		}else{
			Sheet sheet = workbook.cloneSheet(workbook.getSheetIndex(templateSheetName));
			workbook.setSheetName(workbook.getSheetIndex(sheet.getSheetName()), sheetName);
			Sheet tempSheet = workbook.getSheet(templateSheetName);
			PrintSetup tempPrintSetup = tempSheet.getPrintSetup();
			PrintSetup printSetup = sheet.getPrintSetup();
			//印刷へーダー
			sheet.setRepeatingRows(tempSheet.getRepeatingRows());
			//印刷用紙設定
            printSetup.setPaperSize(tempPrintSetup.getPaperSize());
			//印刷方向
            printSetup.setLandscape(tempPrintSetup.getLandscape());
			//ページ設定の拡大縮小印刷
            printSetup.setFitHeight(tempPrintSetup.getFitHeight());
            printSetup.setFitWidth(tempPrintSetup.getFitWidth());
		}
	}
	/**
	 * シートを削除する。
	 * @param sheetName　シート名。
	 */
	public void removeSheet(String sheetName){
		workbook.removeSheetAt(workbook.getSheetIndex(sheetName));
	}
	/**
	 * シート名の配列を取得する。
	 * @return　シート名の配列
	 */
	public ArrayList<String> getSheetNames(){
		ArrayList<String> allSheetNames = new ArrayList<String>();
        Iterator<Sheet> it = workbook.sheetIterator();

        while (it.hasNext()) {
            Sheet sheet = it.next();
            allSheetNames.add(sheet.getSheetName());
        }
        return allSheetNames;		
	}
	/**
	 * セルにリンクを追加する
	 * @param sheetName リンクを追加するセルが所属するシート名
	 * @param position リンクを追加するセル名
	 * @param linkUrl リンクした先名 "#'シート名'!A1"のように
	 */
	public void setLink(String sheetName,String position,String linkUrl){
		
		CreationHelper ch = workbook.getCreationHelper();
		Hyperlink link = null;
		if(linkUrl.startsWith("mailto:")){
			link = ch.createHyperlink(HyperlinkType.EMAIL);
		}else if(linkUrl.startsWith("http:") || linkUrl.startsWith("https:")){
			link = ch.createHyperlink(HyperlinkType.URL);
		}else if(linkUrl.startsWith("#'") && linkUrl.indexOf("'!")!=(-1)){
			link = ch.createHyperlink(HyperlinkType.DOCUMENT);
		}else{
			link = ch.createHyperlink(HyperlinkType.FILE);
		}
		link.setAddress(linkUrl);
		Cell cell=this.getCell(sheetName, position);
		cell.setHyperlink(link);
	}
	/**
	 * シートの順番を設定する。
	 * @param sheetName　シート名。
	 * @param order　順番。　0　から。
	 */
	public void setSheetOrder(String sheetName,int order){
		workbook.setSheetOrder(sheetName,order);
	}
	/**
	 * シートをActive設定する。
	 * @param sheetName　シート名。
	 */
	public void setActiveSheet(String sheetName){
        Iterator<Sheet> it = workbook.sheetIterator();
        while (it.hasNext()) {
            Sheet sheet = it.next();
            if (sheet.isSelected()) {
                sheet.setSelected(false);
            }
        }
		workbook.setActiveSheet(workbook.getSheetIndex(sheetName));
	}
	/**
	 * 保存する。
	 * @param path 保存先のパスファイル名。storageからの相対パス。
	 * @throws GeneralSecurityException 
	 * @throws InvalidFormatException 
	 */
	public void save(String path,String password){
		File fileNewExcel = FileManager.get(path);
		File filePath=new File(fileNewExcel.getParent());
		if (!filePath.exists()) {
			filePath.mkdirs();
		}
    	//2003の場合 passwordを設定するやりかた
    	if (password!=null && !"".equals(password) && this.workbook instanceof HSSFWorkbook){
    		HSSFWorkbook hwb = (HSSFWorkbook) this.workbook;
    		hwb.writeProtectWorkbook(password, "");
    	}
		FileOutputStream out = null;
        try {
            out = new FileOutputStream(fileNewExcel);
            workbook.setForceFormulaRecalculation(true);
            workbook.write(out);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                System.out.println(e.toString());
            }
        }
    	//2007の場合
        if (password!=null && !"".equals(password) && this.workbook instanceof XSSFWorkbook){
        	POIFSFileSystem pOIFSFileSystem=null;
    		FileOutputStream fileOutputStream = null;
    		OutputStream outputStream = null;
        	OPCPackage oPCPackage=null;
        	try {
        		pOIFSFileSystem = new POIFSFileSystem();
            	Encryptor encryptor = (new EncryptionInfo(EncryptionMode.agile)).getEncryptor();
            	encryptor.confirmPassword(password);
            	try{
                	oPCPackage = OPCPackage.open(fileNewExcel, PackageAccess.READ_WRITE);
                	outputStream = encryptor.getDataStream(pOIFSFileSystem);
                	oPCPackage.save(outputStream);
            	}finally{
            		try {
            			outputStream.close();
            		}catch(IOException e) {
            			e.printStackTrace();
            		}
            		try {
            			oPCPackage.close();
            		}catch(IOException e) {
            			e.printStackTrace();
            		}
            	}
            	fileOutputStream = new FileOutputStream(fileNewExcel);
    		    pOIFSFileSystem.writeFilesystem(fileOutputStream);
        	} catch (InvalidFormatException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (GeneralSecurityException e) {
				e.printStackTrace();
			}finally{
				try {
					fileOutputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
            	try {
					pOIFSFileSystem.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
	        }
    	}
	}
	/**
	 * セルに数字の値を設定する
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param value 値。
	 */
	public void setCellDoubleValue(String sheetName, String position, Double value){
		Cell cell=this.getCell(sheetName, position);
		cell.setCellValue(value);
	}
	/**
	 * セルに日付の値を設定する
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param value 値。
	 */
	public void setCellDateValue(String sheetName, String position, Date value){
		Cell cell=this.getCell(sheetName, position);
		cell.setCellValue(value);
	}
	/**
	 * セルに文字列の値を設定する
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param value 値。
	 */
	public void setCellStringValue(String sheetName, String position, String value){
		Cell cell=this.getCell(sheetName, position);
		cell.setCellValue(value);
	}
	/**
	 * セルにブルの値を設定する
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param value 値。
	 */
	public void setCellBooleanValue(String sheetName, String position, Boolean value){
		Cell cell=this.getCell(sheetName, position);
		cell.setCellValue(value);
	}
	///////////////////////////////////
	/**
	 * セルに書式を設定する。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templatePosition　参考するセルの場所。
	 */
	public void setCellStyle(String sheetName, String position, String templateSheetName, String templatePosition){
		Cell cell=this.getCell(sheetName, position);
		Cell templateCell=this.getCell(templateSheetName, templatePosition);
		cell.setCellStyle(templateCell.getCellStyle());
	}
	
	/**
	 * セルに計算式を設定する。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templatePosition　参考するセルの場所。
	 */
	
	public void setCellFormula(String sheetName, String position, String templateSheetName, String templatePosition){
		//Style
		Cell cell=this.getCell(sheetName, position);
		Cell templateCell=this.getCell(templateSheetName, templatePosition);
		
		if(templateCell.getCellType()==CellType.FORMULA){
			String formula = templateCell.getCellFormula();
	        EvaluationWorkbook ew;
	        FormulaRenderingWorkbook rw;
	        Ptg[] ptgs;
	        if (this.workbook instanceof HSSFWorkbook) {
	            ew = HSSFEvaluationWorkbook.create((HSSFWorkbook) this.workbook);
	            ptgs = FormulaParser.parse(formula, (HSSFEvaluationWorkbook) ew, FormulaType.CELL, this.workbook.getSheetIndex(sheetName));
	            rw = (HSSFEvaluationWorkbook) ew;
	        } else {
	            ew = XSSFEvaluationWorkbook.create((XSSFWorkbook) this.workbook);
	            ptgs = FormulaParser.parse(formula, (XSSFEvaluationWorkbook) ew, FormulaType.CELL, this.workbook.getSheetIndex(sheetName));
	            rw = (XSSFEvaluationWorkbook) ew;
	        }
	        for (Ptg ptg : ptgs) {
	            // 座標の計算
	            int shiftRows = cell.getRowIndex() - templateCell.getRowIndex();
	            int shiftCols = cell.getColumnIndex() - templateCell.getColumnIndex();
	            if (ptg instanceof RefPtgBase) {
	                RefPtgBase ref = (RefPtgBase) ptg;
	                if (ref.isColRelative()) {
	                    ref.setColumn(ref.getColumn() + shiftCols);
	                }
	                if (ref.isRowRelative()) {
	                    ref.setRow(ref.getRow() + shiftRows);
	                }
	            } else if (ptg instanceof AreaPtg) {
	                AreaPtg ref = (AreaPtg) ptg;
	                if (ref.isFirstColRelative()) {
	                    ref.setFirstColumn(ref.getFirstColumn() + shiftCols);
	                }
	                if (ref.isLastColRelative()) {
	                    ref.setLastColumn(ref.getLastColumn() + shiftCols);
	                }
	                if (ref.isFirstRowRelative()) {
	                    ref.setFirstRow(ref.getFirstRow() + shiftRows);
	                }
	                if (ref.isLastRowRelative()) {
	                    ref.setLastRow(ref.getLastRow() + shiftRows);
	                }
	            }
	        }
	        cell.setCellFormula(FormulaRenderer.toFormulaString(rw, ptgs));
		}
	}
	

	
	/**
	 * 囲まれるかどうかを判断する。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param checkpointXRate 囲まれるエリアの中央点がセルの幅と比較する割合。0.5は中央。
	 * @param checkpointYRate 囲まれるエリアの中央点がセルの高さと比較する割合。0.5は中央。 
	 * @return
	 */
	public boolean isEncircled(String sheetName,String position,double checkpointXRate,double checkpointYRate){
		Cell cell=this.getCell(sheetName, position);
		int cellrow=cell.getRowIndex();
		int cellcol=cell.getColumnIndex();

		XSSFSheet sheet = ((XSSFWorkbook) (this.workbook)).getSheet(sheetName);
		XSSFDrawing patriarch = sheet.getDrawingPatriarch();
		if(patriarch==null) return false;
    	int checkPointX =(int)(checkpointXRate * cell.getSheet().getColumnWidth(cell.getColumnIndex()) / 256 * 8 * EMU_PER_PIXEL);
    	int checkPointY = (int)(checkpointYRate * cell.getRow().getHeight() / 20.0D * EMU_PER_POINT);
        List<XSSFShape> shapes=patriarch.getShapes();
        for (XSSFShape shape : shapes) {
            XSSFClientAnchor a = (XSSFClientAnchor)shape.getAnchor();
            if (checkEncircled(cellrow,cellcol,checkPointX,checkPointY,a.getRow1(),a.getCol1(),a.getRow2(),a.getCol2(),a.getDx1(),a.getDy1(),a.getDx2(),a.getDy2())) return true;
        }

        return false;
	}
	/**
	 * isEncircledに利用する内部関数。囲まれたかどうか判断する。
	 * @param cellrow セルの行番号
	 * @param cellcol　セルの列番号
	 * @param offsetYInEMU 囲まれるエリアの中央点横座標(EMU)
	 * @param offsetXInEMU　囲まれるエリアの中央点縦座標(EMU)
	 * @param row1 shape開始セルの行番号
	 * @param col1 shape開始セルの列番号
	 * @param row2 shape終了セルの行番号
	 * @param col2 shape開始セルの列番号
	 * @param dx1 shape開始セル内、shapeの左上位置の横座標(EMU)
	 * @param dy1 shape開始セル内、shapeの左上位置の縦座標(EMU)
	 * @param dx2 shape終了セル内、shapeの左上位置の横座標(EMU)
	 * @param dy2 shape終了セル内、shapeの左上位置の縦座標(EMU)
	 * @return　true囲まれる false囲まれない
	 */
	private boolean checkEncircled(
			int cellrow,int cellcol,int checkPointX,int checkPointY,
			int row1,int col1,int row2,int col2, int dx1,int dy1,int dx2,int dy2
		){
        boolean rowFlag=false;
        boolean colFlag=false;
        if (row1<cellrow && cellrow<row2){
        	rowFlag=true;
        }else if(row1==cellrow && row2==cellrow){
        	if(dy1<=checkPointY && checkPointY<=dy2)rowFlag=true;
        }else if(row1==cellrow){
        	if(dy1<=checkPointY)rowFlag=true;
        }else if(row2==cellrow){
        	if(checkPointY<=dy2)rowFlag=true;
        }
        if (col1<cellcol && cellcol<col2){
        	colFlag=true;
        }else if(col1==cellcol && col2==cellcol){
        	if(dx1<=checkPointX && checkPointX<=dx2)colFlag=true;
        }else if(col1==cellcol){
        	if(dx1<=checkPointX)colFlag=true;
        }else if(col2==cellcol){
        	if(checkPointX<=dx2)colFlag=true;
        }
        if (rowFlag&&colFlag){
            return true;
        }else{
            return false;
        }
	}
	/**
	 * 指定sheetの指定セルの指定位置に、図形をコピーして置く。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templateShapeName　参考する図形の名称。
	 * @param shapeCenterXRate　新しい図形の中心位置はセルの幅との比率、デフォルト0.5。
	 * @param shapeCenterYRate　新しい図形の中心位置はセルの高さとの比率、デフォルト0.5。　
	 * @param shapeWidthRate　新しい図形の幅はセルの幅との比率、デフォルト0.5。
	 * @param shapeHeightRate　新しい図形の幅はセルの高さとの比率、デフォルト0.5。
	 */
	public void encircle(String sheetName,String position,String templateSheetName,String templateShapeName,
			double shapeCenterXRate,double shapeCenterYRate,double shapeWidthRate,double shapeHeightRate){
		Cell cell=this.getCell(sheetName, position);
	    int cellrow=cell.getRowIndex();
	    int cellcol=cell.getColumnIndex();

    	XSSFSheet sheet = (XSSFSheet) this.workbook.getSheet(sheetName);
    	XSSFSheet templateSheet=(XSSFSheet) this.workbook.getSheet(templateSheetName);
    	List<XSSFShape> templateShapes=((XSSFDrawing) templateSheet.getDrawingPatriarch()).getShapes();
        for (XSSFShape templateShape : templateShapes) {
    		if (templateShape instanceof XSSFSimpleShape && 
    				templateShapeName.equals(templateShape.getShapeName())) {
                XSSFDrawing patriarch=sheet.getDrawingPatriarch();
    			if(patriarch==null) patriarch = sheet.createDrawingPatriarch();
    			XSSFClientAnchor anchor=(XSSFClientAnchor)(cloneShape(patriarch,(XSSFSimpleShape) templateShape,null).getAnchor());

    			int cellWidth=(int)(cell.getSheet().getColumnWidth(cell.getColumnIndex()) / 256 * 8 * EMU_PER_PIXEL);
    		    int cellHeight=(int)(cell.getRow().getHeight() / 20.0D * EMU_PER_POINT);
    		    double shapeWidth=cellWidth*shapeWidthRate;
    		    double shapeHeight=cellHeight*shapeHeightRate;
    		    
    			int dx1= (int)(cellWidth*shapeCenterXRate-shapeWidth/2);
    			int dx2= (int)(dx1+shapeWidth);
    			int dy1= (int)(cellHeight*shapeCenterYRate-shapeHeight/2);
    			int dy2= (int)(dy1+shapeHeight);
    			
    			anchor.setRow1(cellrow);
    			anchor.setRow2(cellrow);
    			anchor.setCol1(cellcol);
    			anchor.setCol2(cellcol);
    			anchor.setDx1(dx1);
    			anchor.setDx2(dx2);
    			anchor.setDy1(dy1);
    			anchor.setDy2(dy2);

    			break;
			}
        }
	}
	
	/**
	 * 指定sheetの指定セルの指定位置に、図形をコピーして置く。
	 * @param sheetName シート名。
	 * @param position セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templateShapeName　参考する図形の名称。
	 * @param value 新しい図形の内容。
	 * @param x 新しい図形の左上位置はセルの幅との長さ、デフォルトが参考するシートの図形と同じ。
	 * @param y 新しい図形の左上位置はセルの高さとの高さ、デフォルトが参考するシートの図形と同じ。　
	 * @param width 新しい図形の長さ。
	 * @param height 新しい図形の高さ。
	 */
	public void addShapeInCell(String sheetName,String position,String templateSheetName,String templateShapeName,
			String value,int x,int y,int width,int height){
		CellReference reference = new CellReference(position);
	    int cellrow=reference.getRow();
	    int cellcol=reference.getCol();

    	XSSFSheet sheet = (XSSFSheet) this.workbook.getSheet(sheetName);
    	XSSFSheet templateSheet=(XSSFSheet) this.workbook.getSheet(templateSheetName);
    	List<XSSFShape> templateShapes=((XSSFDrawing) templateSheet.getDrawingPatriarch()).getShapes();
        for (XSSFShape templateShape : templateShapes) {
        	if (templateShapeName.equals(templateShape.getShapeName())) {
                XSSFDrawing patriarch=sheet.getDrawingPatriarch();
    			if(patriarch==null) patriarch = sheet.createDrawingPatriarch();
    			XSSFShape shape=cloneShape(patriarch,templateShape,value);
    			XSSFClientAnchor anchor=(XSSFClientAnchor)(shape.getAnchor());
    			int dx1=EMU_PER_PIXEL*x;
    			int dy1=EMU_PER_PIXEL*y;
    			int dx2=0;
    			int dy2=0;
    			width=width*EMU_PER_PIXEL;
    			height=height*EMU_PER_PIXEL;
    			if(x==0){
    				dx1=anchor.getDx1();
    			}
    			if(y==0){
    				dy1=anchor.getDy1();
    			}
    			if(width==0){
    				width=anchor.getDx2()-anchor.getDx1();
    			}
    			if(height==0){
    				height=anchor.getDy2()-anchor.getDy1();
    			}
    			dx2=width+dx1;
    			dy2=height+dy1;
    			anchor.setRow1(cellrow);
    			anchor.setRow2(cellrow);
    			anchor.setCol1(cellcol);
    			anchor.setCol2(cellcol);
    			anchor.setDx1(dx1);
    			anchor.setDy1(dy1);
    			anchor.setDx2(dx2);
    			anchor.setDy2(dy2);
    			break;
			}
        }
	}
	
	/**
	 * 指定sheetの指定セルの指定位置に、図形をコピーして置く。
	 * @param sheetName シート名。
	 * @param firstCellPosition セルの場所、"A1"のように。
	 * @param lastCellPosition セルの場所、"A1"のように。
	 * @param templateSheetName　参考するシート名。
	 * @param templateShapeName　参考する図形の名称。
	 * @param value 新しい図形の内容。
	 * @param dx1 新しい図形の左上位置はセルの幅との長さ、デフォルトが参考するシートの図形と同じ。
	 * @param dy1 新しい図形の左上位置はセルの高さとの高さ、デフォルトが参考するシートの図形と同じ。
	 * @param dx2 新しい図形の右下位置はセルの幅との長さ、デフォルトが参考するシートの図形と同じ。
	 * @param dy2 新しい図形の右下位置はセルの高さとの高さ、デフォルトが参考するシートの図形と同じ。
	 */
	public void addShapeInRange(String sheetName,String firstCellPosition,String lastCellPosition,String templateSheetName,String templateShapeName,
			String value,int dx1,int dy1,int dx2,int dy2){
		CellReference reference = new CellReference(firstCellPosition);
	    int firstCellrow=reference.getRow();
	    int firstCellcol=reference.getCol();
		reference = new CellReference(lastCellPosition);
	    int lastCellrow=reference.getRow();
	    int lastCellcol=reference.getCol();

    	XSSFSheet sheet = (XSSFSheet) this.workbook.getSheet(sheetName);
    	XSSFSheet templateSheet=(XSSFSheet) this.workbook.getSheet(templateSheetName);
    	List<XSSFShape> templateShapes=((XSSFDrawing) templateSheet.getDrawingPatriarch()).getShapes();
        for (XSSFShape templateShape : templateShapes) {
        	if (templateShapeName.equals(templateShape.getShapeName())) {
                XSSFDrawing patriarch=sheet.getDrawingPatriarch();
    			if(patriarch==null) patriarch = sheet.createDrawingPatriarch();
    			XSSFShape shape=cloneShape(patriarch,templateShape,value);
    			XSSFClientAnchor anchor=(XSSFClientAnchor)(shape.getAnchor());
    			anchor.setRow1(firstCellrow);
    			anchor.setRow2(lastCellrow);
    			anchor.setCol1(firstCellcol);
    			anchor.setCol2(lastCellcol);
    			dx1=dx1*EMU_PER_PIXEL;
    			dy1=dy1*EMU_PER_PIXEL;
    			dx2=dx2*EMU_PER_PIXEL;
    			dy2=dy2*EMU_PER_PIXEL;
    			if(dx1==0){
    				dx1=anchor.getDx1();
    			}
    			if(dy1==0){
    				dy1=anchor.getDy1();
    			}
    			if(dx2==0){
    				dx2=anchor.getDx2();
    			}
    			if(dy2==0){
    				dy2=anchor.getDy2();
    			}
    			anchor.setDx1(dx1);
    			anchor.setDy1(dy1);
    			anchor.setDx2(dx2);
    			anchor.setDy2(dy2);
    			break;
			}
        }
	}	
	
	/**
	 * 行を追加
	 * @param sheetName シート名
	 * @param startRow このインデックスの上に、行を追加 
	 * @param n 追加する行数
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void addRow(String sheetName,int startRow,int n){
		Sheet sheet = this.workbook.getSheet(sheetName);
		// 行を追加前のシートにすべての結合するセルの範囲情報を取得
		List<CellRangeAddress> originMerged = sheet.getMergedRegions();
		ArrayList originRow = new ArrayList();
		// 行を追加前のシートにすべて行のインデックスと行高を取得
		for (Row row : sheet) {
			HashMap temp = new HashMap();
			temp.put("rowNum",row.getRowNum());
			temp.put("height",row.getHeight());
			originRow.add(temp);
		}
		// すべての結合するセルを削除
		for (int i=0;i<originMerged.size();i++) {
			sheet.removeMergedRegion(0);
        }
		if (startRow <= sheet.getLastRowNum()) {
		    sheet.shiftRows(startRow, sheet.getLastRowNum(), n);
		}
		// 行を追加後のシートにすべての結合するセルの範囲を再設定
		for (int i=0;i<originMerged.size();i++) {
			CellRangeAddress range = originMerged.get(i);
			if(range.getFirstRow() >= startRow) {
				range.setFirstRow(range.getFirstRow() + n);
			}
			if(range.getLastRow() >= startRow){
				range.setLastRow(range.getLastRow() + n);
			}
			sheet.addMergedRegion(range);
		}
		// 追加後の行高を再設定
		for (int i=1;i<originRow.size();i++) {
			HashMap temp = (HashMap)originRow.get(i);
			int rowNum = (Integer) temp.get("rowNum");
			short height = (Short) temp.get("height");
			if (rowNum >= startRow) {
				Row row = sheet.getRow(rowNum + n);
				row.setHeight(height);
			}
		}
	}
	/**
	 * 行を削除 インデックスは 「0」から 「endRow」の行を含めない
	 * @param sheetName シート名
	 * @param startRow 削除する行の開始インデックス from 0
	 * @param n 削除する行数
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void delRow(String sheetName,int startRow,int n){
		Sheet sheet = this.workbook.getSheet(sheetName);
		// 行を削除前のシートにすべての結合するセルの範囲情報を取得
		List<CellRangeAddress> originMerged = sheet.getMergedRegions();
		ArrayList originRow = new ArrayList();
		// 行を削除前のシートにすべて行のインデックスと行高を取得
		for (Row row : sheet) {
			HashMap temp = new HashMap();
			temp.put("rowNum",row.getRowNum());
			temp.put("height",row.getHeight());
			originRow.add(temp);
		}
		// すべての結合するセルを削除
		for (int i=0;i<originMerged.size();i++) {
			sheet.removeMergedRegion(0);
        }
		for(int i=0;i<n;i++) {
			sheet.removeRow(sheet.getRow(startRow+i));
		}
		if(sheet.getLastRowNum() >= startRow+n) {
			sheet.shiftRows(startRow+n, sheet.getLastRowNum(), -n);
		}
		// 行を削除後のシートにすべての結合するセルの範囲を再設定
		for (int i=0;i<originMerged.size();i++) {
			CellRangeAddress range = originMerged.get(i);
			if (range.getFirstRow() < startRow) {
			}else if(range.getFirstRow() >= startRow && range.getFirstRow() < startRow + n){
				range.setFirstRow(startRow);
			}else if(range.getFirstRow() >= startRow + n){
				range.setFirstRow(range.getFirstRow() - n);
			}
			if (range.getLastRow() < startRow) {
			}else if(range.getLastRow() >= startRow && range.getLastRow() < startRow + n){
				range.setLastRow(startRow - 1);
			}else if(range.getLastRow() >= startRow + n){
				range.setLastRow(range.getLastRow() - n);
			}
			if (range.getLastRow() >= range.getFirstRow()) {
				sheet.addMergedRegion(range);
			}
		}
		// 削除後の行高を再設定
		for (int i=1;i<originRow.size();i++) {
			HashMap temp = (HashMap)originRow.get(i);
			int rowNum = (Integer) temp.get("rowNum");
			short height =(Short) temp.get("height");
			if (rowNum >= startRow + n) {
				Row row = sheet.getRow(rowNum - n);
				row.setHeight(height);
			}
		}
	}

	/**
	 * 行を非表示になる   インデックスは 「0」から 「endRow」の行を含めない
	 * @param sheetName シート名
	 * @param startRow 非表示する行の開始インデックス from 0
	 * @param endRow 非表示する行の終了インデックス from 0
	 * @return
	 */
	public void hideRow(String sheetName,int startRow,int endRow){
		Sheet sheet = this.workbook.getSheet(sheetName);
		for(int i=startRow;i<=endRow;i++) {
	        Row row = this.workbook.getSheet(sheetName).getRow(i);
	        if (row == null) {
	        	row = sheet.createRow(i);
	       	}
			sheet.getRow(i).setZeroHeight(true);
		}
	}
	
	/**
	 * 行を表示になる   行数は 「0」から 「endRow」の行を含めない
	 * @param sheetName シート名
	 * @param startRow 表示する行の開始インデックス from 0
	 * @param endRow 表示する行の終了インデックス from 0
	 * @return
	 */
	public void showRow(String sheetName,int startRow,int endRow){
		Sheet sheet = this.workbook.getSheet(sheetName);
		for(int i=startRow;i<=endRow;i++) {
			sheet.getRow(i).setZeroHeight(false);
		}
	}
	/**
	 * 列の非表示
	 * @param sheetName シート名
	 * @param startCol 非表示する列の開始インデックス from 0
	 * @param endCol 非表示する列の終了インデックス from 0
	 * @return
	 */
	public void hideCol(String sheetName,int startCol,int endCol){
		Sheet sheet = this.workbook.getSheet(sheetName);
		for(int i=startCol;i<=endCol;i++){
			sheet.setColumnHidden(i, true);
		}
	}
	/**
	 * 列の表示
	 * @param sheetName シート名
	 * @param startCol 表示する列の開始インデックス from 0
	 * @param endCol 表示する列の終了インデックス from 0
	 * @return
	 */
	public void showCol(String sheetName,int startCol,int endCol){
		Sheet sheet = this.workbook.getSheet(sheetName);
		for(int i=startCol;i<=endCol;i++){
			sheet.setColumnHidden(i, false);
		}
	}
	/**
	 * シートの非表示
	 * @param sheetName シート名
	 */
	public void hideSheet(String sheetName){
		this.workbook.setSheetHidden(this.workbook.getSheetIndex(sheetName), true);
	}
	/**
	 * シートの表示
	 * @param sheetName シート名
	 */
	public void showSheet(String sheetName){
		this.workbook.setSheetHidden(this.workbook.getSheetIndex(sheetName), false);
	}
	/**
	 * 画像置換
	 * @param sheetName
	 * @param pictureName
	 * @param newPicturePath
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 * @throws ClassNotFoundException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 * @throws IOException 
	 */
    @SuppressWarnings({ "unchecked", "rawtypes" })
	public void replacePicture(String sheetName,String shapeName,String newPicturePath) throws NoSuchMethodException, SecurityException, ClassNotFoundException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException {
    	XSSFSheet sheet = (XSSFSheet) this.workbook.getSheet(sheetName);
    	List<XSSFShape> shapes=((XSSFDrawing) sheet.getDrawingPatriarch()).getShapes();
    	for (XSSFShape shape : shapes) {
    		if (shapeName.equals(shape.getShapeName())) {
    			File newPictureFile = FileManager.get(newPicturePath);
    			InputStream in = new FileInputStream(newPictureFile);
    			byte[] bytes = IOUtils.toByteArray(in);
    			in.close();
    			String extension = newPicturePath.substring(newPicturePath.lastIndexOf(".")+1).toUpperCase();
    			int pictureType=0;
    			if ("BMP".equals(extension)||"DIB".equals(extension))pictureType=Workbook.PICTURE_TYPE_DIB;
    			if ("EMF".equals(extension))pictureType=Workbook.PICTURE_TYPE_EMF;
    			if ("JPEG".equals(extension)||"JPG".equals(extension))pictureType=Workbook.PICTURE_TYPE_JPEG;
    			if ("PICT".equals(extension))pictureType=Workbook.PICTURE_TYPE_PICT;
    			if ("PNG".equals(extension))pictureType=Workbook.PICTURE_TYPE_PNG;
    			if ("WMF".equals(extension))pictureType=Workbook.PICTURE_TYPE_WMF;

    			int pictureIndex = this.workbook.addPicture(bytes, pictureType);
    			
    			XSSFPicture orgPicture=(XSSFPicture)shape;
				Class XSSFDrawingClass = Class.forName("org.apache.poi.xssf.usermodel.XSSFDrawing");
				Method addMethod = XSSFDrawingClass.getDeclaredMethod("addPictureReference",int.class);
				addMethod.setAccessible(true);
				PackageRelationship rel=(PackageRelationship)addMethod.invoke(sheet.getDrawingPatriarch(),pictureIndex);
				Class XSSFPictureClass = Class.forName("org.apache.poi.xssf.usermodel.XSSFPicture");
				Method setMethod = XSSFPictureClass.getDeclaredMethod("setPictureReference",PackageRelationship.class);
				setMethod.setAccessible(true);
				setMethod.invoke(orgPicture,rel);
				break;
    		}
    	}
	}

	/**
	 * XSSFのShapeをコピーする
	 * @param patriarch
	 * @param templateShape
	 * @param value
	 * @return　作成されたshape
	 */
	private XSSFShape cloneShape(XSSFDrawing patriarch,XSSFShape templateShape,String value){
		String clsNm=templateShape.getClass().getSimpleName();
		if ("XSSFSimpleShape".equals(clsNm)) {
			XSSFSimpleShape orgSimpleShape=(XSSFSimpleShape)templateShape;
			XSSFSimpleShape simpleShape = patriarch.createSimpleShape((XSSFClientAnchor)orgSimpleShape.getAnchor());
			simpleShape.getCTShape().set(orgSimpleShape.getCTShape().copy());
			if(orgSimpleShape.getTextParagraphs().size()>0){
				XSSFTextParagraph tempParagraph=orgSimpleShape.getTextParagraphs().get(0);
				if(tempParagraph.getTextRuns().size()>0){
					XSSFTextRun tempRun=tempParagraph.getTextRuns().get(0);
					simpleShape.setText(tempRun.getText());
					if(simpleShape.getTextParagraphs().size()>0){
						XSSFTextParagraph paragraph=simpleShape.getTextParagraphs().get(0);
						if(paragraph.getTextRuns().size()>0){
							XSSFTextRun textRun= paragraph.getTextRuns().get(0);
							if (value!=null) {
								textRun.setText(value);
							}else {
								textRun.setText(tempRun.getText());
							}
							textRun.setFontSize(tempRun.getFontSize());
							textRun.setCharacterSpacing(tempRun.getCharacterSpacing());
							textRun.setFontColor(tempRun.getFontColor());
							textRun.setFontFamily(tempRun.getFontFamily(), Font.DEFAULT_CHARSET, tempRun.getPitchAndFamily(), false);
							paragraph.setTextAlign(tempParagraph.getTextAlign());
							paragraph.setTextFontAlign(tempParagraph.getTextFontAlign());
						}
					}
				}
			}
			return (XSSFShape)simpleShape;
		}else if ("XSSFPicture".equals(clsNm)) {
			XSSFPicture orgPicture=(XSSFPicture)templateShape;
			PackagePart orgPackagePart= orgPicture.getPictureData().getPackagePart();
			@SuppressWarnings("unchecked")
			List<XSSFPictureData> allpictures=(List<XSSFPictureData>) this.workbook.getAllPictures();
			int pictureIndex=-1;
			for(int index=0;index<allpictures.size();index++) {
				PackagePart packagePart=allpictures.get(index).getPackagePart();
				if (packagePart.equals(orgPackagePart)) {
					pictureIndex=index;
					break;
				}
			}
			XSSFPicture picture = patriarch.createPicture((XSSFClientAnchor)orgPicture.getAnchor(),pictureIndex);
			return (XSSFShape)picture;
		}
		return null;
	}

}
