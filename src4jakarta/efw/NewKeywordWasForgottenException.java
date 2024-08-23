/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * newキーワードを忘れたエラー。
 * @author kejun.chang
 */
public final class NewKeywordWasForgottenException extends efwException {
	/**
	 * @param className newを忘れたJavaScriptクラス名。
	 */
	public NewKeywordWasForgottenException(String className) {
		super(" new "+className+"(...)");
	}

}
