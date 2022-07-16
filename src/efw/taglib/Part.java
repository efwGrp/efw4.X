/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import javax.crypto.Cipher;
import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.efwCorsFilter;
/**
 * Partタグを処理するクラス。
 * <efw:Part path="myPage.jsp" param1="" param2=""/>
 * bodyタグに追加して、myPage.jspの出力をIncludeする。
 * @author Chang Kejun
 *
 */
public final class Part extends TagSupport implements DynamicAttributes {
	
	/**
	 * ページパス。
	 */
	private String path="";
	/**
	 * appURL。ローカルの場合設定不要。
	 */
	private String appurl="";
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = Util.translateAttr(pageContext,path);
	}

	public String getAppurl() {
		return appurl;
	}

	public void setAppurl(String appurl) {
		this.appurl = Util.translateAttr(pageContext,appurl);
	}
	/**
	 * 設定された属性の配列。
	 */
	private ArrayList<String> attrs=new ArrayList<String>(); 
	
//	private static final String EFW_MAIN_SESSIONID="EFW_MAIN_SESSIONID";
	public static final String EFW_MAIN_LOGIN_KEY="EFW_MAIN_LOGIN_KEY";
	public static final String EFW_MAIN_AUTH_KEY="EFW_MAIN_AUTH_KEY";
	public static final String EFW_MAIN_LOGIN_VALUE="EFW_MAIN_LOGIN_VALUE";
	public static final String EFW_MAIN_AUTH_VALUE="EFW_MAIN_AUTH_VALUE";
	public static final String EFW_MAIN_REFERER="EFW_MAIN_REFERER";
	
	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag() {
		try {
			if (!"".equals(appurl)) {
				Cipher encoder=efwCorsFilter.getEncoder(appurl);
				JspWriter out = pageContext.getOut();
				String partid=("part"+((new Random()).nextInt())).replace('-', '_');
				HashMap<String, String> map=new HashMap<>();
				for(int i=0;i<attrs.size();i++) {
					String key=attrs.get(i);
					String value=(String)pageContext.getAttribute(key,PageContext.REQUEST_SCOPE);
					map.put(key, value);
				}
//				map.put(EFW_MAIN_SESSIONID, pageContext.getSession().getId());
				//権限に関わるセッション値を渡す
				String loginKey=efwCorsFilter.getCurrentAuthBean().loginKey;
				String authKey=efwCorsFilter.getCurrentAuthBean().authKey;
				String loginValue=(String)pageContext.getSession().getAttribute(loginKey);
				String authValue=(String)pageContext.getSession().getAttribute(authKey);
				if (encoder!=null) {
					if (loginKey!=null)loginKey=Util.encode(loginKey,encoder);
					if (authKey!=null)authKey=Util.encode(authKey,encoder);
					if (loginValue!=null)loginValue=Util.encode(loginValue,encoder);
					if (authValue!=null)authValue=Util.encode(authValue,encoder);
				}
				map.put(EFW_MAIN_LOGIN_KEY, loginKey);
				map.put(EFW_MAIN_AUTH_KEY, authKey);
				map.put(EFW_MAIN_LOGIN_VALUE, loginValue);
				map.put(EFW_MAIN_AUTH_VALUE, authValue);
				map.put(EFW_MAIN_REFERER, Util.getAppUrl());
				//外側のdivを付けて、そのdivにリモートのhtmlを設定する仕組み
				out.print("<div id=\""+partid+"\"><script>"
						+ "$(function(){$.ajax({"
						+ "url:'"+appurl+"/"+path+"?t='+new Date().getTime(),"
						+ "xhrFields:{withCredentials:true},"
						+ "type:'POST',"
						+ "cache:false,"
						+ "async:true,"
						+ "dataType:'html',"
						+ "data:"+Util.mapToJSON(map)+","
						+ "success:function(h){$('#"+partid+"').replaceWith($(h));}"
						+ "})});"
						+ "</script></div>");
			}else {
				pageContext.include(path,false);
			}
			for(int i=0;i<attrs.size();i++){
				pageContext.removeAttribute(attrs.get(i));
			}
		} catch (ServletException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		path="";
		appurl="";
		return SKIP_BODY;
	}
	
	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		pageContext.setAttribute(name, Util.translateAttr(pageContext,(String)value),PageContext.REQUEST_SCOPE);
		attrs.add(name);
	}
}
