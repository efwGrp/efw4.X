/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.i18n.I18nManager;

public final class Msg extends TagSupport implements DynamicAttributes {

	private String key = "";
	private String defaultValue=null;

	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		// 多国語対応のため、指定言語をattrに設定する。
		String lang = pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE).toString();
		try {
			if (defaultValue==null)defaultValue=key;
			out.print(I18nManager.get(lang, key, defaultValue));
		} catch (IOException e) {
			e.printStackTrace();
		}
		key = "";
		defaultValue = null;
		return SKIP_BODY;
	}

	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if (name.equalsIgnoreCase("key")) {
			key = (String) value;
		}
		if (name.equalsIgnoreCase("default")) {
			defaultValue = (String) value;
		}
	}
}
