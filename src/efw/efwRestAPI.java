package efw;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import efw.script.ScriptManager;

@WebServlet(name="efwRestAPI",loadOnStartup=1,urlPatterns={"/efwRestAPI/*"})
public final class efwRestAPI extends HttpServlet{

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doRestAPI(req,resp,"PUT");
	}
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doRestAPI(req,resp,"GET");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doRestAPI(req,resp,"POST");
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doRestAPI(req,resp,"DELETE");
	}

	/**
	 * OPTIONメソッド
	 */
	protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//CORS関連設定を行う
		efwServlet.doCORS(request,response);
		super.doOptions(request, response);
	}
	
	private void doRestAPI(HttpServletRequest request, HttpServletResponse response, String httpMethod) throws ServletException, IOException{
        response.setCharacterEncoding(framework.getSystemCharSet());
        response.setContentType("application/json");
        request.setCharacterEncoding(framework.getSystemCharSet());
		//--------------------------------------------------------------------
        //if init is failed, return the info instead of throw exception
		if (!framework.getInitSuccessFlag()){
			response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
			framework.runtimeSLog("initSuccessFlag = false");
			return;
		}
		//call script 
		framework.setRequest(request);
		framework.setResponse(response);
		framework.setThreadLogs(new ArrayList<String>());
		try {
			String[] keys=request.getPathInfo().split("/");
			String eventId=keys[1];////　一つ目は/です。
			StringBuilder sb=new StringBuilder();
			sb.append("[");
			for(int i=2;i<keys.length;i++) {
				if (i>2) {//　一つ目は/です。
					sb.append(",");
				}
				sb.append("\"");
				sb.append(keys[i]);
				sb.append("\"");
			}
			sb.append("]");
			String reqKeys=sb.toString();
			BufferedReader br = new BufferedReader(request.getReader());
			StringBuilder reqParams=new StringBuilder();
			String str = br.readLine();
			while(str != null){
				reqParams.append(str);
				str = br.readLine();
			}
			br.close();
			String ret=ScriptManager.doRestAPI(eventId,reqKeys,httpMethod,reqParams.toString());
			if (ret!=null) {response.getWriter().print(ret);}
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
			//response.getWriter().print(otherError);//efw内部エラー。
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
