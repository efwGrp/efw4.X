/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import jakarta.servlet.jsp.JspWriter;
import jakarta.servlet.jsp.PageContext;
import jakarta.servlet.jsp.tagext.TagSupport;
/**
 * Attrタグを処理するクラス。
 * &lt;efw:Attr key="myKey"/&gt;
 * @author kejun.chang
 *
 */
public final class Attr extends TagSupport{

	private String key = "";
	/**
	 * キーを取得する。
	 * @return キー。
	 */
	public String getKey() {
		return key;
	}
	/**
	 * キーを設定する。
	 * @param key キー。
	 */
	public void setKey(String key) {
		this.key = Util.translateAttr(pageContext,key);
	}
	/**
	 * タグを実行する。
	 * @return SKIP_BODY。
	 */
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
