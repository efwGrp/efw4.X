/**** efw4.X Copyright 2025 efwGrp ****/
package efw.context;

import java.util.HashMap;
/**
 * コンテキストを管理するクラス。
 * @author kejun.chang
 */
public final class ContextManager {
	/**
	 * ダミーコンストラクタ
	 */
	public ContextManager(){super();}
	private static HashMap<String,Object> context=new HashMap<String,Object>();
	/**
	 * コンテキストを取得する
	 * @param key キー
	 * @return コンテキスト値
	 */
	public synchronized static Object get(String key) {
		return context.get(key);
	}
	/**
	 * コンテキストを設定する
	 * @param key キー
	 * @param value コンテキスト値
	 */
	public synchronized static void set(String key, Object value) {
		context.put(key, value);
	}
	/**
	 * コンテキストを削除する
	 * @param key キー
	 */
	public synchronized static void remove(String key) {
		context.remove(key);
	}
}
