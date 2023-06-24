/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;
/**
 * Clientタグを処理するクラス。<br>
 * &lt;efw:Client lang="jp" mode="jquery-ui" theme="base" baseurl="." nopromise="false"/&gt;<br>
 * &lt;efw:Client lang="jp" mode="bootstrap" major="4"/&gt;<br>
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
	/**
	 * ベースURLを取得する。
	 * @return ベースURL。
	 */
	public String getBaseurl() {
		return baseurl;
	}
	/**
	 * ベースURLを設定する。
	 * @param baseurl ベースURL。
	 */
	public void setBaseurl(String baseurl) {
		this.baseurl = Util.translateAttr(pageContext,baseurl);
	}
	/**
	 * モードを取得する。
	 * @return モード。
	 */
	public String getMode() {
		return mode;
	}
	/**
	 * モードを設定する。
	 * @param mode モード。
	 */
	public void setMode(String mode) {
		this.mode = Util.translateAttr(pageContext,mode);
	}
	/**
	 * jquery-uiシーマを取得する。
	 * @return jquery-uiシーマ。
	 */
	public String getTheme() {
		return theme;
	}
	/**
	 * jquery-uiシーマを設定する。
	 * @param theme jquery-uiシーマ。
	 */
	public void setTheme(String theme) {
		this.theme = Util.translateAttr(pageContext,theme);
	}
	/**
	 * 言語を取得する。
	 * @return 言語。
	 */
	public String getLang() {
		return lang;
	}
	/**
	 * 言語を設定する。
	 * @param lang 言語。
	 */
	public void setLang(String lang) {
		this.lang = Util.translateAttr(pageContext,lang);
	}
	/**
	 * bootstrapメージャーを取得する。
	 * @return bootstrapメージャー。
	 */
	public String getMajor() {
		return major;
	}
	/**
	 * bootstrapメージャーを設定する。
	 * @param major bootstrapメージャー。
	 */
	public void setMajor(String major) {
		this.major = Util.translateAttr(pageContext,major);
	}
	/**
	 * promiseサポート無しフラグを取得する。
	 * @return promiseサポート無しフラグ。
	 */
	public String getNopromise() {
		return nopromise;
	}
	/**
	 * promiseサポート無しフラグを設定する。
	 * @param nopromise promiseサポート無しフラグ。
	 */
	public void setNopromise(String nopromise) {
		this.nopromise = Util.translateAttr(pageContext,nopromise);
	}
	/**
	 * リクエストに言語を記録する属性名。
	 */
	public static final String EFW_I18N_LANG="EFW_I18N_LANG";
	/**
	 * タグを実行する。
	 * efwの基本機能を利用するため、複数のcssとjsをhtmlに取り込む。
	 * @return SKIP_BODY。
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
