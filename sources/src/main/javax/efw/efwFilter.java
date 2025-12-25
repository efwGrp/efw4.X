/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import efw.properties.EfwAuthBean;
import efw.properties.PropertiesManager;
import efw.taglib.Client;
/**
 * efwFilterはJSPのログイン有無と接続権限をチェックする。
 * @author Chang Kejun
 *
 */
@WebFilter(filterName="efwFilter", urlPatterns={
	"*.jsp",
	"/efwServlet",
	"/efwRestAPI/*",
	"/uploadServlet",
	"/downloadServlet",
	"/previewServlet"
})
public final class efwFilter implements Filter {
	/**
	 * ダミーコンストラクタ
	 */
	public efwFilter(){super();}
	
	/**
	 * フィルタを実行する。
	 * @param request リクエスト。
	 * @param response リスポンス。
	 * @param chain チェーン。
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		//keep req and resp to thread local for javascript program.
		framework.setRequest(request);
		framework.setResponse(response);
		//requestを操作する前に文字コードを設定する
		request.setCharacterEncoding(framework.SYSTEM_CHAR_SET);
		//elfinder部品の言語のため
		String lang=request.getParameter(Client.EFW_I18N_LANG);
		if (lang!=null)request.setAttribute(Client.EFW_I18N_LANG, lang);
		
		response.setCharacterEncoding(framework.SYSTEM_CHAR_SET);
		String strRequestURI = ((HttpServletRequest) request).getRequestURI();
		
		//JSPではない場合、そのまま
		if (strRequestURI.indexOf("efwServlet")>-1
				||strRequestURI.indexOf("efwRestAPI")>-1){
			response.setContentType("application/json");//efwServlet efwRestAPIのためです。jspなどの場合変更される
			chain.doFilter(request, response);
		}else if (strRequestURI.indexOf("uploadServlet")>-1
				||strRequestURI.indexOf("downloadServlet")>-1
				||strRequestURI.indexOf("previewServlet")>-1){
			chain.doFilter(request, response);
		}else if(	currentAuthBean.welcomePattern.matcher(strRequestURI).find()					//welcomeページ
				||currentAuthBean.loginUrlPattern.matcher(strRequestURI).find()					//ログインページ
				||currentAuthBean.systemErrorUrlPattern.matcher(strRequestURI).find()			//エラーページ
				||currentAuthBean.clientMessagesUrlPattern.matcher(strRequestURI).find()		
				||currentAuthBean.elFinderMessagesUrlPattern.matcher(strRequestURI).find()){
			chain.doFilter(request, response);
		}else if (strRequestURI.indexOf(".jsp")>-1){
			EfwAuthBean currentAuthBean=efwFilter.getCurrentAuthBean();
			if(currentAuthBean.loginCheck){//ログインチェック設定の場合
				if(!currentAuthBean.outOfloginUrlPattern.matcher(strRequestURI).find()){//接続画面がログイン必要の場合
					Object loginCheckValue=((HttpServletRequest) request).getSession().getAttribute(currentAuthBean.loginKey);
					if(loginCheckValue==null || loginCheckValue.equals("")){//ログインしていない場合
						((HttpServletResponse)response).sendRedirect(currentAuthBean.loginUrl);
				        
					}else if(currentAuthBean.authCheck){//ログインした、権限チェック必要の場合
						boolean hasAuth=false;
						for (String key : currentAuthBean.authCasePatternsMap.keySet()) {
							String authCheckValue=(String)((HttpServletRequest) request).getSession().getAttribute(currentAuthBean.authKey);
							Pattern authPattern=currentAuthBean.authCasePatternsMap.get(key).get(PropertiesManager.EFW_AUTH_AUTHPATTERN);
							Pattern urlPattern=currentAuthBean.authCasePatternsMap.get(key).get(PropertiesManager.EFW_AUTH_URLPATTERN);
							if(authPattern.matcher(authCheckValue).find()&&urlPattern.matcher(strRequestURI).find()){
								hasAuth=true;
								break;
							}
						}
						if(!hasAuth){//権限を持っていない場合
							((HttpServletResponse)response).sendRedirect(currentAuthBean.systemErrorUrl);
						}else{//権限をもっている場合
							chain.doFilter(request, response);
						}
					}else{//ログインした、権限チェック未設定の場合
						chain.doFilter(request, response);
					}
				}else{//接続画面がログイン必要ない場合
					chain.doFilter(request, response);
				}
			}else{//ログインチェック未設定の場合
				chain.doFilter(request, response);
			}
		}
		//remove req and resp from thread local
		framework.removeRequest();
		framework.removeResponse();
		
		framework.removeI18nProp();//jsp画面のタグに多国語対応のメッセージがあり、そのThreadのi18propを削除
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
