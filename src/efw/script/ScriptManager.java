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
	 * イベントJavaScriptファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String eventFolder;
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
    /**
     * スクリプトエンジンに渡すスクリプトエンジンのキー。
     * 「_engine」に固定。
     */
    private static final String KEY_ENGINE="_engine";

    private static ScriptEngine _se;
    
    public static final ScriptEngine se(){
    	return _se;
    }
	/**
	 * サーブレットから設定情報を受け取り、スクリプトエンジン管理オブジェクトを初期化する。
	 * @param eventFolder イベントJavaScriptファイルの格納パス。
	 * @throws ScriptException 
	 */
	public static void init(String eventFolder) throws ScriptException{
		ScriptManager.eventFolder=eventFolder;
		System.setProperty("polyglot.js.nashorn-compat","true");//graalvmのため、nashornの場合無効だが影響なし
        System.setProperty("nashorn.args", "--language=es6");
        ScriptManager._se=(new ScriptEngineManager()).getEngineByName("JavaScript");
        if (ScriptManager._se==null) {
            System.clearProperty("nashorn.args");
            ScriptManager._se=(new ScriptEngineManager()).getEngineByName("JavaScript");
        }
        se().put(KEY_EVENTFOLDER, ScriptManager.eventFolder);
        se().put(KEY_ISDEBUG, framework.getIsDebug());
        se().put(KEY_ENGINE, ScriptManager.se());
        se().eval("load('classpath:efw/resources/server/efw.doInit.js')");
	}
	/**
	 * リクエストをサーバーサイトJavaScriptに転送する。
	 * もしスレッドにスクリプトエンジンが付けられていないなら、スクリプトエンジンを作成し、共通とするefw.server.jsを実行する。
	 * @param req JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @return 実行結果のJSON文字列を返す。
	 * @throws NoSuchMethodException 
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doPost(String req) throws Exception{
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doPost", req);
	}
	
	public static String doDestroy(String req) throws Exception{
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doDestroy", req);
	}
	/**
	 * バッチを実行する。
	 * doPostと比較する場合、HttpServletRequestがないようにすること。
	 * @param req batchがefw へ要求したJSON内容を含む オブジェクト。
	 * @return 実行結果のJSON文字列を返す。
	 * @throws NoSuchMethodException 
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doBatch(String req) throws Exception {
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doBatch", req);
	}
	
	public static String doRestAPI(String eventId,String reqKeys,String httpMethod,String reqParams) throws Exception {
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doRestAPI", eventId, reqKeys, httpMethod, reqParams);
		
	}
	/**
	 * リクエストをサーバーサイトJavaScriptに転送する。
	 * もしスレッドにスクリプトエンジンが付けられていないなら、スクリプトエンジンを作成し、共通とするefw.server.jsを実行する。
	 * @param req JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @return 実行結果のJSON文字列を返す。
	 * @throws NoSuchMethodException 
	 * @throws ScriptException スクリプトエラー。
	 */
	public static String doLambdaPost(String req) throws Exception{
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doLambdaPost", req);
	}
}
