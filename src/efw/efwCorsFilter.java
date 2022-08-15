/**** efw4.X Copyright 2022 efwGrp ****/
package efw;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
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
import efw.taglib.Part;
import efw.taglib.Util;
/**
 * SameSiteFilterはcookieにSameSiteとSecureを追加
 * Cors機能のため
 * @author Chang Kejun
 */
@WebFilter(filterName="efwCorsFilter", urlPatterns={
		"*.jsp",
		"/efwServlet",
		"/efwRestAPI/*",
		"/uploadServlet",	//セッション利用があるから
		"/downloadServlet"	//セッション利用があるから
})
public final class efwCorsFilter implements Filter {
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse res=(HttpServletResponse) response;
		if ("OPTIONS".equals(req.getMethod())){
			efwCorsFilter.doCORSPreflight(req, res);
			return;
		}else {
			//set headers for cors.
			efwCorsFilter.doCORS(req, res);
			//keep req and resp to thread local for javascript program.
			framework.setRequest(request);
			framework.setResponse(response);
			request.setCharacterEncoding(framework.getSystemCharSet());//すべての外部むけURLは全部ここでエンコードを設定する
			response.setCharacterEncoding(framework.getSystemCharSet());
			response.setContentType("application/json");
			//もしAuthBeanを取れない場合つまり定義間違い。
			if (getCurrentAuthBean()!=null) {
				//if as sub app, to identify the main app.
				setCalledFromMainAppSessionKey(req);
				//do the program
				chain.doFilter(request, response);
			}
			//remove req and resp from thread local
			framework.removeRequest();
			framework.removeResponse();
			//about cookie, it must be after chain.dofilter.because the program maybe set cookie.
			Collection<String> headers = res.getHeaders("Set-Cookie");
			boolean firstHeader = true;
			for (String header : headers) {  
				if (firstHeader) {
					res.setHeader("Set-Cookie", String.format("%s; %s", header, "SameSite=None; Secure"));
					firstHeader = false;
					continue;
				}
				res.addHeader("Set-Cookie", String.format("%s; %s", header, "SameSite=None; Secure"));
			}
		}
	}
	//CORS対応
	private static void doCORSPreflight(HttpServletRequest request, HttpServletResponse response){
		//if init is failed, return the info instead of throw exception
		if (framework.getInitSuccessFlag()){
			response.setHeader("Access-Control-Allow-Headers", "Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent,X-Requested-With");
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
	private static final String EFW_PROP ="efw";
	private static final String APPURL ="appurl";
	private static final String ENCODE_KEY="encodekey";
	private static final String DECODE_KEY="decodekey";
	private static final String ENCODER="encoder";
	private static final String DECODER="decoder";
	private static final String BLOWFISH="BLOWFISH";
	
	private static boolean asMain =true;
	private static HashMap<String,Map<String,Object>> callToSubs=new HashMap<>();
	public static Cipher getEncoder(String subAppUrl) {
		for(String key : callToSubs.keySet()) {
			HashMap<String,Object> map=(HashMap<String,Object>)callToSubs.get(key);
			String appurl=(String)map.get(APPURL);
			Cipher encoder=(Cipher)map.get(ENCODER);
			if (subAppUrl.equals(appurl)) {
				return encoder;
			}
		}
		return null;
	}
	private static boolean asSub =true;
	private static HashMap<String,Map<String,Object>> calledFromMains=new HashMap<>();
	public static Cipher getDecoder(String mainAppUrl) {
		for(String key : calledFromMains.keySet()) {
			HashMap<String,Object> map=(HashMap<String,Object>)calledFromMains.get(key);
			String appurl=(String)map.get(APPURL);
			Cipher encoder=(Cipher)map.get(DECODER);
			if (mainAppUrl.equals(appurl)) {
				return encoder;
			}
		}
		return null;
	}
	private static HashMap<String,EfwAuthBean> authBeans=new HashMap<>();
	public static EfwAuthBean getCurrentAuthBean() {
		try {
			HttpServletRequest request=(HttpServletRequest)framework.getRequest();
			if (request.getHeader("Origin")!=null) {//ajaxから呼び出す場合、
				String selfappurl=Util.getAppUrl();
				String referer=(String)request.getSession().getAttribute(Part.EFW_MAIN_REFERER);//   request.getHeader("Referer");
				//mainappから呼び出す場合
				if (referer==null) {
					if (asMain) {
						return authBeans.get(EFW_PROP);
					}else {
						throw new efwDoNotAsMainException();
					}
				}else if (referer.indexOf(selfappurl)==0) {
					if (asMain) {
						return authBeans.get(EFW_PROP);
					}else {
						throw new efwDoNotAsMainException();
					}
				}else {
					for(String key : calledFromMains.keySet()) {
						HashMap<String,Object> map=(HashMap<String,Object>)calledFromMains.get(key);
						String appurl=(String)map.get(APPURL);
						if (referer.indexOf(appurl, 0)==0) {
							if (asSub) {
								return authBeans.get(key);
							}else {
								throw new efwDoNotAsSubException();
							}
						}
					}
					throw new MainIsNotAuthorizedException();
				}
			}else {
				if (asMain) {
					return authBeans.get(EFW_PROP);
				}else {
					throw new efwDoNotAsMainException();
				}
			}
			
		}catch(efwException ex) {
			framework.runtimeSLog(ex);
			return null;
		}
	}
	/**
	 * セッションにEFW_CALLED_FROM_MAIN_APP_KEYを設定する。
	 * @param request
	 */
	private static void setCalledFromMainAppSessionKey(HttpServletRequest request) {
		String referer=(String)request.getParameter(Part.EFW_MAIN_REFERER);
		String loginkey=(String)request.getParameter(Part.EFW_MAIN_LOGIN_KEY);
		String authkey=(String)request.getParameter(Part.EFW_MAIN_AUTH_KEY);
		String loginValue=(String)request.getParameter(Part.EFW_MAIN_LOGIN_VALUE);
		String authValue=(String)request.getParameter(Part.EFW_MAIN_AUTH_VALUE);
		
		Cipher decoder=null;
		if (referer!=null) {
			request.getSession().setAttribute(Part.EFW_MAIN_REFERER,referer);
			decoder=getDecoder(referer);
		}
		//暗号化と復号化
		if (decoder!=null) {
			if (loginkey!=null) loginkey=Util.decode(loginkey,decoder);
			if (loginValue!=null) loginValue=Util.decode(loginValue,decoder);
			if (authkey!=null) authkey=Util.decode(authkey,decoder);
			if (authValue!=null) authValue=Util.decode(authValue,decoder);
			if (loginkey!=null) request.getSession().setAttribute(loginkey,loginValue);
			if (authkey!=null) request.getSession().setAttribute(authkey,authValue);
		}else {
			if (loginkey!=null) request.getSession().setAttribute(loginkey,loginValue);
			if (authkey!=null) request.getSession().setAttribute(authkey,authValue);
		}
	}
	
	/**
	 * フィルタ初期化の代わりに、efwServletから初期化するための関数。
	 * @throws IOException 
	 */
	public static synchronized void init() throws IOException{
		//メインアプリの場合
		asMain = PropertiesManager.getBooleanProperty(PropertiesManager.EFW_AS_MAIN, asMain);
		if (asMain) {
			//メインアプリとするバイア、メインプロパティファイルからのセキュリティ情報を読み込む
			EfwAuthBean bean=new EfwAuthBean(PropertiesManager.prop);
			authBeans.put(EFW_PROP, bean);
			String[] ary=PropertiesManager.getProperty(PropertiesManager.EFW_CALL_TO_SUBS, "").split(",");
			for(int i=0;i<ary.length;i++) {
				String key=ary[i];
				if (!"".equals(key)) {
					HashMap<String,Object> map=new HashMap<>();
					map.put(APPURL, PropertiesManager.getProperty(key+"."+APPURL,""));
					String encodeKey=PropertiesManager.getProperty(key+"."+ENCODE_KEY,null);
					map.put(ENCODE_KEY, encodeKey);
					callToSubs.put(key,map);
					// 使用する暗号化アルゴリズム
					if (encodeKey!=null) {
						try {
							Cipher cipher = Cipher.getInstance(BLOWFISH);
							cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(encodeKey.getBytes(), BLOWFISH));
							map.put(ENCODER, cipher);
						}catch(Exception ex) {
							ex.printStackTrace();
						}
					}
				}
			}
		}
		
		//サブアプリの場合
		asSub = PropertiesManager.getBooleanProperty(PropertiesManager.EFW_AS_SUB, asSub);
		if (asSub) {
			//サブアプリの場合、呼び出される複数メインアプリのセキュリティ設定を読み込む
			String[] ary=PropertiesManager.getProperty(PropertiesManager.EFW_CALLED_FROM_MAINS, "").split(",");
			for(int i=0;i<ary.length;i++) {
				String key=ary[i];
				if (!"".equals(key)) {
					HashMap<String,Object> map=new HashMap<>();
					map.put(APPURL, PropertiesManager.getProperty(key+"."+APPURL,""));
					String decodeKey= PropertiesManager.getProperty(key+"."+DECODE_KEY,null);
					map.put(DECODE_KEY,decodeKey);
					calledFromMains.put(key,map);
					if (decodeKey!=null) {
						try {
							Cipher cipher = Cipher.getInstance(BLOWFISH);
							cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(decodeKey.getBytes(), BLOWFISH));
							map.put(DECODER, cipher);
						}catch(Exception ex) {
							ex.printStackTrace();
						}
					}
					
					InputStream inptstrm=Thread.currentThread().getContextClassLoader().getResourceAsStream(key+".properties");
			    	Properties prop = new Properties();
					if (inptstrm!=null) {
						prop.load(inptstrm);
						inptstrm.close();
					}
					authBeans.put(key, new EfwAuthBean(prop));
				}
			}
		}
	}
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}
	@Override
	public void destroy() {}
}
