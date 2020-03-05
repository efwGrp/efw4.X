/**** efw4.X Copyright 2019 efwGrp ****/
package efw;

import java.io.File;
import java.lang.reflect.Method;
import efw.event.RemoteEventManager;
import efw.file.FileManager;
import efw.format.FormatManager;
import efw.log.LogManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;
import efw.sql.SqlManager;

public final class efwBatch {
	/**
	 * webアプリのフォルダ。
	 * ほかのフォルダの相対基準パス。
	 */
	private static final String WEBHOME="WEBHOME";
	
	private static final String PROPERTIES="PROPERTIES";
	/**
	 * イベントJavaScriptファイルの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.event.folderで設定する。
     * デフォルトは「/WEB-INF/efw/event」。
	 */
    private static String eventFolder="/WEB-INF/efw/event";
    /**
     * Sql外部化XMLファイルの格納パス、
     * Webアプリケーションコンテキストからの相対パスで表す。
     * <br>efw.propertiesのefw.sql.folderで設定、
     * デフォルトは「/WEB-INF/efw/sql」。
     */
    private static String sqlFolder="/WEB-INF/efw/sql";
    /**
     * ファイルの格納パス、
     * 絶対パスで表す。
     * <br>efw.propertiesのefw.storage.folderで設定、
     * デフォルトは「/storage」。
     */
	private static String storageFolder="/WEB-INF/efw/storage";
	/**
     * メールテンプレートの格納パス、
     * Webアプリケーションコンテキストからの相対パスで表す。
     * <br>efw.propertiesのefw.mail.folderで設定、
     * デフォルトは「/WEB-INF/efw/mail」。
     */
	private static String mailFolder="/WEB-INF/efw/mail";

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String args[]) throws Exception{
    	// begin to init efwServletのinitと同等
    	//-----------------------------------------------------------------
		String properties =System.getenv(PROPERTIES);
    	try {
    		PropertiesManager.initBatch(properties);//ここからエラーになると、処理を中断する。
    	}catch(Exception ex) {
    		throw ex;
    	}
        LogManager.init();
        framework.initCLog("properties = "+properties);
        framework.initCLog("PropertiesManager.inited.");
    	//-----------------------------------------------------------------
        String webHome=System.getenv(WEBHOME);
        framework.initCLog("webHome = "+webHome);
        //-----------------------------------------------------------------
		FormatManager.init();//プロパティの後で必要。エラーなし。
        //-----------------------------------------------------------------
        String propertyPath="";
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,eventFolder);
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
    	eventFolder=(new File(propertyPath)).getAbsolutePath();
    	if (!new File(eventFolder).exists()){
    		framework.initWLog("The folder does not exist. eventFolder = "+eventFolder);
    	}else {
    		framework.initCLog("eventFolder = " + eventFolder);
    	}
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,sqlFolder);
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
    	sqlFolder=(new File(propertyPath)).getAbsolutePath();
    	if (!new File(sqlFolder).exists()){
    		framework.initWLog("The folder does not exist. sqlFolder = "+sqlFolder);
    	}else{
        	framework.initCLog("sqlFolder = " + sqlFolder);
    	}
    	SqlManager.init(sqlFolder);//これはエラーにならない
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,mailFolder);
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
    	mailFolder=(new File(propertyPath)).getAbsolutePath();
    	if (!new File(mailFolder).exists()){
    		framework.initWLog("The folder does not exist. mailFolder = "+mailFolder);
    	}else{
        	framework.initCLog("mailFolder = " + mailFolder);
    	}
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,storageFolder);
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
    	storageFolder=(new File(propertyPath)).getAbsolutePath();
    	if(!new File(storageFolder).exists()){
			framework.initWLog("The folder does not exist. storageFolder = "+storageFolder);
    	}else {
        	framework.initCLog("storageFolder = " + storageFolder);
    	}
		FileManager.init(storageFolder);//これはエラーにならない
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
			method.invoke(null,mailFolder);
    		framework.initCLog("MailManager inited.");
		}catch(Exception ex){
			framework.initWLog("MailManager failed.",ex);
		}
    	//-----------------------------------------------------------------
		boolean brmsImport=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_BRMS_IMPORT, false);
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
    	//-----------------------------------------------------------------
    	try {
    		RemoteEventManager.init();//SSL関連を初期化して、removeEvent便利にするだけ。プロパティも不要。
    		framework.initCLog("RemoteEventManager inited.");
    	}catch(Exception ex) {
    		framework.initWLog("RemoteEventManager failed.",ex);
    	}
    	//-----------------------------------------------------------------
		try{
			ScriptManager.init(eventFolder);//環境合わない場合、efw.jar問題がある場合、エラー。//ここからエラーになると、処理を中断する。
			framework.initCLog("ScriptManager inited.");
		}catch(Exception ex){
    		framework.initSLog("ScriptManager failed.",ex);
			return;
		}
    	//-----------------------------------------------------------------
        framework.initCLog("Efw Version = "+framework.getVersion());
    	//-----------------------------------------------------------------
        //eventを実行する, efwServletのdoPostと同等
    	//-----------------------------------------------------------------
	    try{
	        ScriptManager.doBatch(args[0]);
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
		}finally{
			if (brmsImport){
	    		Class brms = Class.forName("efw.brms.BrmsManager");
				Method destroyFromBatch = brms.getDeclaredMethod("destroyFromBatch", (Class[])null);
				destroyFromBatch.invoke(null,(Object[])null);
			}
		}
	}
}


