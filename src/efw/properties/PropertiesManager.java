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
	 * WEBアプリ用プロパティファイル名。
	 * 「efw.properties」に固定。
	 */
    public static final String EFW_PROPERTIES_FILE_NAME = "efw.properties";
    /**
     * デバッグモードフラグ。
     * 「efw.isdebug」の定数。
     */
    public static final String EFW_ISDEBUG ="efw.isdebug";
    /**
     * クロスドメイン通信設定。
     * 「efw.cors」の定数。
     */
    public static final String EFW_CORS ="efw.cors";
    /**
     * デフォルトjdbcリソースの名称。
     * 「efw.jdbc.resource」の定数。
     */
    public static final String EFW_JDBC_RESOURCE ="efw.jdbc.resource";
    /**
     * バッチ用jdbcリソースURL。
     * 「efw.jdbc.resource.url」の定数。
     */
    public static final String EFW_JDBC_RESOURCE_URL ="efw.jdbc.resource.url";
    /**
     * バッチ用jdbcリソースユーザ名。
     * 「efw.jdbc.resource.username」の定数。
     */
    public static final String EFW_JDBC_RESOURCE_USERNAME ="efw.jdbc.resource.username";//for batch
    /**
     * バッチ用jdbcリソースパスワード。
     * 「efw.jdbc.resource.password」の定数。
     */
    public static final String EFW_JDBC_RESOURCE_PASSWORD ="efw.jdbc.resource.password";//for batch
    /**
     * デフォルトmailリソースの名称。
     * 「efw.mail.resource」の定数。
     */
    public static final String EFW_MAIL_RESOURCE ="efw.mail.resource";
    /**
     * バッチ用mailユーザ名。
     * 「efw.mail.username」の定数。
     */
    public static final String EFW_MAIL_USERNAME ="efw.mail.username";//for batch
    /**
     * バッチ用mailパスワード。
     * 「efw.mail.password」の定数。
     */
    public static final String EFW_MAIL_PASSWORD ="efw.mail.password";//for batch
    /**
     * brms利用フラグ。
     * 「efw.brms.import」の定数。
     */
    public static final String EFW_BRMS_IMPORT="efw.brms.import";
    /**
     * イベントフォルダ。
     * 「efw.event.folder」の定数。
     */
    public static final String EFW_EVENT_FOLDER ="efw.event.folder";
    /**
     * SQLフォルダ。
     * 「efw.sql.folder」の定数。
     */
	public static final String EFW_SQL_FOLDER="efw.sql.folder";
    /**
     * ストレジフォルダ。
     * 「efw.storage.folder」の定数。
     */
	public static final String EFW_STORAGE_FOLDER="efw.storage.folder";
	/**
     * メールフォルダ。
     * 「efw.mail.folder」の定数。
	 */
	public static final String EFW_MAIL_FOLDER="efw.mail.folder";
	/**
     * 多国語フォルダ。
     * 「efw.i18n.folder」の定数。
	 */
	public static final String EFW_I18N_FOLDER="efw.i18n.folder";
	/**
	 * ログ出力レベル。
	 *  「efw.logging.level」の定数。
	 */
	public static final String EFW_LOG_OUPUT_LEVEL = "efw.logging.level";
	/**
	 * ログインチェックフラグ。
	 *  「efw.login.check」の定数。
	 */
	public static final String EFW_LOGIN_CHECK = "efw.login.check";
	/**
	 * ログインセッション情報。
	 *  「efw.login.key」の定数。
	 */
	public static final String EFW_LOGIN_KEY = "efw.login.key";
	/**
	 * セッションタイムアウト遷移画面のURL。
	 *  「efw.login.url」の定数。
	 */
	public static final String EFW_LOGIN_URL="efw.login.url";
	/**
	 * 権限チェックフラグ。
	 * 「efw.auth.check」の定数。
	 */
	public static final String EFW_AUTH_CHECK = "efw.auth.check";
	/**
	 * 権限セッション情報。
	 * 「efw.auth.key」の定数。
	 */
	public static final String EFW_AUTH_KEY = "efw.auth.key";
	/**
	 * カンマ区切りロール配列。
	 * 権限チェックの全ケース。
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
	 * 権限チェック個別ケースのイベントIDパターン。
	 * 「####.eventid.pattern」の定数。
	 */
	public static final String EFW_AUTH_EVENTIDPATTERN ="eventid.pattern";
	/**
	 * システムエラー遷移画面のURL。
	 *  「efw.system.error.url」の定数。
	 */
	public static final String EFW_SYSTEM_ERROR_URL="efw.system.error.url";
	/**
	 * ログインチェック不要なURLのパターン。
	 * 「efw.outoflogin.url.pattern」の定数。
	 */
	public static final String EFW_OUTOFLOGIN_URL_PATTERN="efw.outoflogin.url.pattern";
	/**
	 * ログインチェック不要なイベントIDのパターン。
	 * 「efw.outoflogin.eventid.pattern」の定数。
	 */
	public static final String EFW_OUTOFLOGIN_EVENTID_PATTERN="efw.outoflogin.eventid.pattern";
	/**
	 * フォーマット関数のROUNDER。
	 * 「efw.format.rounder」の定数。
	 */
	public static final String EFW_FORMAT_ROUNDER="efw.format.rounder";
	/**
	 * 禁則文字定義。
	 * 「efw.forbidden.characters」の定数。
	 */
	public static final String EFW_FORBIDDEN_CHARACTERS="efw.forbidden.characters";
	/**
	 * 禁則文字の置換文字。
	 * 「efw.forbidden.replacement」の定数。
	 */
	public static final String EFW_FORBIDDEN_REPLACEMENT="efw.forbidden.replacement";
	
	/**
	 * ZIP圧縮と解凍の文字コード
	 * 「efw.zip.charset」の定数。
	 */
	public static final String EFW_ZIP_CHARSET="efw.zip.charset";
	
	/**
	 * プロパティ値を格納するプロパティオブジェクト。
	 */
	private static final Properties prop = new Properties();
	/**
	 * プロパティオブジェクトを取得する。
	 * @return プロパティオブジェクト。
	 */
	public static Properties getProp() {
		return PropertiesManager.prop;
	}
    /**
     * サーブレットから初期化する。
     * @throws IOException 通信エラー。
     */
    public static void init() throws IOException{
    	try(InputStream inptstrm=Thread.currentThread().getContextClassLoader().getResourceAsStream(PropertiesManager.EFW_PROPERTIES_FILE_NAME)){
    		prop.load(inptstrm);
		}
    }
    /**
     * バッチから初期化する。
     * @param propertiesFileName プロパティファイル名。
     * @throws IOException 通信エラー。
     */
    public static void initBatch(String propertiesFileName)throws IOException{
    	try(InputStream inptstrm=new FileInputStream(propertiesFileName)){
    		prop.load(inptstrm);
		}
    }
    /**
     * 文字列のプロパティを取得する。
     * @param key キー。
     * @param defaultValue 初期値。
     * @return 値。
     */
    public static String getProperty(String key,String defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null) vl=defaultValue;
        return vl;
    }
    /**
     * ブールのプロパティを取得する。
     * @param key キー。
     * @param defaultValue 初期値。
     * @return 値。
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
     * @param key キー。
     * @param defaultValue 初期値。
     * @return 値。
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
