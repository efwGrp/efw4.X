/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * Partタグを処理するクラス。
 * <efw:Part path="myPage.jsp" param1="" param2=""/>
 * bodyタグに追加して、myPage.jspの出力をIncludeする。
 * @author Chang Kejun
 *
 */
public final class Part extends TagSupport implements DynamicAttributes {
	
	/**
	 * includeページの相対パス。
	 */
	private String path="";
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
			if (this.getId()!=null){
				pageContext.setAttribute("id", this.getId(),PageContext.REQUEST_SCOPE);
				attrs.add("id");
			}
			pageContext.include(path,false);
			for(int i=0;i<attrs.size();i++){
				pageContext.removeAttribute(attrs.get(i));
			}
		} catch (ServletException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		path="";
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("path")){
			path=(String) value;
		}else{
			pageContext.setAttribute(name, value,PageContext.REQUEST_SCOPE);
			attrs.add(name);
		}
	}

}
