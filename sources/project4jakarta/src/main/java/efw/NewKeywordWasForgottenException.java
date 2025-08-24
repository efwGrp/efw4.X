/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * newキーワードを忘れたエラー。
 * @author kejun.chang
 */
public final class NewKeywordWasForgottenException extends efwException {
	/**
	 * コンストラクタ
	 * @param className newを忘れたJavaScriptクラス名。
	 */
	public NewKeywordWasForgottenException(String className) {
		super(" new "+className+"(...)");
	}

}
