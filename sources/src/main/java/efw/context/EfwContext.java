/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;
/**
 * コンテキストのインタフェース。
 * @author kejun.chang
 */
public interface EfwContext {
	/**
	 * コンテキストから指定キーの値を取得する
	 * @param key キー
	 * @return 値
	 */
	public Object get(String key);
	/**
	 * コンテキストに指定キーの値を設定する
	 * @param key キー
	 * @param value 値
	 */
	public void set(String key, Object value);
	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	public void remove(String key);
	/**
	 * コンテキストを破棄する
	 */
	public void destory();
}
