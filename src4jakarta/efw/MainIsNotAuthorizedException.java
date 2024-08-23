/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * メインアプリ権限設定不正エラー。
 * @author kejun.chang
 */
public final class MainIsNotAuthorizedException extends efwException {
	public MainIsNotAuthorizedException() {
		super("The calling is rejected because the main app url is not defined in [efw.called.from.mains].");
	}
}
