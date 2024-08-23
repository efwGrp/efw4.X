/**** efw4.X Copyright 2019 efwGrp ****/
package efw.cookie;

import efw.framework;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
/**
 * クッキー操作を行うクラス。
 * WEBモードのみ利用できる。
 * @author kejun.chang
 */
public final class CookieManager {
	/**
	 * 指定クッキーの値を取得する。
	 * @param key キー。
	 * @return クッキー値。
	 */
	public static String get(String key) {
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		String result = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (key.equals(cookie.getName())) {
					result = cookie.getValue();
					break;
				}
			}
		}
		return result;
	}
	/**
	 * 指定クッキーに値を設定する。
	 * 有効期限は一年。
	 * @param key キー。
	 * @param value クッキー値。
	 */
	public static void set(String key, String value) {
		String path="/";
		int maxAge=31536000;//One Year
		HttpServletResponse response=(HttpServletResponse)framework.getResponse();
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(maxAge);
		cookie.setPath(path);
		response.addCookie(cookie);
	}	
}
