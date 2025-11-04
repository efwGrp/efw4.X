/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
import java.io.IOException;

import efw.script.ScriptManager;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpoint;
/**
 * efwWebSocketはサーバサイトイベントをも実行する。
 */
@ServerEndpoint(value = "/efwWebSocket",
configurator = efwWebSocketConfigurator.class)	//このurlはefwFitlerに通らない
public final class efwWebSocket {
	/**
	 * ダミーコンストラクタ
	 */
	public efwWebSocket() {super();}
	/**
	 * エラー処理
	 * @param session セッション情報
	 * @param error エラー情報
	 */
	@OnError
	public void onError(Session session, Throwable error) {
		framework.runtimeWLog(error.getMessage());
	}
	/**
	 * クライアントから通信されるイベント
	 * @param message 受取る情報
	 * @param session セッション情報
	 */
    @OnMessage
    public void onMessage(String message,Session session) {
		String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
				(framework.getSystemErrorUrl().equals("")?"":",\"navigate\":{\"url\":\""+framework.getSystemErrorUrl()+"\"}")
				+"}";
		String result="";
        try {
        	HandshakeRequest wsRequest=(HandshakeRequest)session.getUserProperties().get(efwWebSocketConfigurator.WS_REQUEST);
        	HandshakeResponse wsResponse=(HandshakeResponse)session.getUserProperties().get(efwWebSocketConfigurator.WS_RESPONSE);
////////////////////////////////////
    		//keep req and resp to thread local for javascript program.
    		framework.setRequest(wsRequest);
    		framework.setResponse(wsResponse);
    		framework.setWsSession(session);
    		
    		//if init is failed, return the info instead of throw exception
    		if (!framework.getInitSuccessFlag()){
    			framework.runtimeSLog("initSuccessFlag = false");
    			result=otherError;
    		}else {
        		result=ScriptManager.doPost(message);
    		}
		} catch (efwScriptException ex) {
			framework.runtimeSLog(ex);
			result=otherError;
        }finally {
        	framework.removeWsSession();
			framework.removeLang();
			framework.removeI18nProp();
			framework.removeThreadLogs();
			framework.removeRestStatus();
			framework.removeNumberFormats();
			framework.removeDateFormats();
    		//remove req and resp from thread local
    		framework.removeRequest();
    		framework.removeResponse();
    	}
        try {
        	if (session.isOpen()) {
        		session.getBasicRemote().sendText(result);
        	}
        }catch(IOException ex) {
        	//do nothing
        }finally {
        	try {
        		session.close();
        	}catch(IOException ex) {
            	//do nothing
        	}
        }
		return;
    }
}
