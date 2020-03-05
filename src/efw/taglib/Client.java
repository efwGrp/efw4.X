/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.framework;
/**
 * Clientタグを処理するクラス。
 * <efw:Client/>
 * headタグ内に追加すれば、efwの基本機能を利用できる。
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public final class Client extends TagSupport implements DynamicAttributes {
	
	private String baseurl=".";
	private String mode="jquery-ui";
	private String theme="base";
	private String lang="en";//en cn jp
	public static final String EFW_I18N_LANG="EFW_I18N_LANG";
	/**
	 * タグ処理。
	 *efwの基本機能を利用するため、複数のcssとjsを取り込むタグを作成する。
	 */
	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		try {
			String v=framework.getVersion();
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/jquery.min.js?v="+v+"\"></script>\n");
			if("jquery-ui".equals(mode)){
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/jquery-ui/jquery-ui.structure.min.css?v="+v+"\">\n");
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/jquery-ui/themes/"+theme+"/theme.css?v="+v+"\">\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/jquery-ui/jquery-ui.min.js?v="+v+"\"></script>\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.dialog.jquery-ui.js?v="+v+"\"></script>\n");
			}else if("bootstrap".equals(mode)){
				out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/bootstrap/bootstrap.min.css?v="+v+"\">\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/bootstrap/bootstrap.bundle.min.js?v="+v+"\"></script>\n");
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.dialog.bootstrap.js?v="+v+"\"></script>\n");
			}
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\""+baseurl+"/efw/efw.css?v="+v+"\">\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/easytimer.min.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/js.cookie.min.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.messages.jsp?lang="+lang+"&v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.format.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.inputbehavior.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.client.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+baseurl+"/efw/efw.js?v="+v+"\"></script>\n");
			out.print("<script type=\"text/javascript\">\n");
			out.print("	efw.baseurl = \""+baseurl+"\";\n");
			out.print("	efw.lang = \""+lang+"\";\n");
			out.print("	efw.mode = \""+mode+"\";\n");
			if("jquery-ui".equals(mode))out.print("	efw.theme = \""+theme+"\";\n");
			out.print("</script>\n");
		} catch (IOException e) {
			e.printStackTrace();
		}
		//多国語対応のため、指定言語をattrに設定する。
		pageContext.setAttribute(Client.EFW_I18N_LANG, lang);
		
		baseurl=".";
		mode="jquery-ui";
		theme="base";
		lang="en";
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("baseurl")){
			baseurl=(String) value;
		}
		if(name.equalsIgnoreCase("mode")){
			mode=(String) value;
		}
		if(name.equalsIgnoreCase("theme")){
			theme=(String) value;
		}
		if(name.equalsIgnoreCase("lang")){
			lang=(String) value;
		}
		
	}
}
