package efw.taglib;

import efw.i18n.I18nManager;
import efw.properties.PropertiesManager;
import jakarta.servlet.jsp.PageContext;

public final class Util {
	/**
	 * タグのパラメータのスタイルを識別して変換する
	 * @param pageContext ページコンテキスト
	 * @param v jsp上の設定値
	 * @return 変換後の値
	 */
	public static String translateAttr(PageContext pageContext,String v) {
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
}
