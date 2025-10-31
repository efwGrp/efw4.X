/**** efw4.X Copyright 2025 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import efw.framework;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.jsp.JspException;
import jakarta.servlet.jsp.JspWriter;
import jakarta.servlet.jsp.PageContext;
import jakarta.servlet.jsp.tagext.DynamicAttributes;
import jakarta.servlet.jsp.tagext.TagSupport;

/**
 * ElFinderタグを処理するクラス。
 * &lt;efw:ElFinder home="myHomeFolder" readonly="false" protected="true" selection="file1" height="400" width="800"/&gt;<br>
 * &lt;efw:ElFinder home="c:/myHomeFolder" isAbs="true" /&gt;<br>
 * @author Chang Kejun
 *
 */
public final class ElFinder extends TagSupport implements DynamicAttributes {
	/**
	 * ダミーコンストラクタ
	 */
	public ElFinder(){super();}
	/**
	 * ElFinderのID
	 */
	private String id="elFinder";
	/**
	 * ホームフォルダ
	 */
	private String home="";
	/**
	 * 絶対パスフラグ
	 */
	private boolean isAbs=false;
	/**
	 * 選択項目
	 */
	private String selection="";
	/**
	 * 読取り専用フラグ
	 */
	private boolean readonly=false;
	/**
	 * 高さ
	 */
	private String height="400";
	/**
	 * 幅
	 */
	private String width="auto";
	/**
	 * 保護モードフラグ
	 */
	private boolean _protected=false;
	/**
	 * ログ保存用関数
	 */
	private String saveLogFunc="";
	/**
	 * ElFinderのIDを取得する。
	 * @return ElFinderのID。
	 */
	public String getId() {
		return id;
	}
	/**
	 * ElFinderのIDを設定する。
	 * @param id ElFinderのID。
	 */
	public void setId(String id) {
		this.id = Util.translateAttr(pageContext,id);
	}
	/**
	 * ホームフォルダを取得する。
	 * @return ホームフォルダ。
	 */
	public String getHome() {
		return home;
	}
	/**
	 * ホームフォルダを設定する。
	 * @param home ホームフォルダ。
	 */
	public void setHome(String home) {
		this.home = Util.translateAttr(pageContext,home);
	}
	/**
	 * 絶対パスフラグを取得する。
	 * @return 絶対パスフラグ。
	 */
	public String getIsAbs() {
		return ""+isAbs;
	}
	/**
	 * 絶対パスフラグを設定する。
	 * @param isAbs 絶対パスフラグ。
	 */
	public void setIsAbs(String isAbs) {
		this.isAbs = "true".equals(Util.translateAttr(pageContext,isAbs));
	}
	/**
	 * 選択項目を取得する。
	 * @return 選択項目。
	 */
	public String getSelection() {
		return selection;
	}
	/**
	 * 選択項目を設定する。
	 * @param selection 選択項目。
	 */
	public void setSelection(String selection) {
		this.selection = Util.translateAttr(pageContext,selection);
	}
	/**
	 * 読取り専用フラグを取得する。
	 * @return 読取り専用フラグ。
	 */
	public String getReadonly() {
		return ""+readonly;
	}
	/**
	 * 読取り専用フラグを設定する。
	 * @param readonly 読取り専用フラグ。
	 */
	public void setReadonly(String readonly) {
		if ("true".equalsIgnoreCase(Util.translateAttr(pageContext,readonly))) {
			this.readonly=true;
		}else {
			this.readonly=false;
		}
	}
	/**
	 * 高さを取得する。
	 * @return 高さ。
	 */
	public String getHeight() {
		return height;
	}
	/**
	 * 高さを設定する。
	 * @param height 高さ。
	 */
	public void setHeight(String height) {
		this.height = Util.translateAttr(pageContext,height);
	}
	/**
	 * 幅を取得する。
	 * @return 幅。
	 */
	public String getWidth() {
		return width;
	}
	/**
	 * 幅を設定する。
	 * @param width 幅。
	 */
	public void setWidth(String width) {
		this.width = Util.translateAttr(pageContext,width);
	}
	/**
	 * 保護モードフラグを取得する。
	 * @return 保護モードフラグ。
	 */
	public String isProtected() {
		return ""+_protected;
	}
	/**
	 * 保護モードフラグを設定する。
	 * @param _protected 保護モードフラグ。
	 */
	public void setProtected(String _protected) {
		if ("true".equalsIgnoreCase(Util.translateAttr(pageContext,_protected))) {
			this._protected=true;
		}else {
			this._protected=false;
		}
	}
	/**
	 * ログ保存関数を取得する。
	 * @return ログ保存関数。
	 */
	public String getSaveLogFunc() {
		return ""+saveLogFunc;
	}
	/**
	 * ログ保存関数を設定する。
	 * @param saveLogFunc ログ保存関数。
	 */
	public void setSaveLogFunc(String saveLogFunc) {
		this.saveLogFunc = Util.translateAttr(pageContext,saveLogFunc);
	}
	/**
	 * 動的パラメータを格納するマップ
	 */
	private HashMap<String, String> attrs=new HashMap<String, String>();
	
	private static void _init(String id,String home,boolean isAbs,boolean readonly,boolean _protected,String saveLogFunc,HttpServletRequest req) {
		req.getSession().setAttribute("EFW_ELFINDER_PROTECTED_"+id, _protected?"true":"false");
		req.getSession().setAttribute("EFW_ELFINDER_HOME_"+id, home);
		req.getSession().setAttribute("EFW_ELFINDER_ISABS_"+id, (isAbs?"true":"false"));
		req.getSession().setAttribute("EFW_ELFINDER_READONLY_"+id,(readonly?"true":"false"));
		req.getSession().setAttribute("EFW_ELFINDER_SAVELOGFUNC_"+id, saveLogFunc);
	}

	/**
	 * タグを実行する。
	 * @return SKIP_BODY。
	 */
	@Override
	public int doStartTag(){
		JspWriter out;
		String lang=(String) pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE);
		if ("".equals(lang)||lang==null)lang="en";
		try {
			String v=framework.version;
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/elfinder.min.css?v="+v+"\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/theme.css?v="+v+"\">");
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.full.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder.messages.jsp?lang="+lang+"&v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#"+id+"\")"
					+ ".elfinder({"
					+"\"url\":efw.baseurl+\"/efwServlet\","
					+"\"urlUpload\":efw.baseurl+\"/uploadServlet\","
					+"\"soundPath\":efw.baseurl+\"/elfinder/sounds\","
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
			
			ElFinder._init(id,home,isAbs,readonly, _protected,saveLogFunc,(HttpServletRequest)this.pageContext.getRequest());
			
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
		saveLogFunc="";
		attrs=new HashMap<String, String>();
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * @param uri 名称空間。
	 * @param name 属性名。
	 * @param value 属性値。
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
