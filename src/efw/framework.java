/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;

import efw.db.Database;
import efw.excel.Excel;
import efw.format.FormatManager;
import efw.i18n.I18nProperties;
import efw.log.LogManager;

public class framework {
	private static final int CODETYPE_ID = 0;
	private static final int CODETYPE_NAME = 1;
	private static final int CODETYPE_ALIAS = 2;
	
	/**
	 * バージョンを表す。
	 */
	private static String version="4.02.002";// change it when releasing jar.
	public static String getVersion() {
		return version;
	}
	
	/**
	 * 初期化成功か否かを表すフラグ。
	 */
	private static boolean initSuccessFlag=false;
	public static boolean getInitSuccessFlag() {
		return initSuccessFlag;
	}
	public static void setInitSuccessFlag(boolean initSuccessFlag) {
		framework.initSuccessFlag = initSuccessFlag;
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
	public static void setEventFolder(String eventFolder) {
		framework.eventFolder = eventFolder;
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
	public static void setSqlFolder(String sqlFolder) {
		framework.sqlFolder = sqlFolder;
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
	public static void setStorageFolder(String storageFolder) {
		framework.storageFolder = storageFolder;
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
	public static void setMailFolder(String mailFolder) {
		framework.mailFolder = mailFolder;
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
	public static void setI18nFolder(String i18nFolder) {
		framework.i18nFolder = i18nFolder;
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
	public static void setCors(String cors) {
		framework.cors = cors;
	}
    /**
     * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
     */
    private static final String SYSTEM_CHAR_SET="UTF-8";
	public static String getSystemCharSet() {
		return SYSTEM_CHAR_SET;
	}
    /**
     * システムエラー画面遷移のURL、空白は初期値。
     */
    private static String systemErrorUrl="error.jsp";
	public static String getSystemErrorUrl() {
		return systemErrorUrl;
	}
	public static void setSystemErrorUrl(String systemErrorUrl) {
		framework.systemErrorUrl = systemErrorUrl;
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
    protected static void setIsDebug(boolean isDebug) {
    	framework.isDebug=isDebug;
    }
	
    /**
     * requestオブジェクト。
     * スレッドローカルにrequestオブジェクトを格納する。サーバーサイトJavascriptに利用される。
     * HttpServletRequest
     */
    private static ThreadLocal<Object> request=new ThreadLocal<Object>();
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
    private static ThreadLocal<Object> response=new ThreadLocal<Object>();
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
    private static ThreadLocal<I18nProperties> i18nProp=new ThreadLocal<I18nProperties>();
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
	private static ThreadLocal<ArrayList<Excel>> excels=new ThreadLocal<ArrayList<Excel>>();
	public static ArrayList<Excel> getExcels() {
		return framework.excels.get();
	}
	public static void setExcels(ArrayList<Excel> excels) {
		framework.excels.set(excels);
	}
	public static void removeExcels() {
		framework.excels.remove();
	}
    /**
     * データベースオブジェクト。
     * スレッドローカルにデータベースオブジェクトを格納する。サーバーサイトJavascriptに利用される。
     */
	private static ThreadLocal<HashMap<String,Database>> databases=new ThreadLocal<HashMap<String,Database>>();
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
	private static ThreadLocal<HashMap<String,PrintWriter>> writters=new ThreadLocal<HashMap<String,PrintWriter>>();
	public static HashMap<String,PrintWriter> getWritters() {
		return framework.writters.get();
	}
	public static void setWritters(HashMap<String,PrintWriter> writters) {
		framework.writters.set(writters);
	}
	public static void removeWritters() {
		framework.writters.remove();
	}
	/**
	 * 
	 */
	private static ThreadLocal<ArrayList<String>> threadLogs=new ThreadLocal<ArrayList<String>>();
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
	//=========================================================================
	private static void init(Level lv,String info) {// 表示内容を分かりやすいための関数
		LogManager.getLogger().log(lv,keepInThreadLogs("[init    ]",lv,info));
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
		LogManager.getLogger().log(lv,keepInThreadLogs("[brms    ]",lv,info));
	}
	//=========================================================================
	public static void initCLog(String info) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.CONFIG.intValue()) {
			init(Level.CONFIG,info);
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
		if (LogManager.getLogger().getLevel().intValue()<=Level.FINE.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.FINE,"groupId = "+groupId +"; sqlId = "+sqlId+"; params = "+prms+"; sql = "+sql);
		}
	}
	public static void databaseLog(String sql) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.FINE.intValue()) {
			sql=sql.replaceAll("\\s+", " ").trim();
			database(Level.FINE,"sql = "+sql);
		}
	}
	//=========================================================================
	public static void brmsLog(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) {
		if (LogManager.getLogger().getLevel().intValue()<=Level.FINE.intValue()) {
			brms(Level.FINE,"input xml = "+createRuleParamXml(codeType,ruleIndentifier,ruleDate,params));
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
	 * @param codeType        コードタイプ
	 * @param ruleIndentifier ルールの識別子
	 * @param ruleDate		     ルール呼び出し基準日(yyyy-MM-dd)
	 * @param params          ルール呼び出しパラメーター
	 * @throws Exception 実行エラー
	 */
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

	/**
	 * restオブジェクト。
	 * スレッドローカルにrestオブジェクトを格納する。サーバーサイトJavascriptに利用される。
	 */
	private static ThreadLocal<Integer> restStatus=new ThreadLocal<Integer>();
	public static Integer getRestStatus() {
		return restStatus.get();
	}
	public static void setRestStatus(Integer responseCode) {
		restStatus.set(responseCode);
	}
	public static void removeRestStatus() {
		restStatus.remove();
	}
}
