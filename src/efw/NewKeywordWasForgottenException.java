/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * newキーワードを忘れたエラー。
 */
public class NewKeywordWasForgottenException extends efwException {

	public NewKeywordWasForgottenException(String className) {
		super(" new "+className+"(...)");
	}

}
