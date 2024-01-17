/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.util.ArrayList;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;
/**
 * Partタグを処理するクラス。<br>
 * &lt;efw:Part path="myPage.jsp" param1="" param2=""/&gt;<br>
 * bodyタグに追加して、myPage.jspの出力をIncludeする。
 * @author Chang Kejun
 */
public final class Part extends TagSupport implements DynamicAttributes {
	/**
	 * ページパス。
	 */
	private String path="";
	/**
	 * ページパスを取得する。
	 * @return ページパス。
	 */
	public String getPath() {
		return path;
	}
	/**
	 * ページパスを設定する。
	 * @param path ページパス。
	 */
	public void setPath(String path) {
		this.path = Util.translateAttr(pageContext,path);
	}
	/**
	 * 設定された属性の配列。
	 */
	private ArrayList<String> attrs=new ArrayList<String>(); 
	
	
	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag() {
		try {
			pageContext.include(path,false);

			for(int i=0;i<attrs.size();i++){
				pageContext.removeAttribute(attrs.get(i));
			}
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			ex.printStackTrace();
		}
		path="";
		return SKIP_BODY;
	}
	
	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 * @param uri 名称空間。
	 * @param name 属性名。
	 * @param value 属性値。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		pageContext.setAttribute(name, Util.translateAttr(pageContext,(String)value),PageContext.REQUEST_SCOPE);
		attrs.add(name);
	}

}
