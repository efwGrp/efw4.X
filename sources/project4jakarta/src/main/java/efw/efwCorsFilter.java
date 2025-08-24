/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import java.io.IOException;

import efw.properties.EfwAuthBean;
import efw.taglib.Client;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
/**
 * efwCorsFilterはリクエストを加工しCors機能を実現する。
 * @author Chang Kejun
 */
@WebFilter(filterName="efwCorsFilter", urlPatterns={
		"*.jsp",
		"/efwServlet",
		"/efwRestAPI/*",
		"/uploadServlet",
		"/downloadServlet"
})
public final class efwCorsFilter implements Filter {
	/**
	 * ダミーコンストラクタ
	 */
	public efwCorsFilter(){super();}
	/**
	 * フィルタを実行する。
	 * @param request リクエスト。
	 * @param response リスポンス。
	 * @param chain チェーン。
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse res=(HttpServletResponse) response;
		//動的ページはキャッシュを保存しないように。
		((HttpServletResponse)response).setHeader("Cache-Control", "no-store");
		if ("OPTIONS".equals(req.getMethod())){
			efwCorsFilter.doCORSPreflight(req, res);
			return;
		}else {
			//set headers for cors.
			efwCorsFilter.doCORS(req, res);
			//keep req and resp to thread local for javascript program.
			framework.setRequest(request);
			framework.setResponse(response);
			request.setCharacterEncoding(framework.SYSTEM_CHAR_SET);//すべての外部むけURLは全部ここでエンコードを設定する
			
			//elfinder部品の言語のため
			String lang=request.getParameter(Client.EFW_I18N_LANG);
			if (lang!=null)request.setAttribute(Client.EFW_I18N_LANG, lang);
			
			response.setCharacterEncoding(framework.SYSTEM_CHAR_SET);
			response.setContentType("application/json");//efwServlet efwRestAPIのためです。jspなどの場合変更される
			//もしAuthBeanを取れない場合つまり定義間違い。
			if (getCurrentAuthBean()!=null) {
				//do the program
				chain.doFilter(request, response);
			}
			//remove req and resp from thread local
			framework.removeRequest();
			framework.removeResponse();
		}
	}
	//CORS対応
	private static void doCORSPreflight(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
			//allow header which requested.
			response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
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
			response.setHeader("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
			response.setHeader("Access-Control-Allow-Credentials", "true");
		}
	}
	private static void doCORS(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
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
			response.setHeader("Access-Control-Allow-Credentials", "true");
		}
	}
	///////////////////////////////////////////////////////////////////////////
	
	private static EfwAuthBean currentAuthBean=null;
	/**
	 * 現行権限ビーンを取得する。
	 * @return 現行権限ビーン。
	 */
	public static EfwAuthBean getCurrentAuthBean() {
		return currentAuthBean;
	}
	
	/**
	 * フィルタ初期化の代わりに、efwServletから初期化するための関数。
	 */
	protected static void init() {
		//メインアプリとするバイア、メインプロパティファイルからのセキュリティ情報を読み込む
		currentAuthBean=new EfwAuthBean();
	}
	
	/**
	 * 初期化する。
	 * @param config コンフィグ。
	 */
	@Override
	public void init(FilterConfig config) throws ServletException {}
	/**
	 * 破棄する。
	 */
	@Override
	public void destroy() {}
}
