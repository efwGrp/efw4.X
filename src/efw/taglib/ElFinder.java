/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;

/**
 * ElFinderタグを処理するクラス。
 * <efw:ElFinder home="" readonly="" lang="" height="" width=""/>
 * @author Chang Kejun
 *
 */
public final class ElFinder extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="elFinder";
	private String home="";
	private boolean isAbs=false;
	private String selection="";
	private boolean readonly=false;
	private String height="400";
	private String width="auto";
	private boolean _protected=false;
	private String appurl="";

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = Util.translateAttr(pageContext,id);
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = Util.translateAttr(pageContext,home);
	}

	public String getIsAbs() {
		return ""+isAbs;
	}

	public void setIsAbs(String isAbs) {
		this.isAbs = "true".equals(Util.translateAttr(pageContext,isAbs));
	}
	
	public String getSelection() {
		return selection;
	}

	public void setSelection(String selection) {
		this.selection = Util.translateAttr(pageContext,selection);
	}

	public String getReadonly() {
		return ""+readonly;
	}

	public void setReadonly(String readonly) {
		if ("true".equalsIgnoreCase(Util.translateAttr(pageContext,readonly))) {
			this.readonly=true;
		}else {
			this.readonly=false;
		}
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = Util.translateAttr(pageContext,height);
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = Util.translateAttr(pageContext,width);
	}

	public String isProtected() {
		return ""+_protected;
	}

	public void setProtected(String _protected) {
		if ("true".equalsIgnoreCase(Util.translateAttr(pageContext,_protected))) {
			this._protected=true;
		}else {
			this._protected=false;
		}
	}
	
	public String getAppurl() {
		return appurl;
	}

	public void setAppurl(String appurl) {
		this.appurl = Util.translateAttr(pageContext,appurl);
	}

	private HashMap<String, String> attrs=new HashMap<String, String>();
	
	private static void _init(String id,String home,boolean isAbs,boolean readonly,boolean _protected,HttpServletRequest req) {
		req.getSession().setAttribute("EFW_ELFINDER_PROTECTED_"+id, _protected?"true":"false");
		req.getSession().setAttribute("EFW_ELFINDER_HOME_"+id, home);
		req.getSession().setAttribute("EFW_ELFINDER_ISABS_"+id, (isAbs?"true":"false"));
		req.getSession().setAttribute("EFW_ELFINDER_READONLY_"+id,(readonly?"true":"false"));
	}

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		JspWriter out;
		String lang=(String) pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE);
		if ("".equals(lang)||lang==null)lang="en";
		try {
			String v=framework.version;
			boolean asMain=false;
			//メイン部品と実行する場合
			if ("".equals(appurl)) {
				asMain=true;
			}else {
				//サブ部品実行、サブpartにelfinderのappurl属性を設定する想定。
				asMain=false;
			}
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/elfinder.min.css?v="+v+"\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/theme.css?v="+v+"\">");
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.full.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder.messages.jsp?lang="+lang+"&v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#"+id+"\")"
					+ ".elfinder({"
					+"\"url\":"+(asMain?"efw.baseurl+\"":"\""+appurl)+"/efwServlet\","
					+"\"urlUpload\":"+(asMain?"efw.baseurl+\"":"\""+appurl)+"/uploadServlet\","
					+"\"soundPath\":"+(asMain?"efw.baseurl+\"":"\""+appurl)+"/elfinder/sounds\","
					+ "\"appurl\":"+(asMain?"efw.baseurl":"\""+appurl+"\"")+","
					+"\"requestType\":\"POST\","
					+"\"lang\":\""+lang+"\","
					+"\"height\":\""+height+"\","
					+"\"width\":\""+width+"\","
					+ "\"customData\":{"
					+ "\"home\":\""+jsEncode(home)+"\","
					+ "\"isAbs\":"+isAbs+","
					+ "\"selection\":\""+jsEncode(selection)+"\","
					+ "\"readonly\":"+readonly+","
					+ "\"id\":\""+id+"\","
					+ "}"
					+ "}).elfinder(\"instance\");});");
			out.print("</script>");
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			out.print("<div "+"id=\""+id+"\" "+temp+"></div>");
			
			ElFinder._init(id,home,isAbs,readonly, _protected,(HttpServletRequest)this.pageContext.getRequest());
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="elFinder";
		home="";
		isAbs=false;
		selection="";
		readonly=false;
		height="400";
		width="auto";
		_protected=false;
		appurl="";
		attrs=new HashMap<String, String>();
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		attrs.put(name, Util.translateAttr(pageContext,(String)value));
	}
	
	/**
	 * javascript escape機能を実装する
	 * @param v
	 * @return
	 */
	private String jsEncode(String v) {
		if (v==null) {
			return v;
		}else {
			return v.replaceAll("[\\\\]", "\\\\\\\\").replaceAll("[']","\\\\'").replaceAll("[\"]","\\\\\"");
		}
	}
}
