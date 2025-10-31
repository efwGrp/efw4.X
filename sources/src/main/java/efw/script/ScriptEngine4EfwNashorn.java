/**** efw4.X Copyright 2025 efwGrp ****/
package efw.script;

import java.util.Map;

import javax.script.Invocable;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleScriptContext;

import efw.efwScriptException;
import efw.framework;

/**
 * Nashornエンジンを利用するクラス
 */
public class ScriptEngine4EfwNashorn implements ScriptEngine4Efw {
	
	private ScriptEngine _se;
	private Object _efw;
	/**
	 * ダミーコンストラクタ
	 */
	public ScriptEngine4EfwNashorn(){super();}

	@Override
	public ScriptEngine se() {
		return _se;
	}

	@Override
	public void init() throws efwScriptException {
		try {
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
				_se.eval("load('classpath:efw/resources/nashorn/efw.nashorn.load.all.js')");
				_efw=_se.eval("efw");
				Invocable invocable = (Invocable) _se;
				invocable.invokeMethod(_efw, "doInit");
			}else {
				throw new ScriptException("Nashorn is not exists.");
			}
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public String doPost(String req) throws efwScriptException {
		try {
			Invocable invocable = (Invocable) _se;
			return (String)invocable.invokeMethod(_efw,"doPost", req);
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public void doDestroy() throws efwScriptException {
		try {
			Invocable invocable = (Invocable) _se;
			invocable.invokeMethod(_efw,"doDestroy");
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public String doBatch(String req) throws efwScriptException {
		try {
			Invocable invocable = (Invocable) _se;
			return (String)invocable.invokeMethod(_efw,"doBatch", req);
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public String doRestAPI(String eventId, String reqKeys, String httpMethod, String reqParams) throws efwScriptException {
		try {
			Invocable invocable = (Invocable) _se;
			return (String)invocable.invokeMethod(_efw,"doRestAPI", eventId, reqKeys, httpMethod, reqParams);
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public Object getJSON(String script) throws efwScriptException {
		try {
			return _se.eval("Java.asJSONCompatible("+script+");");
		} catch (ScriptException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public String callFunction(String funcNm, String reqParams) throws efwScriptException {
		try {
			Invocable invocable = (Invocable) _se;
			return (String)invocable.invokeMethod(_efw,"callFunction", funcNm, reqParams);
		} catch (ScriptException|NoSuchMethodException e) {
			throw new efwScriptException(e);
		}
	}

	@Override
	public boolean getBool(Map<String, Object> params, String script) throws efwScriptException {
		try {
			ScriptContext ct=new SimpleScriptContext();
			for(Map.Entry<String, Object> entry : params.entrySet()) {
				ct.setAttribute(entry.getKey(), entry.getValue(), ScriptContext.ENGINE_SCOPE);
			}
			return (Boolean)this.se().eval(script,ct);
		} catch (ScriptException e) {
			throw new efwScriptException(e);
		}
	}

}
