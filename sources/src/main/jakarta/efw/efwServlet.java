/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import java.io.BufferedReader;
import java.io.IOException;

import efw.script.ScriptManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * efwServletはサーバサイトイベントを実行する。
 * サーブレットアノテーション設定で、起動と同時にフレームワークの初期化を行う。
 * @author Chang Kejun
 */
@WebServlet(name="efwServlet",loadOnStartup=1,urlPatterns={"/efwServlet"})
public final class efwServlet extends HttpServlet {
	/**
	 * ダミーコンストラクタ
	 */
	public efwServlet(){super();}

	/**
	 * サーバが閉じる時、globalのdestory関数を呼び出す。
	 * 必要に応じてリソース開放処理に備える。
	 */
	public void destroy() {
		// call the orgin destroy function
		super.destroy();
		try {
			framework.destroyServlet();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * サーブレットの起動と同時に、フレーワーク初期化を実行する。
	 * @throws ServletException サーブレットエラー。
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

	/**
	 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送し、その実行結果をレスポンスする。
	 * <br>efwサーブレット が初期化失敗またはサーバーサイトJavaScript実行エラーの場合、OtherErrorMessageのエラー情報をレスポンスする。
	 * @param request JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @param response efwサーブレットがJQueryに返すJSON内容を含む HttpServletResponse オブジェクト 。
	 * @throws IOException 通信エラー。
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
				(framework.getSystemErrorUrl().equals("")?"":",\"navigate\":{\"url\":\""+framework.getSystemErrorUrl()+"\"}")
				+"}";
		//if init is failed, return the info instead of throw exception
		if (!framework.getInitSuccessFlag()){
			framework.runtimeSLog("initSuccessFlag = false");
			response.getWriter().print(otherError);
			return;
		}
		//call script 
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
			framework.removeLang();
			framework.removeI18nProp();
			framework.removeThreadLogs();
			framework.removeRestStatus();
			framework.removeNumberFormats();
			framework.removeDateFormats();
		}
	}
}
