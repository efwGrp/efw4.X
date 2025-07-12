/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * Pdfファイルが正しくないエラー。
 * @author kejun.chang
 */
public final class PdfFileIsNotLegalException extends efwException {
	/**
	 * @param flnm Pdfファイル名。
	 * @param message エラー内容。
	 */
	public PdfFileIsNotLegalException(String flnm,String message) {
		super(" file = "+flnm+"; error = "+message);
	}
}
