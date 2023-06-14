/**** efw4.X Copyright 2019 efwGrp ****/
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

import efw.i18n.I18nManager;
import efw.properties.EfwAuthBean;
import efw.properties.PropertiesManager;
/**
 * efwFilterはJSPのログイン有無と接続権限をチェックする。
 * @author Chang Kejun
 *
 */
@WebFilter(filterName="efwFilter", urlPatterns={"*.jsp"})
public final class efwFilter implements Filter {
	
	/**
	 * フィルタ実行関数。
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String strRequestURI = ((HttpServletRequest) request).getRequestURI();
		EfwAuthBean currentAuthBean=efwCorsFilter.getCurrentAuthBean();
		if(		currentAuthBean.welcomePattern.matcher(strRequestURI).find()					//welcomeページ
				||currentAuthBean.loginUrlPattern.matcher(strRequestURI).find()					//ログインページ
				||currentAuthBean.systemErrorUrlPattern.matcher(strRequestURI).find()			//エラーページ
				||currentAuthBean.clientMessagesUrlPattern.matcher(strRequestURI).find()		
				||currentAuthBean.elFinderMessagesUrlPattern.matcher(strRequestURI).find()){
			chain.doFilter(request, response);
		}else{
			if(currentAuthBean.loginCheck){//ログインチェック設定の場合
				if(!currentAuthBean.outOfloginUrlPattern.matcher(strRequestURI).find()){//接続画面がログイン必要の場合
					Object loginCheckValue=((HttpServletRequest) request).getSession().getAttribute(currentAuthBean.loginKey);
					if(loginCheckValue==null || loginCheckValue.equals("")){//ログインしていない場合
						//もしサブパーツ呼び出し場合、loginURLではなくerrorURLへ遷移する。
						if (efwCorsFilter.getAsMain()) {
							((HttpServletResponse)response).sendRedirect(currentAuthBean.loginUrl);
						}else {
							//ここでは言語情報を取得できない。言語情報はイベントjsのなかです。
							response.getWriter().write("<span>"+I18nManager.get("en", "SessionTimeoutException", "Session timeout. Please log in again.")+"</span>");
						}
				        
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
							if (efwCorsFilter.getAsMain()) {
								((HttpServletResponse)response).sendRedirect(currentAuthBean.systemErrorUrl);
							}else {
								//ここでは言語情報を取得できない。言語情報はイベントjsのなかです。
								response.getWriter().write("<span>"+I18nManager.get("en", "OtherErrorException", "An unexpected error has occurred.")+"</span>");
							}
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
		framework.removeI18nProp();//jsp画面のタグに多国語対応のメッセージがあり、そのThreadのi18propを削除
	}

	@Override
	public void init(FilterConfig config) throws ServletException {}
	@Override
	public void destroy() {}

}
