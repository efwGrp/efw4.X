/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.redisson.api.RedissonClient;

import efw.framework;
/**
 * Lambda環境に適用するコンテキストクラス
 * @author kejun.chang
 */
public class ValkeyContext implements EfwContext {
	/**
	 * ダミーコンストラクタ
	 */
	public ValkeyContext(){
		framework.initWLog("ValkeyContext inited.");
	}
	/**
	 * コンテキストから指定キーの値を取得する
	 * @param key キー
	 * @return 値
	 */
	@Override
	public Object get(String key) {
		if (redisson == null) initRedisson();
		return redisson.getBucket(key).get();
	}

	/**
	 * コンテキストに指定キーの値を設定する
	 * @param key キー
	 * @param value 値
	 */
	@Override
	public void set(String key, Object value) {
		if (redisson == null) initRedisson();
		redisson.getBucket(key).set(value);
	}

	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	@Override
	public void remove(String key) {
		if (redisson == null) initRedisson();
		redisson.getBucket(key).delete();
	}
	
	/**
	 * コンテキストを破棄する
	 */
	@Override
	public void destory() {
		if (redisson == null) return;
		redisson.shutdown();
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
	 * Redissonを初期化する
	 */
    private synchronized void initRedisson() {
    	try {
        	this.redisson  = 
        			(RedissonClient) new InitialContext()
        			.lookup("java:comp/env/"+jndiName);
			framework.initCLog("ValkeyContext inited.");
    	} catch (NamingException e) {
			framework.initSLog("ValkeyContext failed.",e);
    	}
    }
}
