/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;
/**
 * Clientタグを処理するクラス。
 * <efw:Client/>
 * headタグ内に追加すれば、efwの基本機能を利用できる。
 * @author Chang Kejun
 *
 */
public final class Client extends TagSupport{

	private String baseurl=".";
	private String mode="jquery-ui";
	private String theme="base";
	private String lang="en";//en cn jp
	private String major="4";
	private String nopromise="false";
	
	public String getBaseurl() {
		return baseurl;
	}

	public void setBaseurl(String baseurl) {
		this.baseurl = Util.translateAttr(pageContext,baseurl);
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = Util.translateAttr(pageContext,mode);
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = Util.translateAttr(pageContext,theme);
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = Util.translateAttr(pageContext,lang);
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = Util.translateAttr(pageContext,major);
	}
	
	public String getNopromise() {
		return nopromise;
	}

	public void setNopromise(String nopromise) {
		this.nopromise = Util.translateAttr(pageContext,nopromise);
	}
	
	public static final String EFW_I18N_LANG="EFW_I18N_LANG";
	/**
	 * タグ処理。
	 *efwの基本機能を利用するため、複数のcssとjsを取り込むタグを作成する。
	 */
	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		try {
			String v=framework.version;
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/jquery.min.js?v="+v+"\"></script>\n");
			if("jquery-ui".equals(mode)){
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/jquery-ui/jquery-ui.structure.min.css?v="+v+"\">\n");
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/jquery-ui/themes/"+theme+"/theme.css?v="+v+"\">\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/jquery-ui/jquery-ui.min.js?v="+v+"\"></script>\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.dialog.jquery-ui.js?v="+v+"\"></script>\n");
			}else if("bootstrap".equals(mode)){
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/bootstrap/"+major+"/css/bootstrap.min.css?v="+v+"\">\n");
				if ("4".equals(major)||"5".equals(major)){//4 5
					out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/bootstrap/"+major+"/js/bootstrap.bundle.min.js?v="+v+"\"></script>\n");
				}else {//3 2
					out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/bootstrap/"+major+"/js/bootstrap.min.js?v="+v+"\"></script>\n");
				}
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.dialog.bootstrap.js?v="+v+"\"></script>\n");
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/bootstrap/icons/bootstrap-icons.css?v="+v+"\">\n");
			}
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/efw/efw.css?v="+v+"\">\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/easytimer.min.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/js.cookie.min.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.messages.jsp?lang="+lang+"&v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.format.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.inputbehavior.js?v="+v+"\"></script>\n");
			if ("true".equals(nopromise)) {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.nopromise.js?v="+v+"\"></script>\n");
			}else {
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.js?v="+v+"\"></script>\n");
			}
			
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\">\n");
			out.print("	efw.baseurl = \""+baseurl+"\";\n");
			out.print("	efw.lang = \""+lang+"\";\n");
			out.print("	efw.mode = \""+mode+"\";\n");
			if("jquery-ui".equals(mode)){
				out.print("	efw.theme = \""+theme+"\";\n");
			}else if("bootstrap".equals(mode)){
				out.print("	efw.major = \""+major+"\";\n");
			}
			out.print("</script>\n");
		} catch (IOException e) {
			e.printStackTrace();
		}
		//多国語対応のため、指定言語をattrに設定する。
		pageContext.setAttribute(Client.EFW_I18N_LANG, lang,PageContext.REQUEST_SCOPE);
		
		baseurl=".";
		mode="jquery-ui";
		theme="base";
		lang="en";
		major="4";
		nopromise="false";
		return SKIP_BODY;
	}
}
