/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * スクリプト実行エラー。
 * @author kejun.chang
 */
public final class efwScriptException extends efwException {
	/**
	 * コンストラクタ
	 * @param message エラー内容。
	 */
	public efwScriptException(String message){super(message);}
	/**
	 * コンストラクタ
	 * @param e エラー内容。
	 */
	public efwScriptException(Exception e) {super(e);}
}
