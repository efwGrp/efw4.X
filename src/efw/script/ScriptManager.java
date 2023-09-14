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
     * javaScriptエンジンのインスタンスを取得する。
     * @return javaScriptエンジンのインスタンス
     */
    public static ScriptEngine se(){
    	return _se;
    }
	/**
	 * スクリプトエンジンを初期化する。
	 * @throws ScriptException スクリプトエラー。
	 */
	public static void init() throws ScriptException{
		String scrptnms=(new ScriptEngineManager()).getEngineFactories().get(0).getNames().toString();
		if (scrptnms.indexOf("Nashorn")>-1) {
			System.setProperty("nashorn.args", "--language=es6");
			_se=(new ScriptEngineManager()).getEngineByName("Nashorn");
			if (_se==null) {//jdk8の場合es6はサポートしない。
			    System.clearProperty("nashorn.args");
			    _se=(new ScriptEngineManager()).getEngineByName("Nashorn");
			}
			_se.put(KEY_EVENTFOLDER, framework.getEventFolder());
			_se.put(KEY_ISDEBUG, framework.getIsDebug());
			_se.eval("load('classpath:efw/resources/server/efw.doInit.js')");
		}else {
			throw new ScriptException("Nashorn is not exists.");
		}
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
