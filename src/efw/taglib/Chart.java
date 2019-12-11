/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * Chartタグを処理するクラス。
 * <efw:Chart id="" type="" height="" width="" data="" version="" setoptions=""/>
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public final class Chart extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="chart";
	private String type="column";
	private String height="400";
	private String width="auto";
	private String data="";
	private String version="current";
	private String setOptions="null";
	private String mode="googlechart";
	private HashMap<String, String> attrs=new HashMap<String, String>();

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
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			if ("googlechart".equals(mode)) {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"https://www.gstatic.com/charts/loader.js\"></script>");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"efw/efw.chart.googlechart.js\"></script>");
				out.print("<div id=\""+id+"\" style=\"width:"+width+";height:"+height+";\" "+temp+"></div>");
				out.print("<script>"
						+ "var "+id+";"
						+ "$(function(){"+id+"=new EfwClientChartGL(\""+id+"\",\""+data+"\",\""+type+"\",\""+version+"\","+setOptions+");"+id+".draw();});</script>");
			}else if ("chartjs".equals(mode)) {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"chart/Chart.min.js\"></script>");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"efw/efw.chart.chartjs.js\"></script>");
				out.print("<div id=\""+id+"\" style=\"width:"+width+";height:"+height+";\" "+temp+"><canvas></canvas></div>");
				out.print("<script>"
						+ "var "+id+";"
						+ "$(function(){"+id+"=new EfwClientChartJS(\""+id+"\",\""+data+"\",\""+type+"\",\""+version+"\","+setOptions+");"+id+".draw();});</script>");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="chart";
		type="column";
		height="400";
		width="auto";
		data="";
		version="current";
		setOptions="null";
		mode="googlechart";
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
		}else if(name.equalsIgnoreCase("type")){
			type=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("data")){
			data=(String) value;
		}else if(name.equalsIgnoreCase("version")){
			version=(String) value;
		}else if(name.equalsIgnoreCase("setOptions")){
			setOptions=(String) value;
		}else if(name.equalsIgnoreCase("mode")){
			mode=(String) value;
		}else{
			attrs.put(name, (String)value);
		}
	}

}
