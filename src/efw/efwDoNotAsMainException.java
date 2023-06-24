/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * メインアプリとして定義していないエラー。
 * @author kejun.chang
 */
public final class efwDoNotAsMainException extends efwException {
	public efwDoNotAsMainException() {
		super("The calling is rejected because [efw.as.main] is false.");
	}
}
