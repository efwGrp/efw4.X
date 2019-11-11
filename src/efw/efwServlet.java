/**** efw4.X Copyright 2019 efwGrp ****/
package efw;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import efw.event.RemoteEventManager;
import efw.file.FileManager;
import efw.format.FormatManager;
import efw.i18n.I18nManager;
import efw.log.LogManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;
import efw.sql.SqlManager;

/**
 * サーブレットアノテーション設定で、起動と同時にフレームワークの初期化を行う。
 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送する。
 * @author Chang Kejun
 */
@SuppressWarnings("serial")
@WebServlet(name="efwServlet",loadOnStartup=1,urlPatterns={"/efwServlet"})
public final class efwServlet extends HttpServlet {

    /**
     * サーブレットの起動と同時に、
     * LogManager、SqlManager、ScriptManagerの初期化を行う。
     * <br>初期化成功の場合、initSuccessFlagをtrueに設定する。失敗の場合、false。
     * @throws ServletException 
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
	public void init() throws ServletException {
    	if (framework.getInitSuccessFlag()) return;
    	//call the orgin init function
    	super.init();
    	//-----------------------------------------------------------------
    	// begin to init efw　まずefw.propertiesを読んで、次は簡単な情報をスタート
    	//-----------------------------------------------------------------
    	try {
        	PropertiesManager.init();//ここからエラーになると、処理を中断する。
    	}catch(Exception ex) {
    		throw new ServletException(ex);
    	}
        LogManager.init();//エラーなし。
        framework.initCLog("PropertiesManager inited.");//ログ出力はLogManagerの初期化後で必要。
    	//-----------------------------------------------------------------
    	//systemErrorUrl　ここはログを出力しない。filter初期化時出力したから。
    	framework.setSystemErrorUrl(PropertiesManager.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL,framework.getSystemErrorUrl()));
    	//-----------------------------------------------------------------
		FormatManager.init();//プロパティの後で必要。エラーなし。
    	//-----------------------------------------------------------------
        //get attrs from properties or context
        framework.setIsDebug(PropertiesManager.getBooleanProperty(PropertiesManager.EFW_ISDEBUG,false));
    	framework.initCLog("isDebug = " + framework.getIsDebug());
        framework.setCors(PropertiesManager.getProperty(PropertiesManager.EFW_CORS,framework.getCors()));
    	framework.initCLog("cors = " + framework.getCors());
    	//-----------------------------------------------------------------
    	String propertyPath;
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,framework.getEventFolder());
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
    	framework.setEventFolder(propertyPath.replaceAll("\\\\", "/"));
    	if (!new File(framework.getEventFolder()).exists()){
    		framework.initWLog("The folder does not exist. eventFolder = "+framework.getEventFolder());
    	}else{
        	framework.initCLog("eventFolder = " + framework.getEventFolder());
    	}
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,framework.getSqlFolder());
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
    	framework.setSqlFolder(propertyPath.replaceAll("\\\\", "/"));
    	if (!new File(framework.getSqlFolder()).exists()){
    		framework.initWLog("The folder does not exist. sqlFolder = "+framework.getSqlFolder());
    	}else{
        	framework.initCLog("sqlFolder = " + framework.getSqlFolder());
    	}
		SqlManager.init(framework.getSqlFolder());//これはエラーにならない
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,framework.getMailFolder());
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
    	framework.setMailFolder(propertyPath.replaceAll("\\\\", "/"));
    	if (!new File(framework.getMailFolder()).exists()){
    		framework.initWLog("The folder does not exist. mailFolder = "+framework.getMailFolder());
    	}else{
        	framework.initCLog("mailFolder = " + framework.getMailFolder());
    	}
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_I18N_FOLDER,framework.getI18nFolder());
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
    	framework.setI18nFolder(propertyPath.replaceAll("\\\\", "/"));
    	if (!new File(framework.getI18nFolder()).exists()){
    		framework.initWLog("The folder does not exist. i18nFolder = "+framework.getI18nFolder());
    	}else{
        	framework.initCLog("i18nFolder = " + framework.getI18nFolder());
    	}
    	I18nManager.init(framework.getI18nFolder());//これはエラーにならない
    	//-----------------------------------------------------------------
    	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,framework.getStorageFolder());
    	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
    	framework.setStorageFolder(propertyPath.replaceAll("\\\\", "/"));
    	if(!new File(framework.getStorageFolder()).exists()){
			framework.initWLog("The folder does not exist. storageFolder = "+framework.getStorageFolder());
    	}else {
        	framework.initCLog("storageFolder = " + framework.getStorageFolder());
    	}
		FileManager.init(framework.getStorageFolder());//これはエラーにならない
    	//-----------------------------------------------------------------
		try{
    		Class db = Class.forName("efw.db.DatabaseManager");
			Method method = db.getDeclaredMethod("init");
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
			Method method = mailManager.getDeclaredMethod("init",String.class,boolean.class);
			method.invoke(null,framework.getMailFolder());
    		framework.initCLog("MailManager inited.");
		}catch(Exception ex){
			framework.initWLog("MailManager failed.",ex);
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
    		framework.setInitSuccessFlag(true);
		}catch(Exception ex){
    		framework.initSLog("ScriptManager failed.",ex);
    		framework.setInitSuccessFlag(false);
		}
    	//-----------------------------------------------------------------
        //efwFilter init to check login or not
        efwFilter.init();//プロパティの後で必要。エラーなし。
    }

	/**
	 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送し、その実行結果をレスポンスする。
	 * <br>efwサーブレット が初期化失敗またはサーバーサイトJavaScript実行エラーの場合、OtherErrorMessageのエラー情報をレスポンスする。
	 * @param request JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @param response efwサーブレットがJQueryに返すJSON内容を含む HttpServletResponse オブジェクト 。
	 * @throws IOException 
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setCharacterEncoding(framework.getResponseCharSet());
        response.setContentType("application/json");
        String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
        		(framework.getSystemErrorUrl().equals("")?"":",\"navigate\":{\"url\":\""+framework.getSystemErrorUrl()+"\"}")
        		+"}";
		//--------------------------------------------------------------------
        //if init is failed, return the info instead of throw exception
		if (!framework.getInitSuccessFlag()){
			framework.runtimeSLog("initSuccessFlag = false");
			response.getWriter().print(otherError);
			return;
		}
		//cors support
		if("*".equals(framework.getCors())){
			response.setHeader("Access-Control-Allow-Origin", "*");
		}else if("null".equals(framework.getCors())||"".equals(framework.getCors())||null==framework.getCors()){
			//do nothing
		}else{
			String[] corsAry=framework.getCors().split(",");
			for(int i=0;i<corsAry.length;i++){
				response.setHeader("Access-Control-Allow-Origin", corsAry[i]);
			}
		}
		//call script 
		framework.setRequest(request);
		framework.setResponse(response);
		framework.setThreadLogs(new ArrayList<String>());
		try {
			BufferedReader br = new BufferedReader(request.getReader());
			String reqJson = br.readLine();
			br.close();
	        response.getWriter().print(ScriptManager.doPost(reqJson));
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			response.getWriter().print(otherError);//efw内部エラー。
		}finally{
			framework.removeRequest();
			framework.removeResponse();
			framework.removeI18nProp();
			framework.removeThreadLogs();
		}
	}
}
