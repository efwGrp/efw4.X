/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import efw.properties.PropertiesManager;

public final class Prop extends TagSupport{

	private String key = "";
	private String defaultValue=null;
	
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = Util.translateAttr(pageContext,key);
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = Util.translateAttr(pageContext,defaultValue);
	}

	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		
		try {
			if (defaultValue==null)defaultValue=key;
			out.print(PropertiesManager.getProperty(key, defaultValue));
		} catch (IOException e) {
			e.printStackTrace();
		}
		key = "";
		defaultValue = null;
		return SKIP_BODY;
	}
}
