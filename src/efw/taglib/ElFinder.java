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
	private String selection="";
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

	public String getSelection() {
		return selection;
	}

	public void setSelection(String selection) {
		this.selection = selection;
	}

	public String getReadonly() {
		return ""+readonly;
	}

	public void setReadonly(String readonly) {
		if ("true".equalsIgnoreCase(readonly)) {
			this.readonly=true;
		}else {
			this.readonly=false;
		}
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

	public String isProtected() {
		return ""+_protected;
	}

	public void setProtected(String _protected) {
		if ("true".equalsIgnoreCase(_protected)) {
			this._protected=true;
		}else {
			this._protected=false;
		}
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
	 * Cors機能に、jspの呼び出しがない状態で、リモートサーバのElfinderを初期化するため
	 * @param id
	 * @param home
	 * @param readonly
	 * @param _protected
	 */
	public static void _init(String id,String home,boolean readonly,boolean _protected) {
		ElFinder._init(id,home,readonly,_protected,(HttpServletRequest)framework.getRequest());
	}
	private static void _init(String id,String home,boolean readonly,boolean _protected,HttpServletRequest req) {
		synchronized(elfinderIds) {
			elfinderIds.put(id, _protected);
		}
		req.getSession().setAttribute("EFW_ELFINDER_HOME_"+id, home);
		req.getSession().setAttribute("EFW_ELFINDER_READONLY_"+id,(readonly?"true":"false"));
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
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.full.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder.messages.jsp?lang="+lang+"&v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#"+id+"\")"
					+ ".elfinder({"
					+ "\"url\":efw.baseurl+\"/efwServlet\","
					+ "\"urlUpload\":efw.baseurl+\"/uploadServlet\","
					+ "\"soundPath\":efw.baseurl+\"/elfinder/sounds\","
					+"\"requestType\":\"POST\","
					+"\"lang\":\""+lang+"\","
					+"\"height\":\""+height+"\","
					+"\"width\":\""+width+"\","
					+ "\"customData\":{"
					+ "\"home\":\""+jsEncode(home)+"\","
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
			
			ElFinder._init(id,home,readonly, _protected,(HttpServletRequest)this.pageContext.getRequest());
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="elFinder";
		home="";
		selection="";
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
		}else if(name.equalsIgnoreCase("selection")){
			selection=(String) value;
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
