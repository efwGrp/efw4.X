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
	/**
	 * ファイル作成用の排他ロッカーを取得する。
	 * @return 排他ロッカー。
	 */
	public Object getLocker();
	/**
	 * イベント同時実行制限用のセマフォを取得する。
	 * @param eventId イベントID。
	 * @param max 同時実行数。
	 * @return セマフォ。
	 */
	public Object getSemaphore(String eventId,int max);
}
