/**** efw4.X Copyright 2025 efwGrp ****/
package efw.context;

import javax.naming.InitialContext;
import javax.naming.NameNotFoundException;
import javax.naming.NamingException;

import efw.framework;
/**
 * コンテキストを管理するクラス。
 * @author kejun.chang
 */
public final class ContextManager {
/*
 * context.xmlにValkeyContextの記載例。
 * 
<Resource name="efw/context"
	auth="Container"
	type="efw.context.ValkeyContext"
	factory="org.apache.naming.factory.BeanFactory"
	jndiName="eanredisson"
/>
<!-- 1. JNDIリソース定義（context.xml内に直接書いてもOK） -->
<Resource name="bean/redisson"
	auth="Container"
	type="org.redisson.api.RedissonClient"
	factory="org.redisson.JndiRedissonFactory"
	configPath="/usr/local/tomcat/conf/redisson.yaml"
	closeMethod="shutdown" /> <!-- アプリ停止時に破棄されるようcloseMethodを推奨 -->
-----redisson.yaml------
singleServerConfig:
  address: "rediss://clustercfg.cache-for-helloword.txepep.serverless.usw1.cache.amazonaws.com:6379"
  connectionMinimumIdleSize: 1
  connectionPoolSize: 5
  idleConnectionTimeout: 10000
  connectTimeout: 10000
  timeout: 3000
  retryAttempts: 3

threads: 4
nettyThreads: 4
-------------------------

    <!-- 2. セッションマネージャーの起動（クラス名と属性名に注意） -->
    <Manager className="org.redisson.tomcat.JndiRedissonSessionManager"
             jndiName="bean/redisson"
             readMode="REDIS"
             updateMode="AFTER_REQUEST" />

	<!--3. コンテキストもValkeyを利用するように調整。-->
	<Resource name="efw/context"
		auth="Container"
		type="efw.context.ValkeyContext"
		factory="org.apache.naming.factory.BeanFactory"
		jndiName="bean/redisson"
	/>
*/
	
	/**
	 * ダミーコンストラクタ
	 */
	public ContextManager(){super();}
	/**
	 * コンテキスト機能の初期化
	 * @throws NamingException 初期化エラー
	 */
	public static void init() throws NamingException {
		try {
			//context.xmlファイルの定義により初期化する。
			context = (EfwContext) new InitialContext()
				.lookup("java:comp/env/efw/context");
		} catch (NameNotFoundException e) {
			//バッチの場合、また未定義の場合、名称見つからないエラーが発生する。
			if (context==null) {
				context=new LocalContext();
				framework.initWLog("No EfwContext is defined in context.xml.");
			}
		} catch(NamingException e) {
			//ほかのエラーの場合、エラーを投げる。
			//ログ出力はframeworkクラスで行う。
			throw e;
		}
	}
	
	private static EfwContext context=null;
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
		context.set(key, value);
	}
	/**
	 * コンテキストを削除する
	 * @param key キー
	 */
	public synchronized static void remove(String key) {
		context.remove(key);
	}
	/**
	 * コンテキストを破棄する
	 */
	public synchronized static void destroy() {
		context.destory();
	}
}
