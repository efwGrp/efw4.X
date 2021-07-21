/**** efw4.X Copyright 2019 efwGrp ****/
package efw;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import efw.script.ScriptManager;

/**
 * サーブレットアノテーション設定で、起動と同時にフレームワークの初期化を行う。
 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送する。
 * @author Chang Kejun
 */
@WebServlet(name="efwServlet",loadOnStartup=1,urlPatterns={"/efwServlet"})
public final class efwServlet extends HttpServlet {

	/**
	 * サーブレットの起動と同時に、
	 * LogManager、SqlManager、ScriptManagerの初期化を行う。
	 * <br>初期化成功の場合、initSuccessFlagをtrueに設定する。失敗の場合、false。
	 * @throws ServletException 
	 */
	public void init() throws ServletException {
		//call the orgin init function
		super.init();
		try {
			framework.initServlet(this.getServletContext().getRealPath("/"));
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
	//CORS対応
	public static void doCORS(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
			response.setHeader("Access-Control-Allow-Headers", "Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent");
			response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
			//cors support
			if("*".equals(framework.getCors())){
				response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
			}else if("null".equals(framework.getCors())||"".equals(framework.getCors())||null==framework.getCors()){
				//do nothing
			}else{
				String[] corsAry=framework.getCors().split(",");
				for(int i=0;i<corsAry.length;i++){
					if (corsAry[i].equals(request.getHeader("Origin"))){
						response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
						break;
					}
				}
			}
		}
	}
	
	/**
	 * OPTIONメソッド
	 */
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//CORS関連設定を行う
		efwServlet.doCORS(request,response);
		super.doOptions(request, response);
	}

	/**
	 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送し、その実行結果をレスポンスする。
	 * <br>efwサーブレット が初期化失敗またはサーバーサイトJavaScript実行エラーの場合、OtherErrorMessageのエラー情報をレスポンスする。
	 * @param request JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @param response efwサーブレットがJQueryに返すJSON内容を含む HttpServletResponse オブジェクト 。
	 * @throws IOException 
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setCharacterEncoding(framework.getSystemCharSet());
		response.setContentType("application/json");
		request.setCharacterEncoding(framework.getSystemCharSet());
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
		//call script 
		framework.setRequest(request);
		framework.setResponse(response);
		framework.setThreadLogs(new ArrayList<String>());
		try {
			BufferedReader br = new BufferedReader(request.getReader());
			StringBuilder reqJson=new StringBuilder();
			String str = br.readLine();
			while(str != null){
				reqJson.append(str);
				str = br.readLine();
			}
			br.close();
			response.getWriter().print(ScriptManager.doPost(reqJson.toString()));
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			response.getWriter().print(otherError);//efw内部エラー。
		}finally{
			//CORS関連設定を行う
			efwServlet.doCORS(request,response);
			
			framework.removeRequest();
			framework.removeResponse();
			framework.removeI18nProp();
			framework.removeThreadLogs();
			framework.removeRestStatus();
			framework.removeNumberFormats();
			framework.removeDateFormats();
		}
	}
}
