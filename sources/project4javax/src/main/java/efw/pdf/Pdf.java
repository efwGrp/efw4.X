/**** efw4.X Copyright 2025 efwGrp ****/
package efw.pdf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import efw.file.FileManager;
/**
 * Pdf穴埋め処理用クラス。
 */
public final class Pdf {
	/**
	 * PDFBoxのPDDocumentのインスタンス。
	 * 特別な処理を行いたい場合利用できる。
	 */
	private Object pdfStamper;//PdfStamper
	private Object acroFields;//AcroFields
	private File file;
    // コンストラクタ
    protected Pdf(File templateFile) throws IOException {
    	file=File.createTempFile("efw", ".pdf");
		pdfStamper = new org.openpdf.text.pdf.PdfStamper(
				new org.openpdf.text.pdf.PdfReader(templateFile.getAbsolutePath()),
				new FileOutputStream(file)
			);
		acroFields = ((org.openpdf.text.pdf.PdfStamper)pdfStamper).getAcroFields();
    }
	/**
	 * Pdfのオブジェクトを削除する。
	 */
	protected void close(){
		try {
			((org.openpdf.text.pdf.PdfStamper)pdfStamper).close();
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
	 * @throws IOException IOエラー
	 */
    public void save(String path) throws IOException {
    	((org.openpdf.text.pdf.PdfStamper)pdfStamper).close();
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
     * @throws IOException IOエラー
     */
    public void setField(String fieldName,String fieldValue) throws IOException {
    	((org.openpdf.text.pdf.AcroFields)acroFields).setField(fieldName,fieldValue);
    }
}
