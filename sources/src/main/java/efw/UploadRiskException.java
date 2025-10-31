/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * UploadRiskExceptionエラー。
 * @author kejun.chang
 */
public final class UploadRiskException extends efwException {
	/**
	 * コンストラクタ
	 * @param pathFileName Pdfファイル名。
	 */
	public UploadRiskException(String pathFileName) {
		super("It is considered as a threat : "+pathFileName);
	}
}
