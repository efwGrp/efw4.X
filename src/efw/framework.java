/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
import java.io.File;
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

import efw.db.Database;
import efw.event.RemoteEventManager;
import efw.excel.Excel;
import efw.format.FormatManager;
import efw.i18n.I18nProperties;
import efw.log.LogManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;

public final class framework {
	/**
	 * バージョンを表す。
	 */
	public static final String version="4.06.014";// change it when releasing jar.
	/**
	 * webHome
	 */
	private static String webHome="";
	public static String getWebHome() {
		return webHome;
	}
	
	private static void initCommonWBL(String webHome) throws Exception {
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
	
	private static void initScript() throws Exception {
		//-----------------------------------------------------------------
		try{
			ScriptManager.init();//環境合わない場合、efw.jar問題がある場合、エラー。//ここからエラーになると、処理を中断する。
			framework.initCLog("ScriptManager inited.");
			framework.initSuccessFlag=true;
		}catch(Exception ex){
			framework.initSLog("ScriptManager failed.",ex);
			framework.initSuccessFlag=false;
			throw ex;
		}
		//-----------------------------------------------------------------
		framework.initCLog("Efw Version = "+framework.version);		
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static void initCommonBL() throws Exception {
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
			Method method = mailManager.getDeclaredMethod("initFromBatch",String.class);
			method.invoke(null,framework.getMailFolder());
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
	
	public static synchronized void initBatch(String webHome,String properties) throws Exception {
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
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static synchronized void initServlet(String webHome) throws Exception {
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
			Method method = mailManager.getDeclaredMethod("init",String.class);
			method.invoke(null,framework.getMailFolder());
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
	public static void destroyServlet() throws Exception {
		if (!framework.getInitSuccessFlag()) return;
		ScriptManager.doDestroy(framework.getEventFolder());
	}
	/////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * brmsImport
	 */
	private static boolean brmsImport=false;
	public static boolean getBrmsImport() {
		return brmsImport;
	}
	
	/**
	 * 初期化成功か否かを表すフラグ。
	 */
	private static boolean initSuccessFlag=false;
	public static boolean getInitSuccessFlag() {
		return initSuccessFlag;
	}
	/**
	 * イベントJavaScriptファイルの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.event.folderで設定する。
	 * デフォルトは「/WEB-INF/efw/event」。
	 */
	private static String eventFolder="/WEB-INF/efw/event";
	public static String getEventFolder() {
		return eventFolder;
	}
	/**
	 * Sql外部化XMLファイルの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.sql.folderで設定、
	 * デフォルトは「/WEB-INF/efw/sql」。
	 */
	private static String sqlFolder="/WEB-INF/efw/sql";
	public static String getSqlFolder() {
		return sqlFolder;
	}
	/**
	 * ファイルの格納パス、
	 * 絶対パスで表す。
	 * <br>efw.propertiesのefw.storage.folderで設定、
	 * デフォルトは「/storage」。
	 */
	private static String storageFolder="/WEB-INF/efw/storage";
	public static String getStorageFolder() {
		return storageFolder;
	}
	/**
	 * メールテンプレートの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.mail.folderで設定、
	 * デフォルトは「/WEB-INF/efw/mail」。
	 */
	private static String mailFolder="/WEB-INF/efw/mail";
	public static String getMailFolder() {
		return mailFolder;
	}
	/**
	 * 国際化メッセージの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.i18n.folderで設定、
	 * デフォルトは「/WEB-INF/efw/i18n」。
	 */
	private static String i18nFolder="/WEB-INF/efw/i18n";
	public static String getI18nFolder() {
		return i18nFolder;
	}
	/**
	 * フォーマット関数用Rounder
	 */
	private static String formatRounder="HALF_EVEN";
	public static String getFormatRounder() {
		return formatRounder;
	}
	/**
	 * フレームワークに利用するjdbcリソースの名称。
	 * <br>efw.propertiesのefw.jdbc.resourceで設定、
	 * デフォルトは「jdbc/efw」。
	 */
	private static String jdbcResourceName="jdbc/efw";
	public static String getJdbcResourceName() {
		return jdbcResourceName;
	}
	/**
	 * フレームワークに利用するjavaメールセッションの名称。
	 * <br>efw.propertiesのefw.mail.resourceで設定、
	 * デフォルトは「mail/efw」。
	 */
    private static String mailResourceName="mail/efw";
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
	public static String getCors() {
		return cors;
	}
	/**
	 * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
	 */
	public static final String SYSTEM_CHAR_SET="UTF-8";
    /**
     * データタイプ
     */
	public static final String CONTENT_TYPE = "application/json;charset=UTF-8";
	/**
	 * システムエラー画面遷移のURL、空白は初期値。
	 */
	private static String systemErrorUrl="error.jsp";
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
	public static boolean getIsDebug() {
		return framework.isDebug;
	}
	
	/**
	 * requestオブジェクト。
	 * スレッドローカルにrequestオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 * HttpServletRequest
	 */
	private static final ThreadLocal<Object> request=new ThreadLocal<Object>();
	public static Object getRequest() {
		return framework.request.get();
	}
	public static void setRequest(Object request) {
		framework.request.set(request);
	}
	public static void removeRequest() {
		framework.request.remove();
	}
	
	/**
	 * responseオブジェクト。
	 * スレッドローカルにresponseオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 * HttpServletResponse
	 */
	private static final ThreadLocal<Object> response=new ThreadLocal<Object>();
	public static Object getResponse() {
		return framework.response.get();
	}
	public static void setResponse(Object response) {
		framework.response.set(response);
	}
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
	public static HashMap<String,Excel> getExcels() {
		return framework.excels.get();
	}
	public static void setExcels(HashMap<String,Excel> excels) {
		framework.excels.set(excels);
	}
	public static void removeExcels() {
		framework.excels.remove();
	}
	/**
	 * データベースオブジェクト。
	 * スレッドローカルにデータベースオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 */
	private static final ThreadLocal<HashMap<String,Database>> databases=new ThreadLocal<HashMap<String,Database>>();
	public static HashMap<String,Database> getDatabases() {
		return framework.databases.get();
	}
	public static void setDatabases(HashMap<String,Database> database) {
		framework.databases.set(database);
	}
	public static void removeDatabases() {
		framework.databases.remove();
	}
	
	/**
	 * Writterオブジェクト。
	 * スレッドローカルにWriterオブジェクトを格納する。サーバーサイトJavascriptの処理後、必ず閉じるため。
	 */
	private static final ThreadLocal<HashMap<String,PrintWriter>> writers=new ThreadLocal<HashMap<String,PrintWriter>>();
	public static HashMap<String,PrintWriter> getWriters() {
		return framework.writers.get();
	}
	public static void setWriters(HashMap<String,PrintWriter> writers) {
		framework.writers.set(writers);
	}
	public static void removeWriters() {
		framework.writers.remove();
	}
	
	/**
	 * thread毎のログを記録する
	 */
	private static final ThreadLocal<ArrayList<String>> threadLogs=new ThreadLocal<ArrayList<String>>();
	public static ArrayList<String> getThreadLogs() {
		return framework.threadLogs.get();
	}
	public static void setThreadLogs(ArrayList<String> threadLogs) {
		framework.threadLogs.set(threadLogs);
	}
	public static void removeThreadLogs() {
		framework.threadLogs.remove();
	}
	private static String keepInThreadLogs(String logType,Level lv,String log) {
		if (framework.getIsDebug()) {// 初期化時のログは記録しなくてもいい
			ArrayList<String> logs=framework.getThreadLogs();
			if (logs!=null) {//	記録しすぎると、メモリ問題が発生する恐れ
				if (logs.size()>100) {
					logs.remove(0);
				}
				String stringDate=FormatManager.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss.SSS ");
				String stringLv="";
				switch(lv.getName()) {
					case "SEVERE":	stringLv="[SEVERE ]";break;
					case "WARNING":	stringLv="[WARNING]";break;
					case "INFO":	stringLv="[INFO   ]";break;
					case "CONFIG":	stringLv="[CONFIG ]";break;
					case "FINE":	stringLv="[FINE   ]";break;
					case "FINER":	stringLv="[FINER  ]";break;
					case "FINEST":	stringLv="[FINEST ]";break;
				}
				logs.add(stringDate+logType+stringLv+":"+log);
			}
		}
		return log;
	}
	/**
	 * restオブジェクト。
	 * スレッドローカルにrestオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 */
	private static final ThreadLocal<Integer> restStatus=new ThreadLocal<Integer>();
	public static Integer getRestStatus() {
		return restStatus.get();
	}
	public static void setRestStatus(Integer responseCode) {
		restStatus.set(responseCode);
	}
	public static void removeRestStatus() {
		restStatus.remove();
	}
	/**
	 * 数字フォーマット用
	 */
	private static final ThreadLocal<HashMap<String,DecimalFormat>> numberFormats=new ThreadLocal<HashMap<String,DecimalFormat>>();
	public static HashMap<String,DecimalFormat> getNumberFormats() {
		return numberFormats.get();
	}
	public static void setNumberFormats(HashMap<String,DecimalFormat> map) {
		numberFormats.set(map);
	}
	public static void removeNumberFormats() {
		numberFormats.remove();
	}
	/**
	 * 日付フォーマット用
	 */
	private static final ThreadLocal<HashMap<String,DateFormat>> dateFormats=new ThreadLocal<HashMap<String,DateFormat>>();
	public static HashMap<String,DateFormat> getDateFormats() {
		return dateFormats.get();
	}
	public static void setDateFormats(HashMap<String,DateFormat> map) {
		dateFormats.set(map);
	}
	public static void removeDateFormats() {
		dateFormats.remove();
	}	
	
	//=========================================================================
	private static void init(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[init	]",lv,info));
	}
	private static void runtime(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[runtime ]",lv,info));
	}
	private static void access(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[access  ]",lv,info));
	}
	private static void database(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[database]",lv,info));
	}
	private static void brms(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[brms	]",lv,info));
	}
	//=========================================================================
	public static void initCLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			init(Level.INFO,info);
		}
	}
	public static void initWLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			init(Level.WARNING,info);
		}
	}
	public static void initWLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			init(Level.WARNING,info+" "+getUsefulInfoFromException(ex));
		}
	}
	public static void initSLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			init(Level.SEVERE,info+" "+getUsefulInfoFromException(ex));
		}
	}
	//=========================================================================
	public static void runtimeSLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,info);
		}
	}
	public static void runtimeSLog(Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,getUsefulInfoFromException(ex));
			ex.printStackTrace();
		}
	}
	public static void runtimeSLog(String info,Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.SEVERE.intValue()) {
			runtime(Level.SEVERE,info+" "+getUsefulInfoFromException(ex));
		}
	}
	public static void runtimeWLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			runtime(Level.WARNING,info);
		}
	}
	public static void runtimeWLog(Exception ex) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.WARNING.intValue()) {
			runtime(Level.SEVERE,getUsefulInfoFromException(ex));
		}
	}
	//=========================================================================
	//アクセス情報を出力するため
	public static void accessLog(String userId,String requestJSON) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			access(Level.INFO,"userId = "+userId+"; request = "+requestJSON);
		}
	}
	//=========================================================================
	//DB SQLと引数を出力するため
	public static void databaseLog(String groupId,String sqlId,String sql,ArrayList<Object> prms) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.INFO,"groupId = "+groupId +"; sqlId = "+sqlId+"; params = "+prms+"; sql = "+sql);
		}
	}
	public static void databaseLog(String sql) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.INFO,"sql = "+sql);
		}
	}
	//=========================================================================
	public static void brmsLog(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.INFO.intValue()) {
			brms(Level.INFO,"input xml = "+createRuleParamXml(codeType,ruleIndentifier,ruleDate,params));
		}
	}
	//=========================================================================
	//Exceptionの場合、
	public static String getUsefulInfoFromException(Exception e) {
		if (e.getCause()!=null) {
			return e.getCause().toString();
		}else {
			return e.getClass().getName()+":"+e.getMessage();
		}
	}
	//Exceptionではない場合
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
