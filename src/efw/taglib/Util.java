package efw.taglib;

import java.util.Base64;
import java.util.Map;

import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.PageContext;

import efw.framework;
import efw.i18n.I18nManager;
import efw.properties.PropertiesManager;

public class Util {
	/**
	 * タグのパラメータのスタイルを識別して変換する
	 * @param pageContext
	 * @param v
	 * @return
	 */
	protected static String translateAttr(PageContext pageContext,String v) {
		if (v==null) return v;
		if (v.indexOf("prop:")==0||v.indexOf("Prop:")==0||v.indexOf("PROP:")==0){
			return PropertiesManager.getProperty(v.substring(5), "");
		}else if (v.indexOf("msg:")==0||v.indexOf("Msg:")==0||v.indexOf("MSG:")==0){
			// 多国語対応のため、指定言語をattrに設定する。
			String lang = pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE).toString();
			return I18nManager.get(lang, v.substring(4), "");
		}else {
			return v;
		}
	}
	/**
	 * アプリのURLを取得する。
	 * Elfinderタグが、メインアプリとサブアプリの相違を吸収するため。
	 * @return
	 */
	public static String getAppUrl() {
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		String uri = request.getScheme() + "://" +request.getServerName();
		if (80!=request.getServerPort()) {
			uri+=":" + request.getServerPort();
		}
		String[] ary=request.getRequestURI().split("/");
		if (ary.length>1) {
			uri+="/"+ary[1];//  /app/test.jsp のappの部分
		}
         return uri;
	}
	/**
	 * MapをJSON文字列に変換する
	 * @param map
	 * @return
	 */
	protected static String mapToJSON(Map<String, String> map) {
		
		StringBuffer b=new StringBuffer();
		b.append("{");
		for(Map.Entry<String, String> entry : map.entrySet()) {
			String key=entry.getKey();
			String value=entry.getValue();
			b.append("\""+escapeScript(key)+"\":");
			if (value==null) {
				b.append("null,");
			}else {
				b.append("\""+escapeScript(value)+"\",");
			}
		}
		b.append("}");
		return b.toString();
	}
	
	public static String encode(String v,Cipher encoder){
		try {
			byte[] encrypted = Base64.getUrlEncoder().encode(encoder.doFinal(v.getBytes()));
			return new String(encrypted);
		}catch(Exception ex) {
			ex.printStackTrace();
			return v;
		}
	}
	public static String decode(String v,Cipher decoder){
		try {
			byte[] encrypted =Base64.getUrlDecoder().decode(v.getBytes());
			byte[] decrypted = decoder.doFinal(encrypted);
			return new String(decrypted);
		}catch(Exception ex) {
			ex.printStackTrace();
			return v;
		}
	}
	//ここでやるのはjavascriptエンコードです。エンコード後のものはhtml上問題が起こす可能性がある。たとえば</br>とか
	private static String escapeScript(String s) {
		StringBuilder out = new StringBuilder();
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c > 127 || c == '"' || c == '\'' || c == '<' || c == '>' || c == '&') {
				out.append("\\"+c);
			} else {
				out.append(c);
			}
		}
		return out.toString();
	}

}
