/**** efw4.X Copyright 2025 efwGrp ****/
package efw.util;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.server.HandshakeRequest;

import efw.framework;

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
	public static final String JAVA_MAIL_SESSION="javax.mail.Session";
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
			/*
			HandshakeResponse response=(HandshakeResponse)framework.getResponse();
	        String path = "/";
	        int maxAge = 31536000; // One Year (秒単位)
	        // 1. Set-Cookie ヘッダーの値を構築
	        // JavaScriptと同じく、HttpOnlyなどの属性はセキュリティに応じて追加してください。
	        String cookieString = String.format(
	            "%s=%s; Path=%s; Max-Age=%d; Secure; HttpOnly",
	            key, value, path, maxAge
	        );

	        // 2. HandshakeResponse のヘッダーを取得（Map<String, List<String>>）
	        // 既存の "Set-Cookie" ヘッダーがあれば取得し、なければ新規作成
	        List<String> setCookieHeaderList = response.getHeaders().computeIfAbsent(
	            "Set-Cookie", k -> new ArrayList<>()
	        );
	        
	        // 3. Set-Cookie リストに追加
	        setCookieHeaderList.add(cookieString);

	        // 注意: response.getHeaders() にキー "Set-Cookie" で値を put() する場合、
	        // 既存のSet-Cookieを上書きしないよう注意が必要です。
	        // computeIfAbsentや、getしてからaddする方式が安全です。
	        */
		}else {//org.apache.catalina.connector.RequestFacade
			String path="/";
			int maxAge=31536000;//One Year
			HttpServletResponse response=(HttpServletResponse)framework.getResponse();
			Cookie cookie = new Cookie(key, value);
			cookie.setMaxAge(maxAge);
			cookie.setPath(path);
			response.addCookie(cookie);
		}
	}
}

