/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
@SuppressWarnings("serial")
public final class ElFinder extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="elFinder";
	private String home="";
	private boolean readonly=false;
	private String height="400";
	private String width="auto";
	private boolean _protected=false;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = home;
	}

	public boolean isReadonly() {
		return readonly;
	}

	public void setReadonly(boolean readonly) {
		this.readonly = readonly;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public boolean isProtected() {
		return _protected;
	}

	public void setProtected(boolean _protected) {
		this._protected = _protected;
	}

	private HashMap<String, String> attrs=new HashMap<String, String>();
	
	private static HashMap<String, Boolean> elfinderIds=new HashMap<String, Boolean>();
	public static Boolean isProtected(String id){
		synchronized(elfinderIds) {
			if (elfinderIds.containsKey(id)) {
				return elfinderIds.get(id);
			}else {
				return null;
			}
		}
	}

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		if (this.getId()!=null){
			id=this.getId();
		}
		JspWriter out;
		String lang=(String) pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE);
		if ("".equals(lang)||lang==null)lang="en";
		try {
			String v=framework.getVersion();
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/elfinder.min.css?v="+v+"\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/theme.css?v="+v+"\">");
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.full.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder.messages.jsp?lang="+lang+"&v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#"+id+"\")"
					+ ".elfinder({"
					+ "\"url\":\"efwServlet\","
					+ "\"urlUpload\":\"uploadServlet\","
					+ "\"soundPath\":\"elfinder/sounds\","
					+"\"requestType\":\"POST\","
					+"\"lang\":\""+lang+"\","
					+"\"height\":\""+height+"\","
					+"\"width\":\""+width+"\","
					+ "\"customData\":{"
					+ "\"home\":\""+home+"\","
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
			synchronized(elfinderIds) {
				elfinderIds.put(id, _protected);
			}
			pageContext.getSession().setAttribute("EFW_ELFINDER_HOME_"+id, home);
			pageContext.getSession().setAttribute("EFW_ELFINDER_READONLY_"+id, (readonly?"true":"false"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="elFinder";
		home="";
		readonly=false;
		height="400";
		width="auto";
		_protected=false;
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
		if(name.equalsIgnoreCase("id")){
			id=(String) value;
		}else if(name.equalsIgnoreCase("home")){
			home=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("readonly")){
			if(((String) value).equalsIgnoreCase("true")){
				readonly=true;
			}
		}else if(name.equalsIgnoreCase("protected")){
			if(((String) value).equalsIgnoreCase("true")){
				_protected=true;
			}
		}else{
			attrs.put(name, (String)value);
		}
	}

}
