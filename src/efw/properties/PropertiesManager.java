/**** efw4.X Copyright 2019 efwGrp ****/
package efw.properties;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
/**
 * プロパティ読み取りを管理するクラス。
 * @author Chang Kejun
 *
 */
public final class PropertiesManager {
	/**
	 * フレームワークに利用するプロパティファイルの名称。
	 * 「efw.properties」に固定。
	 */
    public static final String EFW_PROPERTIES_FILE_NAME = "efw.properties";
    /**
     * デバッグモードを制御するフラグのプロパティキー。
     * 「efw.isdebug」の定数。
     */
    public static final String EFW_ISDEBUG ="efw.isdebug";
    /**
     * クロスドメイン通信設定のプロパティキー。
     * 「efw.cors」の定数。
     */
    public static final String EFW_CORS ="efw.cors";
    /**
     * フレームワークに利用するjdbcリソースの名称のプロパティキー。
     * 「efw.jdbc.resource」の定数。
     */
    public static final String EFW_JDBC_RESOURCE ="efw.jdbc.resource";
    public static final String EFW_JDBC_RESOURCE_URL ="efw.jdbc.resource.url";
    public static final String EFW_JDBC_RESOURCE_USERNAME ="efw.jdbc.resource.username";
    public static final String EFW_JDBC_RESOURCE_PASSWORD ="efw.jdbc.resource.password";
    
    /**
     * フレームワークに利用するmailリソースの名称のプロパティキー。
     * 「efw.mail.resource」の定数。
     */
    public static final String EFW_MAIL_RESOURCE ="efw.mail.resource";
    public static final String EFW_MAIL_USERNAME ="efw.mail.username";//for batch
    public static final String EFW_MAIL_PASSWORD ="efw.mail.password";//for batch
    
    /**
     * 「efw.brms.import」の定数。
     */
    public static final String EFW_BRMS_IMPORT="efw.brms.import";
    /**
     * イベントJavaScriptファイルの格納パスのプロパティキー。
     * 「efw.event.folder」の定数。
     */
    public static final String EFW_EVENT_FOLDER ="efw.event.folder";
    /**
     * Sqlを外部化するXMLファイルの格納パスのプロパティキー。
     * 「efw.sql.folder」の定数。
     */
	public static final String EFW_SQL_FOLDER="efw.sql.folder";
    /**
     * ファイルの格納パスのプロパティキー。
     * 「efw.storage.folder」の定数。
     */
	public static final String EFW_STORAGE_FOLDER="efw.storage.folder";
	/**
     * メールテンプレートの格納パスのプロパティキー。
     * 「efw.mail.folder」の定数。
	 */
	public static final String EFW_MAIL_FOLDER="efw.mail.folder";
	/**
     * 国際化メッセージの格納パスのプロパティキー。
     * 「efw.i18n.folder」の定数。
	 */
	public static final String EFW_I18N_FOLDER="efw.i18n.folder";
	/**
	 * ログ出力レベルのプロパティキー。
	 *  「efw.logging.level」の定数。
	 */
	public static final String EFW_LOG_OUPUT_LEVEL = "efw.logging.level";
	/**
	 * ログインチェックフラグのプロパティキー。
	 *  「efw.login.check」の定数。
	 */
	public static final String EFW_LOGIN_CHECK = "efw.login.check";
	
	/**
	 * ログインセッション情報のプロパティキー。
	 *  「efw.login.key」の定数。
	 */
	public static final String EFW_LOGIN_KEY = "efw.login.key";
	/**
	 * セッションタイムアウト遷移画面のURL。
	 *  「efw.login.url」の定数。
	 */
	public static final String EFW_LOGIN_URL="efw.login.url";
	/**
	 * 権限チェックフラグのプロパティキー。
	 * 「efw.auth.check」の定数。
	 */
	public static final String EFW_AUTH_CHECK = "efw.auth.check";
	/**
	 * 権限セッション情報のプロパティキー。
	 * 「efw.auth.key」の定数。
	 */
	public static final String EFW_AUTH_KEY = "efw.auth.key";
	/**
	 * 権限チェック全ケース、カンマ区切り。
	 * 「efw.auth.cases」の定数。
	 */
	public static final String EFW_AUTH_CASES = "efw.auth.cases";
	/**
	 * 権限チェック個別ケースの権限パターン。
	 * 「####.auth.pattern」の定数。
	 */
	public static final String EFW_AUTH_AUTHPATTERN ="auth.pattern";
	/**
	 * 権限チェック個別ケースのページパターン。
	 * 「####.url.pattern」の定数。
	 */
	public static final String EFW_AUTH_URLPATTERN ="url.pattern";
	/**
	 * システムエラー遷移画面のURL。
	 *  「efw.system.error.url」の定数。
	 */
	public static final String EFW_SYSTEM_ERROR_URL="efw.system.error.url";
	/**
	 * ログインチェック不要なURLの正規表現文字列
	 */
	public static final String EFW_OUTOFLOGIN_URL_PATTERN="efw.outoflogin.url.pattern";
	/**
	 * ログインチェック不要なイベントIDの正規表現文字列
	 */
	public static final String EFW_OUTOFLOGIN_EVENTID_PATTERN="efw.outoflogin.eventid.pattern";
	/**
	 * フォーマット関数のROUNDER
	 */
	public static final String EFW_FORMAT_ROUNDER="efw.format.rounder";
	
	/**
	 * プロパティ値を格納するプロパティオブジェクト。
	 */
	public static Properties prop = new Properties();
    /**
     * フレームワークに利用するプロパティファイルから、プロパティ値をプロパティオブジェクトにロードする。
     * @throws IOException　プロパティファイルの読み取りエラー。
     */
    public static synchronized void init()throws IOException{
    	InputStream inptstrm;
		prop.load(inptstrm=Thread.currentThread().getContextClassLoader().getResourceAsStream(PropertiesManager.EFW_PROPERTIES_FILE_NAME));
		inptstrm.close();
    }
    public static synchronized void initBatch(String propertiesFileName)throws IOException{
    	InputStream inptstrm;
		prop.load(inptstrm=new FileInputStream(propertiesFileName));
		inptstrm.close();
    }
    /**
     * 文字列のプロパティを取得する。
     * @param key プロパティキー。
     * @param defaultValue デフォルト値。
     * @return　プロパティ値を返す。
     */
    public static String getProperty(String key,String defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null) vl=defaultValue;
        return vl;
    }
    /**
     * ブールのプロパティを取得する。
     * @param key プロパティキー。
     * @param defaultValue デフォルト値。
     * @return　プロパティ値を返す。
     */
    public static boolean getBooleanProperty(String key,boolean defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null){
    		return defaultValue;
    	}else{
            return Boolean.parseBoolean(vl);
    	}
    }

    /**
     * 数字のプロパティを取得する。
     * @param key プロパティキー。
     * @param defaultValue デフォルト値。
     * @return　プロパティ値を返す。
     */
    public static int getIntProperty(String key,int defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null){
    		return defaultValue;
    	}else{
            int iValue = 0;
            if(null!=vl && !"".equals(vl)){
                iValue = Integer.parseInt(vl);
            }
            return iValue;
    	}
    }
}
