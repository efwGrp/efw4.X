/**** efw4.X Copyright 2025 efwGrp ****/
package efw.script;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;

import javax.script.ScriptEngine;

import efw.efwScriptException;
import efw.properties.PropertiesManager;

/**
 * サーバーサイトJavaScriptの管理と実行を行うクラス。
 * @author Chang Kejun
 *
 */
public final class ScriptManager{
	/**
	 * ダミーコンストラクタ
	 */
	public ScriptManager(){super();}

    private static ScriptEngine4Efw _se;
    /**
     * javaScriptエンジンのインスタンスを取得する。
     * @return javaScriptエンジンのインスタンス
     */
    public static ScriptEngine se(){
    	return _se.se();
    }
    
   private static String SCRIPT_ENGINE_NASHORN="nashorn";
   private static String SCRIPT_ENGINE_GRAALJS="graaljs";
	/**
	 * スクリプトエンジンを初期化する。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static void init() throws efwScriptException{
		try {
			String engineName=PropertiesManager.getProperty(PropertiesManager.SCRIPT_ENGINE, SCRIPT_ENGINE_NASHORN);
			if (SCRIPT_ENGINE_NASHORN.equals(engineName)) {
				_se = (ScriptEngine4Efw) Class
					.forName("efw.script.ScriptEngine4EfwNashorn")
					.getConstructor().newInstance();
				_se.init();
			}else if (SCRIPT_ENGINE_GRAALJS.equals(engineName)) {
				_se = (ScriptEngine4Efw) Class
					.forName("efw.script.ScriptEngine4EfwGraaljs")
					.getConstructor().newInstance();
				_se.init();
			}else {
				throw new efwScriptException("efw.script.engine is wrong.");
			}
		} catch (ClassNotFoundException
				|InstantiationException
				|IllegalAccessException
				|IllegalArgumentException
				|InvocationTargetException
				|NoSuchMethodException
				|SecurityException e) {
			throw new efwScriptException(e);
		}
	}
	/**
	 * サーバサイトイベントを実行する。
	 * @param req リクエストからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static String doPost(String req) throws efwScriptException{
		return _se.doPost(req);
	}
	/**
	 * スクリプトエンジンを破棄する。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static void doDestroy() throws efwScriptException{
		_se.doDestroy();
	}
	/**
	 * バッチを実行する。
	 * doPostと比較する場合、HttpServletRequestがないようにすること。
	 * @param req バッチからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static String doBatch(String req) throws efwScriptException{
		return _se.doBatch(req);
	}
	/**
	 * RESTサービスを実行する。
	 * @param eventId RESTイベントID。
	 * @param reqKeys RESTイベントのURLのキー。
	 * @param httpMethod HTTPメソッド。
	 * @param reqParams RESTイベントのURLのパラメータ。
	 * @return 実行結果のJSON文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static String doRestAPI(String eventId,String reqKeys,String httpMethod,String reqParams) throws efwScriptException{
		return _se.doRestAPI(eventId, reqKeys, httpMethod, reqParams);
	}
	/**
	 * NashornエンジンからJSONを取得する関数。
	 * @param script JSONを指すスクリプト。
	 * @return JSONオブジェクト。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static Object getJSON(String script) throws efwScriptException {
		return _se.getJSON(script);
	}
	/**
	 * 指定関数を実行する。
	 * @param funcNm 関数名。
	 * @param reqParams パラメータ。
	 * @return 実行結果の文字列。
	 * @throws efwScriptException スクリプトエラー。
	 */
	public static String callFunction(String funcNm,String reqParams) throws efwScriptException{
		return _se.callFunction(funcNm, reqParams);
	}
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
	public static boolean getBool(Map<String,Object> params,String script) throws efwScriptException {
		return _se.getBool(params, script);
	}
	/////////////////////////////////////////////
	private static ReentrantLock locker=new ReentrantLock();
	/**
	 * ファイル作成用の排他ロッカーを取得する。
	 * @return 排他ロッカー。
	 */
	public static ReentrantLock getLocker() {
		return locker;
	}
	private static HashMap<String,HashMap<String, Object>> semaphores=new HashMap<String,HashMap<String, Object>>();
	/**
	 * イベント同時実行制限用のセマフォを取得する。
	 * @param eventId イベントID。
	 * @param max 同時実行数。
	 * @return セマフォ。
	 */
	public static synchronized Semaphore getSemaphore(String eventId,int max) {
		HashMap<String, Object> ret;
		if ((ret=semaphores.get(eventId))==null) {
			HashMap<String, Object> created=new  HashMap<String, Object> ();
			created.put("eventId", eventId);
			created.put("max", max);
			created.put("semaphore", new java.util.concurrent.Semaphore(max));
			semaphores.put(eventId, ret=created);
		}else {
			int premax=(int)ret.get("max");
			if (premax!=max) {
				ret.put("max", max);
				ret.put("semaphore", new java.util.concurrent.Semaphore(max));
			}
		}
		return (Semaphore)ret.get("semaphore");
	}
}
