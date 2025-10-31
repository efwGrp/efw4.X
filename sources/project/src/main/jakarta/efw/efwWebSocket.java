/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
import java.io.IOException;

import efw.script.ScriptManager;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.OnMessage;
import jakarta.websocket.Session;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpoint;
/**
 * efwWebSocketはサーバサイトイベントをも実行する。
 */
@ServerEndpoint(value = "/efwWebSocket",
configurator = efwWebSocketConfigurator.class)	//このurlはefwFitlerに通らない
public class efwWebSocket {
	/**
	 * ダミーコンストラクタ
	 */
	public efwWebSocket() {super();}
	/**
	 * クライアントから通信されるイベント
	 * @param message 受取る情報
	 * @param session セッション情報
	 * @throws IOException 通信エラー
	 */
    @OnMessage
    public void onMessage(String message,Session session) throws IOException {
		String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
				(framework.getSystemErrorUrl().equals("")?"":",\"navigate\":{\"url\":\""+framework.getSystemErrorUrl()+"\"}")
				+"}";
        try {
            if (session.isOpen()) {
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
        			session.getBasicRemote().sendText(otherError);
        			return;
        		}
    			session.getBasicRemote().sendText(ScriptManager.doPost(message));
            }
		} catch (efwScriptException|IOException ex) {
			framework.runtimeSLog(ex);
			session.getBasicRemote().sendText(otherError);//efw内部エラー。
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
    		session.close();
    	}
    }
}
