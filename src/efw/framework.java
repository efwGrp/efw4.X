/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;

import javax.script.ScriptException;

import efw.db.Database;
import efw.event.RemoteEventManager;
import efw.excel.Excel;
import efw.format.FormatManager;
import efw.i18n.I18nProperties;
import efw.log.LogManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;
/**
 * frameworkはフレーワーク初期化、状態維持、ログ記録などに関わる機能を実現する。
 * @author kejun.chang
 *
 */
public final class framework {
	/**
	 * バージョンを表す。
	 */
	public static final String version="4.06.016";// change it when releasing jar.
	/**
	 * webHome
	 */
	private static String webHome="";
	/**
	 * WEBホームの絶対パスを取得する。
	 * @return WEBホーム。
	 */
	public static String getWebHome() {
		return webHome;
	}
	
	private static void initCommonWBL(String webHome) {
		//-----------------------------------------------------------------
		framework.webHome=webHome;
		framework.initCLog("webHome = "+webHome);
		//-----------------------------------------------------------------
		//systemErrorUrl　ここはログを出力しない。filter初期化時出力したから。
		framework.systemErrorUrl=PropertiesManager.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL,framework.getSystemErrorUrl());
		//-----------------------------------------------------------------
		//フォーマットrounder、プロパティの後で必要。エラーなし。
		framework.formatRounder=PropertiesManager.getProperty(PropertiesManager.EFW_FORMAT_ROUNDER, framework.getFormatRounder());
		framework.initCLog("formatRounder = " + framework.getFormatRounder());
		//-----------------------------------------------------------------
		//get attrs from properties or context
		framework.isDebug=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_ISDEBUG,false);
		framework.initCLog("isDebug = " + framework.getIsDebug());
		//-----------------------------------------------------------------
		String propertyPath;
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,framework.getEventFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.eventFolder=(new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/");
		if (!new File(framework.getEventFolder()).exists()){
			framework.initWLog("The folder does not exist. eventFolder = "+framework.getEventFolder());
		}else {
			framework.initCLog("eventFolder = " + framework.getEventFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,framework.getSqlFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.sqlFolder=(new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/");
		if (!new File(framework.getSqlFolder()).exists()){
			framework.initWLog("The folder does not exist. sqlFolder = "+framework.getSqlFolder());
		}else{
			framework.initCLog("sqlFolder = " + framework.getSqlFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,framework.getMailFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.mailFolder=(new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/");
		if (!new File(framework.getMailFolder()).exists()){
			framework.initWLog("The folder does not exist. mailFolder = "+framework.getMailFolder());
		}else{
			framework.initCLog("mailFolder = " + framework.getMailFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_I18N_FOLDER,framework.getI18nFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.i18nFolder=(new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/");
		if (!new File(framework.getI18nFolder()).exists()){
			framework.initWLog("The folder does not exist. i18nFolder = "+framework.getI18nFolder());
		}else{
			framework.initCLog("i18nFolder = " + framework.getI18nFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,framework.getStorageFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.storageFolder=(new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/");
		if(!new File(framework.getStorageFolder()).exists()){
			framework.initWLog("The folder does not exist. storageFolder = "+framework.getStorageFolder());
		}else {
			framework.initCLog("storageFolder = " + framework.getStorageFolder());
		}
		//-----------------------------------------------------------------
		try {
			RemoteEventManager.init();//SSL関連を初期化して、removeEvent便利にするだけ。プロパティも不要。
			framework.initCLog("RemoteEventManager inited.");
		}catch(Exception ex) {
			framework.initWLog("RemoteEventManager failed.",ex);
		}
	}
	
	private static void initScript() throws ScriptException {
		//-----------------------------------------------------------------
		try{
			ScriptManager.init();//環境合わない場合、efw.jar問題がある場合、エラー。//ここからエラーになると、処理を中断する。
			framework.initCLog("ScriptManager inited.");
			framework.initSuccessFlag=true;
		}catch(ScriptException ex){
			framework.initSLog("ScriptManager failed.",ex);
			framework.initSuccessFlag=false;
			throw ex;
		}
		//-----------------------------------------------------------------
		framework.initCLog("Efw Version = "+framework.version);		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static void initCommonBL() {
		//-----------------------------------------------------------------
		try{
			Class db = Class.forName("efw.db.DatabaseManager");
			Method method = db.getDeclaredMethod("initFromBatch");
			method.invoke(null);
			framework.initCLog("DatabaseManager inited.");
		}catch(Exception ex){
			framework.initWLog("DatabaseManager failed.",ex);
		}
		//-----------------------------------------------------------------
		try{
			//Besure jar is existed before calling MailManager, or it is error without exception in jar
			Class.forName("javax.mail.Session");
			Class mailManager = Class.forName("efw.mail.MailManager");
			Method method = mailManager.getDeclaredMethod("initFromBatch");
			method.invoke(null);
			framework.initCLog("MailManager inited.");
		}catch(Exception ex){
			framework.initWLog("MailManager failed.",ex);
		}
		//-----------------------------------------------------------------
		brmsImport=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_BRMS_IMPORT, false);
		framework.initCLog("brmsImport = "+brmsImport);
		if (brmsImport){
			try{
				Class brms = Class.forName("efw.brms.BrmsManager");
				Method method = brms.getDeclaredMethod("initFromBatch", (Class[])null);
				method.invoke(null,(Object[])null);
				framework.initCLog("BrmsManager inited.");
			}catch(Exception ex){
				framework.initWLog( "BrmsManager failed.",ex);
			}
		}
	}
	/**
	 * バッチの初期化。
	 * @param webHome WEBホーム。
	 * @param properties プロパティファイルのパス。
	 * @throws IOException 通信エラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	protected static synchronized void initBatch(String webHome,String properties) throws IOException, ScriptException{
		if (framework.getInitSuccessFlag()) return;
		// begin to init efwServletのinitと同等
		//-----------------------------------------------------------------
		PropertiesManager.initBatch(properties);//ここからエラーになると、処理を中断する。
		LogManager.init();
		framework.initCLog("properties = "+properties);
		framework.initCLog("PropertiesManager.inited.");
		//-----------------------------------------------------------------
		initCommonWBL(webHome);
		initCommonBL();
		//-----------------------------------------------------------------
		initScript();
	}
	/**
	 * サーブレットの初期化。
	 * @param webHome WEBホーム。
	 * @throws IOException 通信エラー。
	 * @throws ScriptException スクリプトエラー。
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	protected static synchronized void initServlet(String webHome) throws IOException, ScriptException {
		if (framework.getInitSuccessFlag()) return;
		//-----------------------------------------------------------------
		// begin to init efw　まずefw.propertiesを読んで、次は簡単な情報をスタート
		//-----------------------------------------------------------------
		PropertiesManager.init();
		LogManager.init();//エラーなし。
		framework.initCLog("PropertiesManager inited.");//ログ出力はLogManagerの初期化後で必要。
		//-----------------------------------------------------------------
		initCommonWBL(webHome);
		//-----------------------------------------------------------------
		framework.cors=PropertiesManager.getProperty(PropertiesManager.EFW_CORS,framework.getCors());
		framework.initCLog("cors = " + framework.getCors());
		//-----------------------------------------------------------------
		framework.jdbcResourceName=PropertiesManager.getProperty(PropertiesManager.EFW_JDBC_RESOURCE,framework.getJdbcResourceName());
		framework.initCLog("jdbcResourceName = " + framework.getJdbcResourceName());
		try{
			Class db = Class.forName("efw.db.DatabaseManager");
			Method method = db.getDeclaredMethod("init");
			method.invoke(null);
			framework.initCLog("DatabaseManager inited.");
		}catch(Exception ex){
			framework.initWLog("DatabaseManager failed.",ex);
		}
		//-----------------------------------------------------------------
		framework.mailResourceName=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_RESOURCE,framework.getMailResourceName());
		framework.initCLog("mailResourceName = " + framework.getMailResourceName());
		try{
			//Besure jar is existed before calling MailManager, or it is error without exception in jar
			Class.forName("javax.mail.Session");
			Class mailManager = Class.forName("efw.mail.MailManager");
			Method method = mailManager.getDeclaredMethod("init");
			method.invoke(null);
			framework.initCLog("MailManager inited.");
		}catch(Exception ex){
			framework.initWLog("MailManager failed.",ex);
		}
		//-----------------------------------------------------------------
		//efwCorsFilter init to check calling to sub
		try {
			efwCorsFilter.init();//プロパティの後で必要。
			framework.initCLog("efwCorsFilter inited.");
		}catch(Exception ex) {
			framework.initSLog("efwCorsFilter failed.",ex);
			throw ex;
		}
		//-----------------------------------------------------------------
		initScript();
	}
	/**
	 * WEBサーバシャットダウン時サーブレット停止とともに破棄イベントを実行する。
	 * @throws ScriptException スクリプトエラー。
	 * @throws NoSuchMethodException メソッドなしエラー。
	 */
	protected static void destroyServlet() throws NoSuchMethodException, ScriptException {
		if (!framework.getInitSuccessFlag()) return;
		ScriptManager.doDestroy();
	}
	/////////////////////////////////////////////////////////////////////////////////////////////
	private static boolean brmsImport=false;
	/**
	 * brms取込要否フラグを取得する。
	 * 初期値は「false」。
	 * @return brms取込要否フラグ。
	 */
	public static boolean getBrmsImport() {
		return brmsImport;
	}
	
	private static boolean initSuccessFlag=false;
	/**
	 * 初期化成功フラグを取得する。
	 * 初期値は「false」。
	 * @return 初期化成功フラグ。
	 */
	public static boolean getInitSuccessFlag() {
		return initSuccessFlag;
	}

	private static String eventFolder="/WEB-INF/efw/event";
	/**
	 * イベントフォルダを取得する。
	 * efw.propertiesのefw.event.folderで設定する。
	 * 初期値は「/WEB-INF/efw/event」。初期化後絶対パスで表す。
	 * @return イベントフォルダ。
	 */
	public static String getEventFolder() {
		return eventFolder;
	}

	private static String sqlFolder="/WEB-INF/efw/sql";
	/**
	 * SQLフォルダを取得する。
	 * efw.propertiesのefw.sql.folderで設定、
	 * 初期値は「/WEB-INF/efw/sql」。初期化後絶対パスで表す。
	 * @return SQLフォルダ。
	 */
	public static String getSqlFolder() {
		return sqlFolder;
	}

	private static String storageFolder="/WEB-INF/efw/storage";
	/**
	 * ストレジフォルダを取得する。
	 * efw.propertiesのefw.storage.folderで設定、
	 * 初期値は「/WEB-INF/efw/storage」。初期化後絶対パスで表す。
	 * @return ストレジフォルダ。
	 */
	public static String getStorageFolder() {
		return storageFolder;
	}

	private static String mailFolder="/WEB-INF/efw/mail";
	/**
	 * メールフォルダを取得する。
	 * efw.propertiesのefw.mail.folderで設定、
	 * 初期値は「/WEB-INF/efw/mail」。初期化後絶対パスで表す。
	 * @return メールフォルダ。
	 */
	public static String getMailFolder() {
		return mailFolder;
	}

	private static String i18nFolder="/WEB-INF/efw/i18n";
	/**
	 * 多国語フォルダを取得する。
	 * efw.propertiesのefw.i18n.folderで設定、
	 * 初期値は「/WEB-INF/efw/i18n」。初期化後絶対パスで表す。
	 * @return 多国語フォルダ。
	 */
	public static String getI18nFolder() {
		return i18nFolder;
	}

	private static String formatRounder="HALF_EVEN";
	/**
	 * フォーマットRounderを取得する。
	 * @return フォーマットRounder。
	 */
	public static String getFormatRounder() {
		return formatRounder;
	}

	private static String jdbcResourceName="jdbc/efw";
	/**
	 * デフォルトjdbcリソース名を取得する。
	 * efw.propertiesのefw.jdbc.resourceで設定、
	 * 初期値は「jdbc/efw」。
	 * @return jdbcリソース名。
	 */
	public static String getJdbcResourceName() {
		return jdbcResourceName;
	}
    private static String mailResourceName="mail/efw";
    /**
     * デフォルトのメールリソース名を取得する。
     * efw.propertiesのefw.mail.resourceで設定、
     * 初期値は「mail/efw」。
     * @return メールリソース名。
     */
	public static String getMailResourceName() {
		return mailResourceName;
	}
	
	/**
	 * クロスドメイン通信設定、
	 * 他のサーバーのウェブページから本サイトのイベントを利用する可否を管理する。
	 * デフォルトは * 全部許可。
	 * * : 全部許可, null : 全部拒否, http://xxx/xxx,http://yyy/yyy : 指定サイト許可。
	 */
	private static String cors="*";
	/**
	 * cors設定を取得する。
	 * @return cors設定。
	 */
	public static String getCors() {
		return cors;
	}
	/**
	 * レスポンスの文字セット定数、「UTF-8」に固定。
	 */
	public static final String SYSTEM_CHAR_SET="UTF-8";
    /**
     * コンテンツタイプ、「application/json;charset=UTF-8」に固定。
     */
	public static final String CONTENT_TYPE = "application/json;charset=UTF-8";

	private static String systemErrorUrl="error.jsp";
	/**
	 * システムエラー画面URLを取得する。
	 * 初期値は"error.jsp"。
	 * @return システムエラー画面URL。
	 */
	public static String getSystemErrorUrl() {
		return systemErrorUrl;
	}
	
	/**
	 * デバッグモードを制御するフラグ。
	 * <br>efw.propertiesのefw.isdebugで設定、
	 * デフォルトはfalse。
	 * <br>trueの場合、SqlとScriptの変更はリアルに反映する。falseの場合、SqlとScriptの変更は再起動するまで反映しない。
	 */
	private static boolean isDebug=false;
	/**
	 * デバッグモードフラグを取得する。
	 * @return デバッグモードフラグ。
	 */
	public static boolean getIsDebug() {
		return framework.isDebug;
	}
	
	/**
	 * requestオブジェクト。
	 * スレッドローカルにrequestオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 * HttpServletRequest
	 */
	private static final ThreadLocal<Object> request=new ThreadLocal<Object>();
	/**
	 * requestオブジェクトを取得する（スレッドローカル用）。
	 * @return requestオブジェクト。
	 */
	public static Object getRequest() {
		return framework.request.get();
	}
	/**
	 * requestオブジェクトを設定する（スレッドローカル用）。
	 * @param request requestオブジェクト。
	 */
	public static void setRequest(Object request) {
		framework.request.set(request);
	}
	/**
	 * requestオブジェクトを削除する（スレッドローカル用）。
	 */
	public static void removeRequest() {
		framework.request.remove();
	}
	
	/**
	 * responseオブジェクト。
	 * スレッドローカルにresponseオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 * HttpServletResponse
	 */
	private static final ThreadLocal<Object> response=new ThreadLocal<Object>();
	/**
	 * responseオブジェクトを取得する（スレッドローカル用）。
	 * @return responseオブジェクト。
	 */
	public static Object getResponse() {
		return framework.response.get();
	}
	/**
	 * responseオブジェクトを設定する（スレッドローカル用）。
	 * @param response responseオブジェクト。
	 */
	public static void setResponse(Object response) {
		framework.response.set(response);
	}
	/**
	 * responseオブジェクトを削除する（スレッドローカル用）。
	 */
	public static void removeResponse() {
		framework.response.remove();
	}
	
	/**
	 * i18nPropオブジェクト。
		   * スレッドローカルにi18nPropオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 * ここに格納するのは一つの言語のものだけ。そしてsをつけない。
	 */
	private static final ThreadLocal<I18nProperties> i18nProp=new ThreadLocal<I18nProperties>();
	public static I18nProperties getI18nProp() {
		return framework.i18nProp.get();
	}
	public static void setI18nProp(I18nProperties i18nProp) {
		framework.i18nProp.set(i18nProp);
	}
	public static void removeI18nProp() {
		framework.i18nProp.remove();
	}
	/**
	 * Excelオブジェクト。
	 * スレッドローカルにExcelオブジェクトを格納する。サーバーサイトJavascriptの処理後、必ず閉じるため。
	 */
	private static final ThreadLocal<HashMap<String,Excel>> excels=new ThreadLocal<HashMap<String,Excel>>();
	/**
	 * Excelオブジェクトを一括取得する（スレッドローカル用）。
	 * @return Excelオブジェクトマップ。
	 */
	public static HashMap<String,Excel> getExcels() {
		return framework.excels.get();
	}
	/**
	 * Excelオブジェクトを取得する（スレッドローカル用）。
	 * @param key キー。
	 * @return Excelオブジェクト。
	 */
	public static Excel getExcel(String key) {
		if (excels.get()==null) return null;
		return framework.excels.get().get(key);
	}
	/**
	 * Excelオブジェクトを設定する（スレッドローカル用）。
	 * @param key キー。
	 * @param excel Excelオブジェクト。
	 */
	public static void setExcel(String key,Excel excel) {
		if (excels.get()==null) excels.set(new HashMap<String,Excel>());
		framework.excels.get().put(key,excel);
	}
	/**
	 * Excelオブジェクトを削除する（スレッドローカル用）。
	 * @param key キー。
	 */
	public static void removeExcel(String key) {
		if (framework.excels.get()!=null) {
			framework.excels.get().remove(key);
		}
	}
	/**
	 * Excelオブジェクトを一括削除する（スレッドローカル用）。
	 */
	public static void removeExcels() {
		framework.excels.remove();
	}
	/**
	 * データベースオブジェクト。
	 * スレッドローカルにデータベースオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 */
	private static final ThreadLocal<HashMap<String,Database>> databases=new ThreadLocal<HashMap<String,Database>>();
	/**
	 *  データベースオブジェクトを一括取得する（スレッドローカル用）。
	 * @return データベースオブジェクトマップ。
	 */
	public static HashMap<String,Database> getDatabases() {
		return framework.databases.get();
	}
	/**
	 * データベースオブジェクトを取得する（スレッドローカル用）。
	 * @param key キー。
	 * @return データベースオブジェクト。
	 */
	public static Database getDatabase(String key) {
		if (databases.get()==null) return null;
		return framework.databases.get().get(key);
	}
	/**
	 * データベースオブジェクトを設定する（スレッドローカル用）。
	 * @param key キー。
	 * @param database データベースオブジェクト。
	 */
	public static void setDatabase(String key,Database database) {
		if (databases.get()==null) databases.set(new HashMap<String,Database>());
		framework.databases.get().put(key,database);
	}
	/**
	 * データベースオブジェクトを一括削除する（スレッドローカル用）。
	 */
	public static void removeDatabases() {
		framework.databases.remove();
	}
	
	/**
	 * Writerオブジェクト。
	 * スレッドローカルにWriterオブジェクトを格納する。サーバーサイトJavascriptの処理後、必ず閉じるため。
	 */
	private static final ThreadLocal<HashMap<String,PrintWriter>> writers=new ThreadLocal<HashMap<String,PrintWriter>>();
	/**
	 * Writerオブジェクトを一括取得する（スレッドローカル用）。
	 * @return Writerオブジェクトマップ。
	 */
	public static HashMap<String,PrintWriter> getWriters(){
		return framework.writers.get();
	}
	/**
	 * Writerオブジェクトを取得する（スレッドローカル用）。
	 * @param key キー。
	 * @return Writerオブジェクト。
	 */
	public static PrintWriter getWriter(String key) {
		if (framework.writers.get()==null) return null;
		return framework.writers.get().get(key);
	}
	/**
	 * Writerオブジェクトを設定する（スレッドローカル用）。
	 * @param key キー。
	 * @param writer Writerオブジェクト。
	 */
	public static void setWriter(String key,PrintWriter writer) {
		if (writers.get()==null) writers.set(new HashMap<String,PrintWriter>());
		framework.writers.get().put(key,writer);
	}
	/**
	 * Writterオブジェクトを削除する（スレッドローカル用）。
	 * @param key キー。
	 */
	public static void removeWriter(String key) {
		if (framework.writers.get()!=null) {
			framework.writers.get().remove(key);
		}
	}
	/**
	 * Writterオブジェクトを一括削除する（スレッドローカル用）。
	 */
	public static void removeWriters() {
		framework.writers.remove();
	}
	
	/**
	 * thread毎のログを記録する
	 */
	private static final ThreadLocal<ArrayList<String>> threadLogs=new ThreadLocal<ArrayList<String>>();
	/**
	 * スレッドログを取得する（スレッドローカル用）。
	 * スレッドログは一括取得する。行単位の取得機能はなし。
	 * @return スレッドログ。
	 */
	public static ArrayList<String> getThreadLogs() {
		return framework.threadLogs.get();//初期化なしの場合がある。利用側で対応する。
	}
	/**
	 * スレッドログを記録する（スレッドローカル用）。
	 * @param logType ログタイプ、( init | runtime | access | database | brms )。
	 * @param lv ログレベル、( SEVERE | WARNING | INFO | CONFIG | FINE | FINER | FINEST )。
	 * @param log ログ内容。
	 */
	public static void setThreadLog(String logType,Level lv,String log) {
		if (framework.getIsDebug()) {// 初期化時のログは記録しなくてもいい
			if (threadLogs.get()==null) threadLogs.set(new ArrayList<String>());
			ArrayList<String> logs=framework.threadLogs.get();
			if (logs.size()>100) {
				logs.remove(0);
			}
			String stringDate=FormatManager.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss.SSS ");
			String stringLv="";
			switch(lv.getName()) {
				case "SEVERE":	stringLv="[SEVERE]";break;
				case "WARNING":	stringLv="[WARNING]";break;
				case "INFO":	stringLv="[INFO]";break;
				case "CONFIG":	stringLv="[CONFIG]";break;
				case "FINE":	stringLv="[FINE]";break;
				case "FINER":	stringLv="[FINER]";break;
				case "FINEST":	stringLv="[FINEST]";break;
			}
			logs.add(stringDate+logType+stringLv+":"+log);
		}
	}
	/**
	 * スレッドログを一括削除する（スレッドローカル用）。
	 */
	public static void removeThreadLogs() {
		framework.threadLogs.remove();
	}

	private static final ThreadLocal<Integer> restStatus=new ThreadLocal<Integer>();
	/**
	 * restステータスコードを取得する（スレッドローカル用）。
	 * @return restステータスコード。
	 */
	public static Integer getRestStatus() {
		return restStatus.get();
	}
	/**
	 * restステータスコードを設定する（スレッドローカル用）。
	 * @param responseCode restステータスコード。
	 */
	public static void setRestStatus(Integer responseCode) {
		restStatus.set(responseCode);
	}
	/**
	 * restステータスコードを削除する（スレッドローカル用）。
	 */
	public static void removeRestStatus() {
		restStatus.remove();
	}
	/**
	 * 数字フォーマット用
	 */
	private static final ThreadLocal<HashMap<String,DecimalFormat>> numberFormats=new ThreadLocal<HashMap<String,DecimalFormat>>();
	/**
	 * 数字フォーマットを取得する（スレッドローカル用）。
	 * @param key キー。
	 * @return フォーマットオブジェクト。
	 */
	public static DecimalFormat getNumberFormat(String key) {
		if (numberFormats.get()==null) return null;
		return numberFormats.get().get(key);
	}
	/**
	 * 数字フォーマットを設定する（スレッドローカル用）。
	 * @param key キー。
	 * @param formater フォーマットオブジェクト。
	 */
	public static void setNumberFormat(String key, DecimalFormat formater) {
		if (numberFormats.get()==null) numberFormats.set(new HashMap<String,DecimalFormat>());
		numberFormats.get().put(key, formater);
	}
	/**
	 * 数字フォーマットを一括削除する（スレッドローカル用）。
	 */
	public static void removeNumberFormats() {
		numberFormats.remove();
	}
	/**
	 * 日付フォーマット用
	 */
	private static final ThreadLocal<HashMap<String,DateFormat>> dateFormats=new ThreadLocal<HashMap<String,DateFormat>>();
	/**
	 * 日付フォーマットを取得する（スレッドローカル用）。
	 * @param key キー。
	 * @return フォーマットオブジェクト。
	 */
	public static DateFormat getDateFormat(String key) {
		if (dateFormats.get()==null) return null;
		return dateFormats.get().get(key);
	}
	/**
	 * 日付フォーマットを設定する（スレッドローカル用）。
	 * @param key キー。
	 * @param formater フォーマットオブジェクト。
	 */
	public static void setDateFormat(String key,DateFormat formater) {
		if (dateFormats.get()==null) dateFormats.set(new HashMap<String,DateFormat>());
		dateFormats.get().put(key, formater);
	}
	/**
	 * 日付フォーマットを一括削除する（スレッドローカル用）。
	 */
	public static void removeDateFormats() {
		dateFormats.remove();
	}	
	
	//=========================================================================
	private static void init(Level lv,String info) {// 表示内容を分かりやすいための関数
		setThreadLog("[init]",lv,info);
		LogManager.getLogger().log(lv,info);
	}
	private static void runtime(Level lv,String info) {// 表示内容を分かりやすいための関数
		setThreadLog("[runtime]",lv,info);
		LogManager.getLogger().log(lv,info);
	}
	private static void access(Level lv,String info) {// 表示内容を分かりやすいための関数
		setThreadLog("[access]",lv,info);
		LogManager.getLogger().log(lv,info);
	}
	private static void database(Level lv,String info) {// 表示内容を分かりやすいための関数
		setThreadLog("[database]",lv,info);
		LogManager.getLogger().log(lv,info);
	}
	private static void brms(Level lv,String info) {// 表示内容を分かりやすいための関数
		setThreadLog("[brms]",lv,info);
		LogManager.getLogger().log(lv,info);
	}
	//=========================================================================
	/**
	 * 初期化時一般ログを記録する。
	 * @param info 説明文字列。
	 */
	public static void initCLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			init(Level.INFO,info);
		}
	}
	/**
	 * 初期化時ワーニングログを記録する。
	 * @param info 説明文字列。
	 */
	public static void initWLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			init(Level.WARNING,info);
		}
	}
	/**
	 * 初期化時ワーニングログを一括記録する。
	 * @param info 説明文字列。
	 * @param ex エラー。
	 */
	public static void initWLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			init(Level.WARNING,info+" "+getUsefulInfoFromException(ex));
		}
	}
	/**
	 * 初期化時深刻エラーログを記録する。
	 * @param info 説明文字列。
	 * @param ex エラー。
	 */
	public static void initSLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			init(Level.SEVERE,info+" "+getUsefulInfoFromException(ex));
		}
	}
	/**
	 * 実行時深刻エラーログを記録する。
	 * @param info 説明文字列。
	 */
	public static void runtimeSLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,info);
		}
	}
	/**
	 * 実行時深刻エラーログを記録する。
	 * @param ex エラー。
	 */
	public static void runtimeSLog(Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,getUsefulInfoFromException(ex));
			ex.printStackTrace();
		}
	}
	/**
	 * 実行時深刻エラーログを記録する。
	 * @param info 説明文字列。
	 * @param ex エラー。
	 */
	public static void runtimeSLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,info+" "+getUsefulInfoFromException(ex));
		}
	}
	/**
	 * 実行時ワーニングログを記録する。
	 * @param info 説明文字列。
	 */
	public static void runtimeWLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			runtime(Level.WARNING,info);
		}
	}
	/**
	 * 実行時ワーニングログを記録する。
	 * @param ex エラー。
	 */
	public static void runtimeWLog(Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			runtime(Level.SEVERE,getUsefulInfoFromException(ex));
		}
	}
	/**
	 * イベントのアクセスログを記録する。
	 * @param userId ログインユーザID。
	 * @param requestJSON リクエストJSONの文字列。
	 */
	public static void accessLog(String userId,String requestJSON) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			access(Level.INFO,"userId = "+userId+"; request = "+requestJSON);
		}
	}
	/**
	 * データベースログを記録する。
	 * @param groupId SQL定義ファイル名。
	 * @param sqlId SQL定義ID。
	 * @param sql 実行されるSQL。
	 * @param prms パラメータ配列。
	 */
	public static void databaseLog(String groupId,String sqlId,String sql,ArrayList<Object> prms) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.INFO,"groupId = "+groupId +"; sqlId = "+sqlId+"; params = "+prms+"; sql = "+sql);
		}
	}
	/**
	 * データベースログを記録する。
	 * @param sql 実行されるSQL。
	 */
	public static void databaseLog(String sql) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.INFO,"sql = "+sql);
		}
	}
	/**
	 * ルールログを記録する。
	 * @param codeType ルール呼び出しのタイプ、( CODETYPE_ID | CODETYPE_NAME | CODETYPE_ALIAS )。
	 * @param ruleIndentifier ルール識別子。
	 * @param ruleDate ルール基準日。
	 * @param params ルール呼び出しのパラメータ。
	 */
	public static void brmsLog(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			brms(Level.INFO,"input xml = "+createRuleParamXml(codeType,ruleIndentifier,ruleDate,params));
		}
	}
	//=========================================================================
	/**
	 * JavaScriptのtry catchからエラー内容を取得する。
	 * @param e throwされたもの。
	 * @return エラー内容。
	 */
	public static String getUsefulInfoFromException(Exception e) {
		if (e.getCause()!=null) {
			return e.getCause().toString();
		}else {
			return e.getClass().getName()+":"+e.getMessage();
		}
	}
	/**
	 * JavaScriptのtry catchからエラー内容を取得する。
	 * @param e throwされたもの。
	 * @return エラー内容。
	 */
	public static String getUsefulInfoFromException(String e) {
		return e;
	}
	/**
	 * XMLファイルを作成
	 * 
	 * @param codeType		コードタイプ
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate			 ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params		  ルール呼び出しパラメーター
	 * @throws Exception 実行エラー
	 */
	private static final int CODETYPE_ID = 0;
	private static final int CODETYPE_NAME = 1;
	private static final int CODETYPE_ALIAS = 2;
	@SuppressWarnings("rawtypes")
	private static String createRuleParamXml(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params){
		//-----------------------
		StringBuilder ret=new StringBuilder();
		ret.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		//-----------------------
		ret.append("<ruleparameter codetype=\"");
		if (codeType==CODETYPE_ID){
			ret.append("id");
		}else if (codeType==CODETYPE_NAME){
			ret.append("name");
		}else if (codeType==CODETYPE_ALIAS){
			ret.append("alias");
		}
		ret.append("\" date=\"");
		ret.append(ruleDate);
		ret.append("\">");
		//-----------------------
		ret.append("<rule code=\"");
		ret.append(ruleIndentifier);
		ret.append("\"/>");
		//-----------------------
		ret.append("<items>");
		//-----------------------
		Iterator<Entry<String, Object>> it = params.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Object> entry = (Entry<String, Object>) it.next();
			String key = entry.getKey().toString();
			Object value = entry.getValue();
			ret.append("<item code=\"");
			ret.append(key);
			ret.append("\"");
			if (value == null) {
				ret.append("><value></value>");
			} else if (value instanceof String) {
				ret.append(" type=\"string\"><value>");
				ret.append(value);
				ret.append("</value>");
			} else if (value instanceof Double) {
				ret.append(" type=\"number\"><value>");
				ret.append(value);
				ret.append("</value>");
			} else if (value instanceof ArrayList) {
				ArrayList ary=(ArrayList)value;
				for(int i=0;i<ary.size();i++){
					Object subValue=ary.get(i);
					if (i==0){
						if (subValue==null){
							ret.append(">");
						}else if (subValue instanceof String){
							ret.append(" type=\"string\">");
						}else if(subValue instanceof Double){
							ret.append(" type=\"number\">");
						}
					}
					if (subValue==null){
						ret.append("<value></value>");
					}else if (subValue instanceof String){
						ret.append("<value>");
						ret.append(subValue);
						ret.append("</value>");
					}else if(subValue instanceof Double){
						ret.append("<value>");
						ret.append(subValue);
						ret.append("</value>");
					}
				}
			}
			ret.append("</item>");
		}		
		ret.append("</items></ruleparameter>");
		return ret.toString();
	}

}
