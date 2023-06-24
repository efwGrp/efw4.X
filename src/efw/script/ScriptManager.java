/**** efw4.X Copyright 2019 efwGrp ****/
package efw.script;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import efw.framework;

/**
 * サーバーサイトJavaScriptの管理と実行を行うクラス。
 * @author Chang Kejun
 *
 */
public final class ScriptManager {
    /**
     * スクリプトエンジンに渡すイベントJavaScriptファイルの格納パスのキー。
     * 「_eventfolder」に固定。
     */
    private static final String KEY_EVENTFOLDER="_eventfolder";
    /**
     * スクリプトエンジンに渡すデバッグモード制御フラグのキー。
     * 「_isdebug」に固定。
     */
    private static final String KEY_ISDEBUG="_isdebug";

    private static ScriptEngine _se;
    
	/**
	 * スクリプトエンジンを初期化する。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static void init() throws ScriptException{
		System.setProperty("polyglot.js.nashorn-compat","true");//graalvmのため、nashornの場合無効だが影響なし
		System.setProperty("nashorn.args", "--language=es6");
		ScriptManager._se=(new ScriptEngineManager()).getEngineByName("JavaScript");
		if (ScriptManager._se==null) {
		    System.clearProperty("nashorn.args");
		    ScriptManager._se=(new ScriptEngineManager()).getEngineByName("JavaScript");
		}
		ScriptManager._se.put(KEY_EVENTFOLDER, framework.getEventFolder());
		ScriptManager._se.put(KEY_ISDEBUG, framework.getIsDebug());
		ScriptManager._se.eval("load('classpath:efw/resources/server/efw.doInit.js')");
	}
	/**
	 * サーバサイトイベントを実行する。
	 * @param req リクエストからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws NoSuchMethodException 関数なしエラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doPost(String req) throws NoSuchMethodException, ScriptException{
		Invocable invocable = (Invocable) _se;
		return (String)invocable.invokeFunction("doPost", req);
	}
	/**
	 * スクリプトエンジンを破棄する。
	 * @throws NoSuchMethodException 関数なしエラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static void doDestroy() throws NoSuchMethodException, ScriptException{
		Invocable invocable = (Invocable) _se;
		invocable.invokeFunction("doDestroy");
	}
	/**
	 * バッチを実行する。
	 * doPostと比較する場合、HttpServletRequestがないようにすること。
	 * @param req バッチからjsイベントへの依頼情報。
	 * @return 実行結果のJSON文字列。
	 * @throws NoSuchMethodException 関数なしエラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doBatch(String req) throws NoSuchMethodException, ScriptException{
		Invocable invocable = (Invocable) _se;
		return (String)invocable.invokeFunction("doBatch", req);
	}
	/**
	 * RESTサービスを実行する。
	 * @param eventId RESTイベントID。
	 * @param reqKeys RESTイベントのURLのキー。
	 * @param httpMethod HTTPメソッド。
	 * @param reqParams RESTイベントのURLのパラメータ。
	 * @return 実行結果のJSON文字列。
	 * @throws NoSuchMethodException 関数なしエラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doRestAPI(String eventId,String reqKeys,String httpMethod,String reqParams) throws NoSuchMethodException, ScriptException{
		Invocable invocable = (Invocable) _se;
		return (String)invocable.invokeFunction("doRestAPI", eventId, reqKeys, httpMethod, reqParams);
	}
}
