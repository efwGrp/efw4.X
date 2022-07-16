/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * メインアプリとして定義していないエラー。
 */
public class efwDoNotAsMainException extends efwException {
	public efwDoNotAsMainException() {
		super("The calling is rejected because [efw.as.main] is false.");
	}
}
