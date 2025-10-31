/**** efw4.X Copyright 2025 efwGrp ****/
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
 * &lt;efw:Chart id="chart1" mode="googlechart" type="column" height="400" width="auto" data="mytable1" version="current" setoptions="func1"/&gt;
 * @author Chang Kejun
 *
 */
public final class Chart extends TagSupport implements DynamicAttributes {
	/**
	 * ダミーコンストラクタ
	 */
	public Chart(){super();}
	/**
	 * チャートのID
	 */
	private String id="chart";
	/**
	 * チャートのタイプ
	 */
	private String type="column";
	/**
	 * 高さ
	 */
	private String height="400";
	/**
	 * 幅
	 */
	private String width="auto";
	/**
	 * データテーブルID
	 */
	private String data="";
	/**
	 * googlechartバージョン
	 */
	private String version="current";
	/**
	 * オプション設定関数名
	 */
	private String setoptions="null";
	/**
	 * チャートモード
	 */
	private String mode="googlechart";
	/**
	 * ChartのIDを取得する。
	 * @return ChartのID。
	 */
	public String getId() {
		return id;
	}
	/**
	 * ChartのIDを設定する。
	 * @param id ChartのID。
	 */
	public void setId(String id) {
		this.id = Util.translateAttr(pageContext,id);
	}
	/**
	 * チャートのタイプを取得する。
	 * @return チャートのタイプ。
	 */
	public String getType() {
		return type;
	}
	/**
	 * チャートのタイプを設定する。
	 * @param type チャートのタイプ。
	 */
	public void setType(String type) {
		this.type = Util.translateAttr(pageContext,type);
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
	 * データテーブルIDを取得する。
	 * @return データテーブルID。
	 */
	public String getData() {
		return data;
	}
	/**
	 * データテーブルIDを設定する。
	 * @param data データテーブルID。
	 */
	public void setData(String data) {
		this.data = Util.translateAttr(pageContext,data);
	}
	/**
	 * googlechartバージョンを取得する。
	 * @return googlechartバージョン。
	 */
	public String getVersion() {
		return version;
	}
	/**
	 * googlechartバージョンを設定する。
	 * @param version googlechartバージョン。
	 */
	public void setVersion(String version) {
		this.version = Util.translateAttr(pageContext,version);
	}
	/**
	 * オプション設定関数名を取得する。
	 * @return オプション設定関数名。
	 */
	public String getSetoptions() {
		return setoptions;
	}
	/**
	 * オプション設定関数名を設定する。
	 * @param setoptions オプション設定関数名。
	 */
	public void setSetoptions(String setoptions) {
		this.setoptions = Util.translateAttr(pageContext,setoptions);
	}
	/**
	 * チャートモードを取得する。
	 * @return チャートモード。
	 */
	public String getMode() {
		return mode;
	}
	/**
	 * チャートモードを設定する。
	 * @param mode チャートモード。
	 */
	public void setMode(String mode) {
		this.mode = Util.translateAttr(pageContext,mode);
	}
	/**
	 * 動的パラメータを格納するマップ
	 */
	private HashMap<String, String> attrs=new HashMap<String, String>();

	/**
	 * タグを実行する。
	 * @return SKIP_BODY。
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
	 * @param uri 名称空間。
	 * @param name 属性名。
	 * @param value 属性値。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		attrs.put(name, Util.translateAttr(pageContext,(String)value));
	}

}
