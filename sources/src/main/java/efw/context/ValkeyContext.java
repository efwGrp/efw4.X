/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;

import java.util.HashMap;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.redisson.api.RAtomicLong;
import org.redisson.api.RSemaphore;
import org.redisson.api.RedissonClient;

import efw.framework;
/**
 * Lambda環境に適用するコンテキストクラス
 * @author kejun.chang
 */
public class ValkeyContext implements EfwContext {
	
	private static final ThreadLocal<HashMap<String,Object>> threadLocal=new ThreadLocal<HashMap<String,Object>>();
	private static HashMap<String,Object> myThreadLocal() {
		HashMap<String,Object> ret=threadLocal.get();
		if (ret==null) {
			ret=new HashMap<String,Object>();
			threadLocal.set(ret);
		}
		return ret;
	}

	
	private String jndiName = "bean/redisson";
	/**
	 * JNDI名を設定する
	 * @param jndiName JNDI名
	 */
	public void setJndiName(String jndiName) {
		this.jndiName = jndiName; 
	}

	// Redisson 3.50.0 のクライアント
	private RedissonClient redisson=null;

	/**
	 * ダミーコンストラクタ
	 */
	public ValkeyContext(){
		//Redissonを初期化する
    	try {
        	this.redisson  = 
    			(RedissonClient) new InitialContext()
    			.lookup("java:comp/env/"+jndiName);
			framework.initCLog("ValkeyContext inited.");
    	} catch (NamingException e) {
			framework.initSLog("ValkeyContext failed.",e);
    	}
	}
	/**
	 * コンテキストから指定キーの値を取得する
	 * @param key キー
	 * @return 値
	 */
	@Override
	public Object get(String key) {
		Object ret=ValkeyContext.myThreadLocal().get(key);
		if (ret==null) {
			ret=redisson.getBucket(key).get();
			ValkeyContext.myThreadLocal().put(key, ret);
		}
		return ret;
	}

	/**
	 * コンテキストに指定キーの値を設定する
	 * @param key キー
	 * @param value 値
	 */
	@Override
	public void set(String key, Object value) {
		ValkeyContext.myThreadLocal().put(key, value);
		redisson.getBucket(key).set(value);
	}

	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	@Override
	public void remove(String key) {
		ValkeyContext.myThreadLocal().remove(key);
		redisson.getBucket(key).delete();
	}
	
	/**
	 * コンテキストを破棄する
	 */
	@Override
	public void destory() {
		redisson.shutdown();
	}

	/**
	 * ファイル作成用の排他ロッカーを取得する。
	 * @return 排他ロッカー。
	 */
	@Override
	public Object getLocker() {
		return this.redisson.getLock("EFW_CONTEXT_LOCKER");
	}
	/**
	 * イベント同時実行制限用のセマフォを取得する。
	 * @param eventId イベントID。
	 * @param max 同時実行数。
	 * @return セマフォ。
	 */
	@Override
	public synchronized Object getSemaphore(String eventId, int max) {
		RSemaphore semaphore= this.redisson.getSemaphore("EFW_CONTEXT_RSEMAPHORE_"+eventId);
		RAtomicLong totalPermits = this.redisson.getAtomicLong("EFW_CONTEXT_RSEMAPHORE_"+eventId+":total");
		if (totalPermits.get()!=max) {
			semaphore.delete();
			if (semaphore.trySetPermits(max)) {
				totalPermits.set(max);
			}
		}
		return semaphore;
	}
}
