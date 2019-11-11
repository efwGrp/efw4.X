/**** efw4.X Copyright 2019 efwGrp ****/
package efw.excel;

import java.io.IOException;
import java.util.ArrayList;

import efw.framework;
import efw.file.FileManager;
/**
 * Excelファイルを取り扱うクラス。
 */
public final class ExcelManager {
	/**
	 * 1つExcelを開く。
	 * @param path Excelのパス。
	 * @return Excelのオブジェクト。
	 * @throws EncryptedDocumentException
	 * @throws InvalidFormatException
	 * @throws IOException
	 */
	public static Excel open(String path,boolean isLarge) throws Exception{
		if(framework.getExcels()==null)
		framework.setExcels(new ArrayList<Excel>());
		try{
			Excel excel=new Excel(FileManager.get(path),isLarge);
			framework.getExcels().add(excel);
			return excel;
		}catch(Exception e){
	        e.printStackTrace();
			throw e;
		}
	}
	/**
	 * 該当スレッドに、開いたExcelをすべて閉じる。
	 * @throws IOException
	 */
	public static void closeAll(){
		if(framework.getExcels()==null) return;

		ArrayList<Excel> ary=framework.getExcels();
		for(int i=0;i<ary.size();i++) {
			Excel excel=ary.get(i);
			try{
				excel.close();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		framework.removeExcels();
	}
}
