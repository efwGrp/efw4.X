/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
/**
 * efwWebSocketクラスのカスタマイズ設定クラス
 * @author Chang Kejun
 */
public class efwWebSocketConfigurator extends ServerEndpointConfig.Configurator {
	/**
	 * ダミーコンストラクタ
	 */
    public efwWebSocketConfigurator() {super();}
	/**
	 * ServerEndpointConfigの定数
	 */
    protected static final String WS_SEC = "wsSec";
	/**
	 * HandshakeRequestの定数
	 */
    protected static final String WS_REQUEST = "wsRequest";
	/**
	 * HandshakeResponseの定数
	 */
    protected static final String WS_RESPONSE = "wsResponse";

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, 
                                HandshakeRequest request, 
                                HandshakeResponse response) {
        sec.getUserProperties().put(WS_SEC, sec);
        sec.getUserProperties().put(WS_REQUEST, request);
        sec.getUserProperties().put(WS_RESPONSE, response);
    }
}