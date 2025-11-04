/**** efw4.X Copyright 2025 efwGrp ****/
package efw.script;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;

import efw.framework;
/**
 * GraaljsのContextのラッパー
 * @author Chang Kejun
 */
public final class ScriptContext4EfwGraaljs {
	/**
	 * コンテキストのハンドル
	 */
	private Context _context=null;
	/**
	 * 言語IDの固定値
	 */
	private static String ID="js";
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
	 * コンストラクタ
	 * @param cxt GraaljsのContext
	 * @param sc 初期化のソース
	 */
	protected ScriptContext4EfwGraaljs(Context cxt,Source sc) {
		_context=cxt;
		Value jsBindings = cxt.getBindings(ID);
		jsBindings.putMember(KEY_EVENTFOLDER, framework.getEventFolder());
		jsBindings.putMember(KEY_ISDEBUG, framework.getIsDebug());
		cxt.eval(sc);
		Value efw=jsBindings.getMember("efw");
		_doInit=efw.getMember("doInit");
		_doDestroy=efw.getMember("doDestroy");
		_doPost=efw.getMember("doPost");
		_doBatch=efw.getMember("doBatch");
		_doRestAPI=efw.getMember("doRestAPI");
		_callFunction=efw.getMember("callFunction");
	}
	/**
	 * JS初期化関数のハンドル
	 */
	private Value _doInit=null;
	/**
	 * JS初期化関数の実行関数
	 */
	public void doInit() {
		_doInit.executeVoid();
	}
	/**
	 * JS破棄関数のハンドル
	 */
	private Value _doDestroy=null;
	/**
	 * JS破棄関数の実行関数
	 */
	public void doDestory() {
		_doDestroy.executeVoid();
		_context.close();
	}
	/**
	 * JSポスト関数のハンドル
	 */
	private Value _doPost=null;
	/**
	 * JSポスト関数の実行関数
	 * @param req パラメータ
	 * @return 実行結果
	 */
	public String doPost(String req) {
		return _doPost.execute(req).asString();
		
	}
	/**
	 * JSバッチ関数のハンドル
	 */
	private Value _doBatch=null;
	/**
	 * JSバッチ関数の実行関数
	 * @param req パラメータ
	 * @return 実行結果
	 */
	public String doBatch(String req) {
		return _doBatch.execute(req).asString();
	}
	/**
	 * JSRESTサービス関数のハンドル
	 */
	private Value _doRestAPI=null;
	/**
	 * RESTサービス関数の実行関数
	 * @param eventId RESTイベントID。
	 * @param reqKeys RESTイベントのURLのキー。
	 * @param httpMethod HTTPメソッド。
	 * @param reqParams RESTイベントのURLのパラメータ。
	 * @return 実行結果のJSON文字列。
	 */
	public String doRestAPI(String eventId,String reqKeys,String httpMethod,String reqParams) {
		return _doRestAPI.execute(eventId,reqKeys,httpMethod,reqParams).asString();
	}
	/**
	 * JS指定関数のハンドル
	 */
	private Value _callFunction=null;
	/**
	 * 指定関数を実行する。
	 * @param funcNm 関数名。
	 * @param reqParams パラメータ。
	 * @return 実行結果の文字列。
	 */
	public String callFunction(String funcNm,String reqParams){
		return _callFunction.execute(funcNm,reqParams).asString();
	}
}
