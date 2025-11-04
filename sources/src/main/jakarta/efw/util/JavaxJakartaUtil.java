/**** efw4.X Copyright 2025 efwGrp ****/
package efw.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import efw.framework;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.HandshakeRequest;

/**
 * JavaxJakartaユティリティ
 * @author kejun.chang
 */
public final class JavaxJakartaUtil {
	/**
	 * ダミーコンストラクタ
	 */
	public JavaxJakartaUtil(){super();}
	/**
	 * JAVA_MAIL_SESSIONのクラス名
	 */
	public static final String JAVA_MAIL_SESSION="jakarta.mail.Session";
	/**
	 * Httpセッションを取得する
	 * WebSocketとHttpの通信の区別を吸収するため
	 * @return HttpSession
	 */
	public static HttpSession getSession() {
		Object o=framework.getRequest();
		HttpSession session=null;
		if ("org.apache.tomcat.websocket.server.WsHandshakeRequest".equals(o.getClass().getName())) {
			HandshakeRequest request=(HandshakeRequest)framework.getRequest();
			session=(HttpSession)request.getHttpSession();
		}else {//org.apache.catalina.connector.RequestFacade
			HttpServletRequest request=(HttpServletRequest)framework.getRequest();
			session=request.getSession();
		}
		return session;
	}
	/**
	 * Header情報を取得する
	 * WebSocketとHttpの通信の区別を吸収するため
	 * @param key Headerキー
	 * @return Header値
	 */
	public static String getHeader(String key) {
		Object o=framework.getRequest();
		String value=null;
		if ("org.apache.tomcat.websocket.server.WsHandshakeRequest".equals(o.getClass().getName())) {
			HandshakeRequest request=(HandshakeRequest)framework.getRequest();
			Map<String, List<String>> headers = request.getHeaders();
	        List<String> refererList = headers.get(key);
	        value = (refererList != null && !refererList.isEmpty()) ? refererList.get(0) : null;
		}else {//org.apache.catalina.connector.RequestFacade
			HttpServletRequest request=(HttpServletRequest)framework.getRequest();
			value=request.getHeader(key);
		}
		return value;
	}
	/**
	 * Referer情報を取得する
	 * @return eferer情報
	 */
	public static String getReferer() {
		Object o=framework.getRequest();
		String value=null;
		if ("org.apache.tomcat.websocket.server.WsHandshakeRequest".equals(o.getClass().getName())) {
			HandshakeRequest request=(HandshakeRequest)framework.getRequest();
	        List<String> refererList = request.getParameterMap().get("referer");
	        value = (refererList != null && !refererList.isEmpty()) ? refererList.get(0) : null;
		}else {//org.apache.catalina.connector.RequestFacade
			HttpServletRequest request=(HttpServletRequest)framework.getRequest();
			value=request.getHeader("referer");
		}
		return value;
	}
	/**
	 * Cookie情報を取得する
	 * @param key Cookieキー
	 * @return Cookie値
	 */
	public static String getCookie(String key) {
		Object o=framework.getRequest();
		String value=null;
		if ("org.apache.tomcat.websocket.server.WsHandshakeRequest".equals(o.getClass().getName())) {
			HandshakeRequest request=(HandshakeRequest)framework.getRequest();
			Map<String, List<String>> headers = request.getHeaders();
			List<String> cookieHeaders = headers.get("Cookie");
			// Cookieヘッダーが存在する場合、最初の文字列を取得
	        String cookieString = (cookieHeaders != null && !cookieHeaders.isEmpty()) 
	                            ? cookieHeaders.get(0) 
	                            : null;
	        if (cookieString != null) {
	        	String[] pairs = cookieString.split(";\\s*");
	        	for (String pair : pairs) {
	                // ペアが空でないことを確認
	                if (pair.trim().isEmpty()) {
	                    continue;
	                }
	                // 2. 最初のイコールでキーと値に分割
	                String[] keyValue = pair.split("=", 2); // 2: 2つにだけ分割する
	                //キーが一致するかどうか
	                if (key.equals(keyValue[0].trim())) {
	                    // 値が存在する場合、URLデコードを行う
	                    try {
	                        // Cookieの値はURLエンコードされている可能性があるためデコードする
	                        value = URLDecoder.decode(keyValue[1].trim(), framework.SYSTEM_CHAR_SET);
	                    } catch (Exception e) {
	                        // デコードエラーが発生した場合は、そのままの値を使用
	                        value = keyValue[1].trim(); 
	                    }
	                    break;
	                }
	            }
	        }
		}else {//org.apache.catalina.connector.RequestFacade
			HttpServletRequest request=(HttpServletRequest)framework.getRequest();
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					if (key.equals(cookie.getName())) {
	                    try {
	                        // Cookieの値はURLエンコードされている可能性があるためデコードする
							value = URLDecoder.decode(cookie.getValue().trim(), framework.SYSTEM_CHAR_SET);
	                    } catch (Exception e) {
	                        // デコードエラーが発生した場合は、そのままの値を使用
	                        value = cookie.getValue().trim(); 
	                    }
						break;
					}
				}
			}
		}
		return value;
	}
	/**
	 * Cookie情報を設定する
	 * @param key Cookieキー
	 * @param value Cookie値
	 */
	public static void setCookie(String key, String value) {
		Object o=framework.getResponse();
		if ("org.apache.tomcat.websocket.WsHandshakeResponse".equals(o.getClass().getName())) {
			framework.runtimeWLog("You can not set cookie in websocket mode. Cookie-key:"+key+" value:"+value);
		}else {//org.apache.catalina.connector.RequestFacade
			String path="/";
			int maxAge=31536000;//One Year
			HttpServletResponse response=(HttpServletResponse)framework.getResponse();
        	try {
				value=URLEncoder.encode(value,framework.SYSTEM_CHAR_SET);
			} catch (UnsupportedEncodingException e) {
				//valueのままにする
			}
			Cookie cookie = new Cookie(key, value);
			cookie.setMaxAge(maxAge);
			cookie.setPath(path);
			response.addCookie(cookie);
		}
	}
}

