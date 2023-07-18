/**** efw4.X Copyright 2022 efwGrp ****/
package efw;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

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

import efw.properties.EfwAuthBean;
import efw.properties.PropertiesManager;
import efw.taglib.Client;
/**
 * efwCorsFilterはリクエストを加工しCors機能を実現する。
 * @author Chang Kejun
 */
@WebFilter(filterName="efwCorsFilter", urlPatterns={
		"*.jsp",
		"/efwServlet",
		"/efwRestAPI/*",
		"/uploadServlet",
		"/downloadServlet",
		"/partServlet"
})
public final class efwCorsFilter implements Filter {
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
			//about cookie, it must be after chain.dofilter.because the program maybe set cookie.
			//httpの場合、Secureを設定できない。
			//Subとする場合、httpsにしないといけない。※localhostのテストは大丈夫。
			//そして、Subの場合だけ、SameSite=None; Secureを設定する。
			if (!asMain) {
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
	private static final String APPURL ="appurl";
	private static final String ENCODE_KEY="encodekey";
	private static final String ENCODER="encoder";
	private static final String BLOWFISH="BLOWFISH";
	
	private static boolean asMain =true;
	public static boolean getAsMain() {
		return asMain;
	}
	private static final HashMap<String,Map<String,Object>> callToSubs=new HashMap<>();
	/**
	 * エンコーダを取得する。
	 * @param subAppUrl サブアプリのURL。
	 * @return エンコーダ。
	 */
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
	private static String efwDecodeKey=null;
	private static Cipher decoder=null;
	/**
	 * デコーダを取得する。
	 * @return デコーダ。
	 */
	public static Cipher getDecoder() {
		return decoder;
	}
	
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
		asMain = PropertiesManager.getBooleanProperty(PropertiesManager.EFW_AS_MAIN, asMain);
		
		if (asMain) {//メインアプリの場合
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
					if (encodeKey!=null && !"".equals(encodeKey)){
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
		}else {//サブアプリの場合
			//暗号化キー
			efwDecodeKey=PropertiesManager.getProperty(PropertiesManager.EFW_DECODEKEY,efwDecodeKey);
			// 使用する暗号化アルゴリズム
			if (efwDecodeKey!=null && !"".equals(efwDecodeKey)) {
				try {
					Cipher cipher = Cipher.getInstance(BLOWFISH);
					cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(efwDecodeKey.getBytes(), BLOWFISH));
					decoder = cipher;
				}catch(Exception ex) {
					ex.printStackTrace();
				}
			}
		}
		
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
