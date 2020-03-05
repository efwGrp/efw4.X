package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;

@SuppressWarnings("serial")
public final class JExcel extends TagSupport implements DynamicAttributes {

	/**
	 */
	private String id="jExcel";
	private boolean readonly=false;
	private String height="auto";
	private String width="auto";
	private HashMap<String, String> attrs=new HashMap<String, String>();

	@Override
	public int doStartTag(){
		if (this.getId()!=null){
			id=this.getId();
		}
		JspWriter out;
		String lang=(String) pageContext.getAttribute(Client.EFW_I18N_LANG);
		if ("".equals(lang)||lang==null)lang="en";
		try {
			String v=framework.getVersion();
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"jexcel/css/jexcel.min.css?v="+v+"\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"jexcel/css/jsuites.min.css?v="+v+"\">");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"jexcel/js/jexcel.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"jexcel/js/jsuites.min.js?v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"jexcel/js/jexcel.messages.jsp?lang="+lang+"&v="+v+"\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#"+id+"\")"
					+ ".jexcel({"
					+ "text:jexcel_messages,"//multi languages
					+ "minDimensions:[10,10],"
					+ "tableOverflow:true,"
					+ "});});");
			out.print("</script>");
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			out.print("<div "+"id=\""+id+"\" "+temp+"></div>");
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="jExcel";
		readonly=false;
		height="auto";
		width="auto";
		attrs=new HashMap<String, String>();
		return SKIP_BODY;
	}

	@Override
	public void setDynamicAttribute(String uri, String name, Object value) 
			throws JspException {
		if(name.equalsIgnoreCase("id")){
			id=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("readonly")){
			if(((String) value).equalsIgnoreCase("true")){
				readonly=true;
			}
		}else{
			attrs.put(name, (String)value);
		}		
	}

}
