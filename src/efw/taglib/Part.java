/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;

import efw.efwCorsFilter;
import efw.efwDoNotAsMainException;
import efw.framework;
/**
 * Partタグを処理するクラス。
 * <efw:Part path="myPage.jsp" param1="" param2=""/>
 * bodyタグに追加して、myPage.jspの出力をIncludeする。
 * @author Chang Kejun
 *
 */
public final class Part extends TagSupport implements DynamicAttributes {
	
	/**
	 * ページパス。
	 */
	private String path="";
	/**
	 * appURL。ローカルの場合設定不要。
	 */
	private String appurl="";
	/**
	 * shareSessions。共有するセッション情報。
	 */
	private String shareSessions="";
	
	public static final String EFW_PART_CALLING_TIME="EFW_PART_CALLING_TIME";
	public static final long EFW_PART_CALLING_TIMEOUT=30000;
	
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = Util.translateAttr(pageContext,path);
	}

	public String getAppurl() {
		return appurl;
	}

	public void setAppurl(String appurl) {
		this.appurl = Util.translateAttr(pageContext,appurl);
	}

	public String getShareSessions() {
		return shareSessions;
	}

	public void setShareSessions(String shareSessions) {
		this.shareSessions = Util.translateAttr(pageContext,shareSessions);
	}
	/**
	 * 設定された属性の配列。
	 */
	private ArrayList<String> attrs=new ArrayList<String>(); 
	
	
	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag() {
		try {
			//メインアプリ内の部品
			if ("".equals(appurl)) {
				pageContext.include(path,false);
			}else {
				//メインアプリからほかのサブアプリを呼び出す
				//メインアプリではないとサブアプリとの接続情報がないからエラーにする
				if (!efwCorsFilter.getAsMain()) {
					throw new efwDoNotAsMainException();
				}
			//サブ部品として実行する場合
				JspWriter out = pageContext.getOut();
				String partid=("part"+((new Random()).nextInt())).replace('-', '_');
				HashMap<String, String> mapAttrs=new HashMap<>();
				for(int i=0;i<attrs.size();i++) {
					String key=attrs.get(i);
					String value=(String)pageContext.getAttribute(key,PageContext.REQUEST_SCOPE);
					mapAttrs.put(key, value);
				}
				String lang=(String) pageContext.getAttribute(Client.EFW_I18N_LANG,PageContext.REQUEST_SCOPE);
				mapAttrs.put(Client.EFW_I18N_LANG,lang);
				
				//セッション情報の処理
				String aryShareSessions[]=shareSessions.split(",");
				HttpSession session=((HttpServletRequest)pageContext.getRequest()).getSession();
				HashMap<String,String> mapSession=new HashMap<>();
				for(int i=0;i<aryShareSessions.length;i++) {
					String key=aryShareSessions[i];
					String value=(String)session.getAttribute(key);
					key=Util.encode(key, appurl);
					value=Util.encode(value, appurl);
					mapSession.put(key, value);
				}
				String key=Util.encode(EFW_PART_CALLING_TIME, appurl);
				String value=Util.encode((new Date()).getTime()+"", appurl);
				mapSession.put(key, value);

				//外側のdivを付けて、そのdivにリモートのhtmlを設定する仕組み
				//部品内のefw呼び出しは、個別に定義しているappurlを利用するプログラムが必要。
				//部品内さらに別部品を呼び出す可能性がある。全部自動判断は難しいから。
				//部品呼びだしのパラメータは明文です。暗号化しない。
				//セッション伝達は暗号化する。
				out.print("<div id=\""+partid+"\"><script>"
						+ "$(function(){"
							+ "$.ajax({"
								+ "url:'"+appurl+"/partServlet',"
								+ "xhrFields:{withCredentials:true},"
								+ "type:'POST',"
								+ "cache:false,"
								+ "async:true,"
								+ "dataType:'html',"
								+ "data:"+Util.mapToJSON(mapSession)+","
								+ "success:function(h){"
									+ "$.ajax({"
										+ "url:'"+appurl+"/"+path+"?t='+new Date().getTime(),"
										+ "xhrFields:{withCredentials:true},"
										+ "type:'POST',"
										+ "cache:false,"
										+ "async:true,"
										+ "dataType:'html',"
										+ "data:"+Util.mapToJSON(mapAttrs)+","
										+ "success:function(h){"
											+ "$('#"+partid+"').replaceWith($(h));"
										+ "}"
									+ "})"
								+ "}"
							+ "})"
						+ "});"
						+ "</script></div>");
			}
			for(int i=0;i<attrs.size();i++){
				pageContext.removeAttribute(attrs.get(i));
			}
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			ex.printStackTrace();
		}
		path="";
		appurl="";
		return SKIP_BODY;
	}
	
	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		pageContext.setAttribute(name, Util.translateAttr(pageContext,(String)value),PageContext.REQUEST_SCOPE);
		attrs.add(name);
	}

}
