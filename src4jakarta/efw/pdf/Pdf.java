package efw.pdf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.lowagie.text.pdf.AcroFields;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;

import efw.file.FileManager;
public class Pdf {
	/**
	 * PDFBoxのPDDocumentのインスタンス。
	 * 特別な処理を行いたい場合利用できる。
	 */
	PdfStamper pdfStamper;
	AcroFields acroFields;
	File file;
    // コンストラクタ
    protected Pdf(File templateFile) throws IOException {
    	file=File.createTempFile("efw", ".pdf");
		pdfStamper = new PdfStamper(
				new PdfReader(templateFile.getAbsolutePath()),
				new FileOutputStream(file)
			);
		acroFields = pdfStamper.getAcroFields();
    }
	/**
	 * Pdfのオブジェクトを削除する。
	 */
	protected void close(){
		try {
			pdfStamper.close();
			this.file.delete();
		} catch (IOException e) {
			e.printStackTrace();//エラーをなげない。
		}
	}
	/**
	 * テンプレートファイルの名称をキーとして利用する。
	 * @return ファイル名。
	 */
	public String getKey() {
		return this.file.getName();
	}
	/**
	 * 保存する
	 * @param path 保存先のファイルパス。ストレジの相対パス。
	 * @throws IOException
	 */
    public void save(String path) throws IOException {
    	pdfStamper.close();
		File fileNewPdf = FileManager.get(path);
		File filePath=new File(fileNewPdf.getParent());
		if (!filePath.exists()) {
			filePath.mkdirs();
		}
		FileManager.duplicate(file, fileNewPdf);
    }
    /**
     * 項目の値を設定する
     * @param fieldName 項目名
     * @param fieldValue 項目値
     * @throws IOException
     */
    public void setField(String fieldName,String fieldValue) throws IOException {
    	acroFields.setField(fieldName,fieldValue);
    }
}
