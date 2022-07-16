/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

public final class Attr extends TagSupport{

	private String key = "";

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = Util.translateAttr(pageContext,key);
	}

	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		try {
			String value=null;
			String param=pageContext.getRequest().getParameter(key);
			String attr=(String)pageContext.getAttribute(key,PageContext.REQUEST_SCOPE);
			if (attr!=null) {
				value=attr;
			}else {
				value=param;
			}
			out.print(value);
		} catch (IOException e) {
			e.printStackTrace();
		}
		key = "";
		return SKIP_BODY;
	}

}
