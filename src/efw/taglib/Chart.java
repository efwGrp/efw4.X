/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;
/**
 * Chartタグを処理するクラス。
 * <efw:Chart id="" type="" height="" width="" data="" version="" setoptions=""/>
 * @author Chang Kejun
 *
 */
public final class Chart extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="chart";
	private String type="column";
	private String height="400";
	private String width="auto";
	private String data="";
	private String version="current";
	private String setoptions="null";
	private String mode="googlechart";
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = Util.translateAttr(pageContext,id);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = Util.translateAttr(pageContext,type);
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

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = Util.translateAttr(pageContext,data);
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = Util.translateAttr(pageContext,version);
	}

	public String getSetoptions() {
		return setoptions;
	}

	public void setSetoptions(String setoptions) {
		this.setoptions = Util.translateAttr(pageContext,setoptions);
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = Util.translateAttr(pageContext,mode);
	}

	private HashMap<String, String> attrs=new HashMap<String, String>();

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		JspWriter out;
		try {
			String v=framework.version;
			out = pageContext.getOut();
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			if ("googlechart".equals(mode)) {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"https://www.gstatic.com/charts/loader.js\"></script>");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"efw/efw.chart.googlechart.js?v="+v+"\"></script>");
				out.print("<div id=\""+id+"\" style=\"width:"+width+";height:"+height+";\" "+temp+"></div>");
				out.print("<script>"
						+ "var "+id+";"
						+ "$(function(){"+id+"=new EfwClientChartGL(\""+id+"\",\""+data+"\",\""+type+"\",\""+version+"\","+setoptions+");"+id+".draw();});</script>");
			}else if ("chartjs".equals(mode)) {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"chart/Chart.min.js?v="+v+"\"></script>");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"efw/efw.chart.chartjs.js?v="+v+"\"></script>");
				out.print("<div id=\""+id+"\" style=\"width:"+width+";height:"+height+";\" "+temp+"><canvas></canvas></div>");
				out.print("<script>"
						+ "var "+id+";"
						+ "$(function(){"+id+"=new EfwClientChartJS(\""+id+"\",\""+data+"\",\""+type+"\",\""+version+"\","+setoptions+");"+id+".draw();});</script>");
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
		setoptions="null";
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
		attrs.put(name, Util.translateAttr(pageContext,(String)value));
	}

}
