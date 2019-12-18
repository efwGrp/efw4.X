/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.ElFinderIdIsNotExistException;
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
	private String lang="en";
	private String height="400";
	private String width="auto";
	private boolean _protected=false;
	private HashMap<String, String> attrs=new HashMap<String, String>();
	
	private static HashMap<String, Boolean> elfinderIds=new HashMap<String, Boolean>();
	public static boolean isProtected(String id) throws ElFinderIdIsNotExistException {
		synchronized(elfinderIds) {
			if (elfinderIds.containsKey(id)) {
				System.out.println("get id="+id+" value="+elfinderIds.get(id));
				return elfinderIds.get(id);
			}else {
				throw new ElFinderIdIsNotExistException(id);
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
		try {
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/elfinder.min.css\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"elfinder/css/theme.css\">");
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.full.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/elfinder4efw.min.js\"></script>");
			if(!"".equals(lang)&&!"en".equals(lang)){
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elfinder/js/i18n/elfinder."+lang+".js\"></script>");
			}
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
				System.out.println("put id="+id+" value="+_protected);
			}
			if(_protected){
				pageContext.getSession().setAttribute("EFW_ELFINDER_HOME_"+id, home);
				pageContext.getSession().setAttribute("EFW_ELFINDER_READONLY_"+id, (readonly?"true":"false"));
			}else{
				pageContext.getSession().removeAttribute("EFW_ELFINDER_HOME_"+id);
				pageContext.getSession().removeAttribute("EFW_ELFINDER_READONLY_"+id);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="elFinder";
		home="";
		readonly=false;
		lang="en";
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
		}else if(name.equalsIgnoreCase("lang")){
			if(!"".equals(value)&&null!=value)lang=(String) value;
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
