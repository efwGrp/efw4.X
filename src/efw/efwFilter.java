/**** efw4.X Copyright 2019 efwGrp ****/
package efw;

import java.io.IOException;
import java.util.HashMap;
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

import efw.properties.PropertiesManager;
/**
 * efwFilterから初期化される。
 * JSPのログイン要否をチェックする。
 * @author Chang Kejun
 *
 */
@WebFilter(filterName="efwFilter", urlPatterns={"*.jsp"})
public final class efwFilter implements Filter {
	/**
	 * ログインチェック要否のフラグ。
	 */
	private static boolean loginCheck =false;
	/**
	 * ログインチェック対象のセッションキー。
	 */
	private static String loginKey ="USER_ID";
	/**
	 * ログイン画面のURL。
	 */
	private static String loginUrl ="login.jsp";
	/**
	 * エラー画面のURL。
	 */
	private static String systemErrorUrl ="error.jsp";
	/**
	 * クライアントメッセージのURL。
	 */
	private static String clientMessagesUrl="efw.client.messages.jsp";
	/**
	 * elFinderクライアントメッセージのURL。
	 */
	private static String elFinderMessagesUrl="elfinder.messages.jsp";
	/**
	 * jExcelクライアントメッセージのURL。
	 */
	private static String jExcelMessagesUrl="jexcel.messages.jsp";
	/**
	 * ログインチェック対象外画面のURLパターンの文字列。
	 */
	private static String outOfloginUrlPatternString="";
	/**
	 * WelcomeのURLパターン
	 */
	private static Pattern welcomePattern =null;
	/**
	 * ログインチェック対象外画面のURLパターン。
	 */
	private static Pattern loginUrlPattern =null;
	/**
	 * ログイン画面のURLパターン。
	 */
	private static Pattern outOfloginUrlPattern =null;
	/**
	 *  クライアントメッセージのURLパターン。
	 */
	private static Pattern clientMessagesUrlPattern =null;
	/**
	 *  elFinderクライアントメッセージのURLパターン。
	 */
	private static Pattern elFinderMessagesUrlPattern =null;
	/**
	 *  jExcelクライアントメッセージのURLパターン。
	 */
	private static Pattern jExcelMessagesUrlPattern =null;
	/**
	 * 権限チェック要否のフラグ。
	 */
	private static boolean authCheck =false;
	/**
	 * 権限チェック対象のセッションキー。
	 */
	private static String authKey ="USER_AUTH";
	
	private static String authCases  ="";
	private static HashMap<String, HashMap<String,String>> authCasesMap =new HashMap<String, HashMap<String,String>>();
	private static HashMap<String, HashMap<String,Pattern>> authCasePatternsMap =new HashMap<String, HashMap<String,Pattern>>();
	/**
	 * エラー画面のURLパターン。
	 */
	private static Pattern systemErrorUrlPattern =null;
	/**
	 * フィルタ実行関数。
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String strRequestURI = ((HttpServletRequest) request).getRequestURI();
		if(		welcomePattern.matcher(strRequestURI).find()					//welcomeページ
				||loginUrlPattern.matcher(strRequestURI).find()					//ログインページ
				||systemErrorUrlPattern.matcher(strRequestURI).find()			//エラーページ
				||clientMessagesUrlPattern.matcher(strRequestURI).find()		
				||elFinderMessagesUrlPattern.matcher(strRequestURI).find()
				||jExcelMessagesUrlPattern.matcher(strRequestURI).find()){
			chain.doFilter(request, response);
		}else{
			if(loginCheck){//ログインチェック設定の場合
				if(!outOfloginUrlPattern.matcher(strRequestURI).find()){//接続画面がログイン必要の場合
					Object loginCheckValue=((HttpServletRequest) request).getSession().getAttribute(loginKey);
					if(loginCheckValue==null || loginCheckValue.equals("")){//ログインしていない場合
				        ((HttpServletResponse)response).sendRedirect(loginUrl);
					}else if(authCheck){//ログインした、権限チェック必要の場合
						boolean hasAuth=false;
						for (String key : authCasePatternsMap.keySet()) {
							String authCheckValue=(String)((HttpServletRequest) request).getSession().getAttribute(authKey);
							Pattern authPattern=authCasePatternsMap.get(key).get(PropertiesManager.EFW_AUTH_AUTHPATTERN);
							Pattern urlPattern=authCasePatternsMap.get(key).get(PropertiesManager.EFW_AUTH_URLPATTERN);
							if(authPattern.matcher(authCheckValue).find()&&urlPattern.matcher(strRequestURI).find()){
								hasAuth=true;
								break;
							}
						}
						if(!hasAuth){//権限を持っていない場合
							((HttpServletResponse)response).sendRedirect(systemErrorUrl);
						}else{//権限をもっている場合
							chain.doFilter(request, response);
						}
					}else{//ログインした、権限チェック未設定の場合
						chain.doFilter(request, response);
					}
				}else{//接続画面がログイン必要ない場合
					chain.doFilter(request, response);
				}
			}else{//路銀チェック未設定の場合
				chain.doFilter(request, response);
			}
		}
		framework.removeI18nProp();//jsp画面のタグに多国語対応のメッセージがあり、そのThreadのi18propを削除
	}
	/**
	 * フィルタ初期化の代わりに、efwServletから初期化するための関数。
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static synchronized void init(){
		loginCheck=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_LOGIN_CHECK, loginCheck);
		framework.initCLog("loginCheck = "+loginCheck);
		loginKey=PropertiesManager.getProperty(PropertiesManager.EFW_LOGIN_KEY, loginKey);
		framework.initCLog("loginKey = "+loginKey);
		loginUrl=PropertiesManager.getProperty(PropertiesManager.EFW_LOGIN_URL, loginUrl);
		framework.initCLog("loginUrl = "+loginUrl);
		outOfloginUrlPatternString=PropertiesManager.getProperty(PropertiesManager.EFW_OUTOFLOGIN_URL_PATTERN, "");
		framework.initCLog("outOfloginUrlPattern = "+outOfloginUrlPatternString);
		welcomePattern=Pattern.compile("[/]$");
		outOfloginUrlPattern=Pattern.compile(outOfloginUrlPatternString);
		loginUrlPattern=Pattern.compile(loginUrl);
		clientMessagesUrlPattern=Pattern.compile(clientMessagesUrl);
		elFinderMessagesUrlPattern=Pattern.compile(elFinderMessagesUrl);
		jExcelMessagesUrlPattern=Pattern.compile(jExcelMessagesUrl);
		
		authCheck=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_AUTH_CHECK,authCheck);
		framework.initCLog("authCheck = "+authCheck);
		authKey=PropertiesManager.getProperty(PropertiesManager.EFW_AUTH_KEY, authKey);
		framework.initCLog("authKey = "+authKey);
		systemErrorUrl=PropertiesManager.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL, systemErrorUrl);
		framework.initCLog("systemErrorUrl = "+systemErrorUrl);
		systemErrorUrlPattern=Pattern.compile(systemErrorUrl);
		
		authCases=PropertiesManager.getProperty(PropertiesManager.EFW_AUTH_CASES,authCases);
		framework.initCLog("authCases = "+authCases);
		
		if(authCases!=null&&!authCases.equals("")){
			String[] ary=authCases.split(",");
			for(int i=0;i<ary.length;i++){
				String authCaseKey=ary[i];
				if(!ary[i].equals("")){
					String authPattern=PropertiesManager.getProperty(authCaseKey+"."+PropertiesManager.EFW_AUTH_AUTHPATTERN,"");
					framework.initCLog(authCaseKey+" authPattern = "+authPattern);
					String urlPattern=PropertiesManager.getProperty(authCaseKey+"."+PropertiesManager.EFW_AUTH_URLPATTERN,"");
					framework.initCLog(authCaseKey+" urlPattern = "+urlPattern);
					if(!authPattern.equals("")&&!urlPattern.equals("")){
						HashMap data=new HashMap();
						data.put(PropertiesManager.EFW_AUTH_AUTHPATTERN, authPattern);
						data.put(PropertiesManager.EFW_AUTH_URLPATTERN, urlPattern);
						authCasesMap.put(authCaseKey, data);
						HashMap authCasePattern=new HashMap();
						authCasePattern.put(PropertiesManager.EFW_AUTH_AUTHPATTERN, Pattern.compile(authPattern));
						authCasePattern.put(PropertiesManager.EFW_AUTH_URLPATTERN, Pattern.compile(urlPattern));
						authCasePatternsMap.put(authCaseKey,authCasePattern);
					}
				}
			}
		}
	}

	@Override
	public void init(FilterConfig config) throws ServletException {}
	@Override
	public void destroy() {}

}
