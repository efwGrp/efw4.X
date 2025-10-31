/**** efw4.X Copyright 2025 efwGrp ****/
package efw.script;

import java.util.Map;

import javax.script.ScriptEngine;

import efw.efwScriptException;

/**
 * サーバーサイトJavaScriptの管理と実行を行うクラス。
 * @author Chang Kejun
 *
 */
public interface ScriptEngine4Efw {
	/**
     * スクリプトエンジンに渡すイベントJavaScriptファイルの格納パスのキー。
     * 「_eventfolder」に固定。
     */
    public static final String KEY_EVENTFOLDER="_eventfolder";
    /**
     * スクリプトエンジンに渡すデバッグモード制御フラグのキー。
     * 「_isdebug」に固定。
     */
    public static final String KEY_ISDEBUG="_isdebug";

    /**
     * javaScriptエンジンのインスタンスを取得する。
     * @return javaScriptエンジンのインスタンス
     */
    public ScriptEngine se();
	/**
	 * スクリプトエンジンを初期化する。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public void init() throws efwScriptException;
	/**
	 * サーバサイトイベントを実行する。
	 * @param req リクエストからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public String doPost(String req) throws efwScriptException;
	/**
	 * スクリプトエンジンを破棄する。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public void doDestroy() throws efwScriptException;
	/**
	 * バッチを実行する。
	 * doPostと比較する場合、HttpServletRequestがないようにすること。
	 * @param req バッチからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public String doBatch(String req) throws efwScriptException;
	/**
	 * RESTサービスを実行する。
	 * @param eventId RESTイベントID。
	 * @param reqKeys RESTイベントのURLのキー。
	 * @param httpMethod HTTPメソッド。
	 * @param reqParams RESTイベントのURLのパラメータ。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public String doRestAPI(String eventId,String reqKeys,String httpMethod,String reqParams) throws efwScriptException;
	/**
	 * NashornエンジンからJSONを取得する関数。
	 * @param script JSONを指すスクリプト。
	 * @return JSONオブジェクト。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public Object getJSON(String script) throws efwScriptException;
	/**
	 * 指定関数を実行する。
	 * @param funcNm 関数名。
	 * @param reqParams パラメータ。
	 * @return 実行結果の文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public String callFunction(String funcNm,String reqParams) throws efwScriptException;
	/**
	 * パラメータマップに指定キーのパラメータが空白か否か判断する。
	 * 指定キーのパラメータが存在しない場合、true。
	 * 指定キーのパラメータがnullの場合、true。
	 * 指摘キーのパラメータが""の場合、true。
	 * @param params パラメータマップ。
	 * @param script ロジカル計算式。
	 * @return　判断結果。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public boolean getBool(Map<String,Object> params,String script) throws efwScriptException;
}
