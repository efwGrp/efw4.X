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
	
	private static boolean brmsImport=false;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void init() throws Exception{
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
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,framework.getEventFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.setEventFolder((new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/"));
		if (!new File(framework.getEventFolder()).exists()){
			framework.initWLog("The folder does not exist. eventFolder = "+framework.getEventFolder());
		}else {
			framework.initCLog("eventFolder = " + framework.getEventFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,framework.getSqlFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.setSqlFolder((new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/"));
		if (!new File(framework.getSqlFolder()).exists()){
			framework.initWLog("The folder does not exist. sqlFolder = "+framework.getSqlFolder());
		}else{
			framework.initCLog("sqlFolder = " + framework.getSqlFolder());
		}
		SqlManager.init(framework.getSqlFolder());//これはエラーにならない
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,framework.getMailFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.setMailFolder((new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/"));
		if (!new File(framework.getMailFolder()).exists()){
			framework.initWLog("The folder does not exist. mailFolder = "+framework.getMailFolder());
		}else{
			framework.initCLog("mailFolder = " + framework.getMailFolder());
		}
		//-----------------------------------------------------------------
		propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,framework.getStorageFolder());
		if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
		framework.setStorageFolder((new File(propertyPath)).getAbsolutePath().replaceAll("\\\\", "/"));
		if(!new File(framework.getStorageFolder()).exists()){
			framework.initWLog("The folder does not exist. storageFolder = "+framework.getStorageFolder());
		}else {
			framework.initCLog("storageFolder = " + framework.getStorageFolder());
		}
		FileManager.init(framework.getStorageFolder());//これはエラーにならない
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
		//-----------------------------------------------------------------
		try {
			RemoteEventManager.init();//SSL関連を初期化して、removeEvent便利にするだけ。プロパティも不要。
			framework.initCLog("RemoteEventManager inited.");
		}catch(Exception ex) {
			framework.initWLog("RemoteEventManager failed.",ex);
		}
		//-----------------------------------------------------------------
		try{
			ScriptManager.init(framework.getEventFolder());//環境合わない場合、efw.jar問題がある場合、エラー。//ここからエラーになると、処理を中断する。
			framework.initCLog("ScriptManager inited.");
		}catch(Exception ex){
			framework.initSLog("ScriptManager failed.",ex);
			return;
		}
		//-----------------------------------------------------------------
		framework.initCLog("Efw Version = "+framework.getVersion());
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String args[]) throws Exception{
		//初期化関数を呼び出す
		//-----------------------------------------------------------------
		init();

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


