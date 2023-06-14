package efw.taglib;

import java.util.Base64;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.servlet.jsp.PageContext;

import efw.efwCorsFilter;
import efw.i18n.I18nManager;
import efw.properties.PropertiesManager;

public final class Util {
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
		return b.toString().replace(",}", "}");
	}
	
	protected static synchronized String encode(String v,String appurl) throws IllegalBlockSizeException, BadPaddingException{
		if (v==null||"".equals(v)) return v;
		Cipher encoder=efwCorsFilter.getEncoder(appurl);
		if (encoder==null) return v;
		byte[] encrypted = Base64.getUrlEncoder().encode(encoder.doFinal(v.getBytes()));
		return new String(encrypted);
	}
	protected static synchronized String decode(String v) throws IllegalBlockSizeException, BadPaddingException{
		if (v==null||"".equals(v)) return v;
		Cipher decoder = efwCorsFilter.getDecoder();
		if (decoder==null) return v;
		byte[] decrypted = decoder.doFinal(Base64.getUrlDecoder().decode(v.getBytes()));
		return new String(decrypted);
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
