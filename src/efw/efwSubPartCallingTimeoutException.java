/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * サブアプリ部品呼び出しタイムアウトエラー。
 * @author kejun.chang
 */
public final class efwSubPartCallingTimeoutException extends efwException {
	public efwSubPartCallingTimeoutException() {
		super("The calling to sub part is timeout.");
	}
}
