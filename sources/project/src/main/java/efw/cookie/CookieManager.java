/**** efw4.X Copyright 2025 efwGrp ****/
package efw.cookie;

import efw.util.JavaxJakartaUtil;
/**
 * クッキー操作を行うクラス。
 * WEBモードのみ利用できる。
 * @author kejun.chang
 */
public final class CookieManager {
	/**
	 * ダミーコンストラクタ
	 */
	public CookieManager(){super();}

	/**
	 * 指定クッキーの値を取得する。
	 * @param key キー。
	 * @return クッキー値。
	 */
	public static String get(String key) {
		return JavaxJakartaUtil.getCookie(key);
	}
	/**
	 * 指定クッキーに値を設定する。
	 * 有効期限は一年。
	 * @param key キー。
	 * @param value クッキー値。
	 */
	public static void set(String key, String value) {
		JavaxJakartaUtil.setCookie(key,value);
	}	
}
