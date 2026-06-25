/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;

import java.util.HashMap;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;

import efw.framework;
/**
 * ローカル環境に適用するコンテキストクラス
 * @author kejun.chang
 */
public class LocalContext implements EfwContext {

	private static HashMap<String,Object> context=new HashMap<String,Object>();
	/**
	 * ダミーコンストラクタ
	 */
	public LocalContext(){
		framework.initWLog("LocalContext inited.");
	}
	
	/**
	 * コンテキストから指定キーの値を取得する
	 * @param key キー
	 * @return 値
	 */
	@Override
	public Object get(String key) {
		return context.get(key);
	}

	/**
	 * コンテキストに指定キーの値を設定する
	 * @param key キー
	 * @param value 値
	 */
	@Override
	public void set(String key, Object value) {
		context.put(key, value);
	}

	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	@Override
	public void remove(String key) {
		context.remove(key);
	}

	/**
	 * コンテキストを破棄する
	 */
	@Override
	public void destory() {
		//do nothing
	}

	/////////////////////////////////////////////
	private static ReentrantLock locker=new ReentrantLock();
	/**
	 * ファイル作成用の排他ロッカーを取得する。
	 * @return 排他ロッカー。
	 */
	@Override
	public Object getLocker() {
		return locker;
	}

	/////////////////////////////////////////////
	private static HashMap<String,HashMap<String, Object>> semaphores=new HashMap<String,HashMap<String, Object>>();
	/**
	 * イベント同時実行制限用のセマフォを取得する。
	 * @param eventId イベントID。
	 * @param max 同時実行数。
	 * @return セマフォ。
	 */
	public synchronized Object getSemaphore(String eventId,int max) {
		HashMap<String, Object> ret;
		if ((ret=semaphores.get(eventId))==null) {
			HashMap<String, Object> created=new  HashMap<String, Object> ();
			created.put("eventId", eventId);
			created.put("max", max);
			created.put("semaphore", new java.util.concurrent.Semaphore(max));
			semaphores.put(eventId, ret=created);
		}else {
			int premax=(int)ret.get("max");
			if (premax!=max) {
				ret.put("max", max);
				ret.put("semaphore", new java.util.concurrent.Semaphore(max));
			}
		}
		return (Semaphore)ret.get("semaphore");
	}
}
