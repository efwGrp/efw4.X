/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;

import java.util.HashMap;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.redisson.api.RedissonClient;

import efw.framework;
/**
 * Lambda環境に適用するコンテキストクラス
 * @author kejun.chang
 */
public class ValkeyContext implements EfwContext {
	
	private static final ThreadLocal<HashMap<String,Object>> threadLocal=new ThreadLocal<HashMap<String,Object>>();
	private static HashMap<String,Object> getFromThreadLocal() {
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
		Object ret=ValkeyContext.getFromThreadLocal().get(key);
		if (ret==null) {
			ret=redisson.getBucket(key).get();
			ValkeyContext.getFromThreadLocal().put(key, ret);
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
		ValkeyContext.getFromThreadLocal().put(key, value);
		redisson.getBucket(key).set(value);
	}

	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	@Override
	public void remove(String key) {
		ValkeyContext.getFromThreadLocal().remove(key);
		redisson.getBucket(key).delete();
	}
	
	/**
	 * コンテキストを破棄する
	 */
	@Override
	public void destory() {
		redisson.shutdown();
	}

}
