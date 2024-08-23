/**** efw4.X Copyright 2023 efwGrp ****/
package efw;
/**
 * Excelファイルが正しくないエラー。
 * @author kejun.chang
 */
public final class ExcelFileIsNotLegalException extends efwException {
	/**
	 * @param flnm Excelファイル名。
	 * @param message エラー内容。
	 */
	public ExcelFileIsNotLegalException(String flnm,String message) {
		super(" file = "+flnm+"; error = "+message);
	}
}
