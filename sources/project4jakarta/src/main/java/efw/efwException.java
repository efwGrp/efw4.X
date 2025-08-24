/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * フレームワークの初期化と実行時発生するエラー（アブストラクトクラス）。
 * @author Chang Kejun
 */
public abstract class efwException extends Exception {
	/**
	 * コンストラクタ
	 * @param message エラー内容。
	 */
	public efwException(String message){super(message);}
}
