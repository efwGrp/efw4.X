/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.nio.charset.StandardCharsets;

import efw.script.ScriptManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * efwRestAPIはRestサービスのイベントを実行する。
 * @author kejun.chang
 *
 */
@WebServlet(name="efwRestAPI",urlPatterns={"/efwRestAPI/*"})
public final class efwRestAPI extends HttpServlet{
	/**
	 * ダミーコンストラクタ
	 */
	public efwRestAPI(){super();}

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
	
	private void doRestAPI(HttpServletRequest request, HttpServletResponse response, String httpMethod){
        //if init is failed, return the info instead of throw exception
		if (!framework.getInitSuccessFlag()){
			response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
			framework.runtimeSLog("initSuccessFlag = false");
			return;
		}
		//call script 
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
				sb.append(
					new String(keys[i].getBytes(StandardCharsets.ISO_8859_1),framework.SYSTEM_CHAR_SET)
					.replaceAll("\\\"", "\\\\\"").replaceAll("\\n", "\\\\n")
						);
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
			try {
				response.setStatus(500);
				response.getWriter().print(ex.getMessage());//errorの詳細情報を渡す
			} catch (IOException e) {
				e.printStackTrace();
			}//efw内部エラー。
		}finally{
			framework.removeI18nProp();
			framework.removeThreadLogs();
			framework.removeRestStatus();
			framework.removeNumberFormats();
			framework.removeDateFormats();
		}
	}
}
