package efw;

import java.util.HashMap;
import java.util.Properties;
import java.util.regex.Pattern;

import efw.properties.PropertiesManager;

public class EfwAuthBean{
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public EfwAuthBean(Properties prop) {
		this.prop=prop;
		this.loginCheck=this.getBooleanProperty(PropertiesManager.EFW_LOGIN_CHECK, this.loginCheck);
		framework.initCLog("loginCheck = "+this.loginCheck);
		this.loginKey=this.getProperty(PropertiesManager.EFW_LOGIN_KEY, this.loginKey);
		framework.initCLog("loginKey = "+this.loginKey);
		this.loginUrl=this.getProperty(PropertiesManager.EFW_LOGIN_URL, this.loginUrl);
		framework.initCLog("loginUrl = "+this.loginUrl);
		this.outOfloginUrlPatternString=this.getProperty(PropertiesManager.EFW_OUTOFLOGIN_URL_PATTERN, "");
		framework.initCLog("outOfloginUrlPattern = "+this.outOfloginUrlPatternString);
		this.outOfloginEventIdPatternString=this.getProperty(PropertiesManager.EFW_OUTOFLOGIN_EVENTID_PATTERN, "");
		framework.initCLog("outOfloginEventIdPattern = "+this.outOfloginEventIdPatternString);
		this.welcomePattern=Pattern.compile("[/]$");
		this.outOfloginUrlPattern=Pattern.compile(this.outOfloginUrlPatternString);
		this.outOfloginEventIdPattern=Pattern.compile(this.outOfloginEventIdPatternString);
		this.loginUrlPattern=Pattern.compile(this.loginUrl);
		this.clientMessagesUrlPattern=Pattern.compile(this.clientMessagesUrl);
		this.elFinderMessagesUrlPattern=Pattern.compile(this.elFinderMessagesUrl);
		
		this.authCheck=this.getBooleanProperty(PropertiesManager.EFW_AUTH_CHECK,this.authCheck);
		framework.initCLog("authCheck = "+this.authCheck);
		this.authKey=this.getProperty(PropertiesManager.EFW_AUTH_KEY, this.authKey);
		framework.initCLog("authKey = "+this.authKey);
		this.systemErrorUrl=this.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL, this.systemErrorUrl);
		framework.initCLog("systemErrorUrl = "+this.systemErrorUrl);
		this.systemErrorUrlPattern=Pattern.compile(this.systemErrorUrl);
		
		this.authCases=this.getProperty(PropertiesManager.EFW_AUTH_CASES,this.authCases);
		framework.initCLog("authCases = "+this.authCases);
		
		if(this.authCases!=null&&!this.authCases.equals("")){
			String[] ary=this.authCases.split(",");
			for(int i=0;i<ary.length;i++){
				String authCaseKey=ary[i];
				if(!ary[i].equals("")){
					String authPattern=this.getProperty(authCaseKey+"."+PropertiesManager.EFW_AUTH_AUTHPATTERN,"");
					framework.initCLog(authCaseKey+" authPattern = "+authPattern);
					String urlPattern=this.getProperty(authCaseKey+"."+PropertiesManager.EFW_AUTH_URLPATTERN,"");
					framework.initCLog(authCaseKey+" urlPattern = "+urlPattern);
					String eventidPattern=this.getProperty(authCaseKey+"."+PropertiesManager.EFW_AUTH_EVENTIDPATTERN,"");
					framework.initCLog(authCaseKey+" eventidPattern = "+eventidPattern);
					if(!authPattern.equals("")&&!urlPattern.equals("")){
						HashMap data=new HashMap();
						data.put(PropertiesManager.EFW_AUTH_AUTHPATTERN, authPattern);
						data.put(PropertiesManager.EFW_AUTH_URLPATTERN, urlPattern);
						data.put(PropertiesManager.EFW_AUTH_EVENTIDPATTERN, eventidPattern);
						this.authCasesMap.put(authCaseKey, data);
						HashMap authCasePattern=new HashMap();
						authCasePattern.put(PropertiesManager.EFW_AUTH_AUTHPATTERN, Pattern.compile(authPattern));
						authCasePattern.put(PropertiesManager.EFW_AUTH_URLPATTERN, Pattern.compile(urlPattern));
						authCasePattern.put(PropertiesManager.EFW_AUTH_EVENTIDPATTERN, Pattern.compile(eventidPattern));
						this.authCasePatternsMap.put(authCaseKey,authCasePattern);
					}
				}
			}
		}		
	}
	/**
	 * ログインチェック要否のフラグ。
	 */
	public boolean loginCheck =false;
	/**
	 * ログインチェック対象のセッションキー。
	 */
	public String loginKey ="USER_ID";
	/**
	 * ログイン画面のURL。
	 */
	public String loginUrl ="login.jsp";
	/**
	 * エラー画面のURL。
	 */
	public String systemErrorUrl ="error.jsp";
	/**
	 * クライアントメッセージのURL。
	 */
	public String clientMessagesUrl="efw.client.messages.jsp";
	/**
	 * elFinderクライアントメッセージのURL。
	 */
	public String elFinderMessagesUrl="elfinder.messages.jsp";
	/**
	 * ログインチェック対象外画面のURLパターンの文字列。
	 */
	public String outOfloginUrlPatternString="";
	/**
	 * ログインチェック対象外画面のイベントパターンの文字列。
	 */
	public String outOfloginEventIdPatternString="";
	
	/**
	 * WelcomeのURLパターン
	 */
	public Pattern welcomePattern =null;
	/**
	 * ログインチェック対象外画面のURLパターン。
	 */
	public Pattern loginUrlPattern =null;
	/**
	 * ログイン画面のURLパターン。
	 */
	public Pattern outOfloginUrlPattern =null;
	/**
	 * ログイン画面のEventIdパターン。
	 */
	public Pattern outOfloginEventIdPattern =null;
	/**
	 *  クライアントメッセージのURLパターン。
	 */
	public Pattern clientMessagesUrlPattern =null;
	/**
	 *  elFinderクライアントメッセージのURLパターン。
	 */
	public Pattern elFinderMessagesUrlPattern =null;
	/**
	 * 権限チェック要否のフラグ。
	 */
	public boolean authCheck =false;
	/**
	 * 権限チェック対象のセッションキー。
	 */
	public String authKey ="USER_AUTH";
	
	public String authCases  ="";
	public HashMap<String, HashMap<String,String>> authCasesMap =new HashMap<String, HashMap<String,String>>();
	public HashMap<String, HashMap<String,Pattern>> authCasePatternsMap =new HashMap<String, HashMap<String,Pattern>>();
	/**
	 * エラー画面のURLパターン。
	 */
	public Pattern systemErrorUrlPattern =null;

	/**
	 * プロパティ値を格納するプロパティオブジェクト。
	 */
	private Properties prop = null;
    /**
     * 文字列のプロパティを取得する。
     * @param key プロパティキー。
     * @param defaultValue デフォルト値。
     * @return　プロパティ値を返す。
     */
    private String getProperty(String key,String defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null) vl=defaultValue;
        return vl;
    }
    /**
     * ブールのプロパティを取得する。
     * @param key プロパティキー。
     * @param defaultValue デフォルト値。
     * @return　プロパティ値を返す。
     */
    private boolean getBooleanProperty(String key,boolean defaultValue) {
    	String vl=prop.getProperty(key);
    	if (vl==null){
    		return defaultValue;
    	}else{
            return Boolean.parseBoolean(vl);
    	}
    }
};
