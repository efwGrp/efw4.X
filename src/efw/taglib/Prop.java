/**** efw4.X Copyright 2019 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import efw.properties.PropertiesManager;
/**
 * Propタグを処理するクラス。
 * &lt;efw:Prop key="mykey" default=""/&gt;
 * @author kejun.chang
 *
 */
public final class Prop extends TagSupport{

	private String key = "";
	private String defaultValue=null;
	/**
	 * キーを取得する。
	 * @return キー。
	 */
	public String getKey() {
		return key;
	}
	/**
	 * キーを設定する。
	 * @param key キー。
	 */
	public void setKey(String key) {
		this.key = Util.translateAttr(pageContext,key);
	}
	/**
	 * 初期値を取得する。
	 * @return 初期値。
	 */
	public String getDefault() {
		return defaultValue;
	}
	/**
	 * 初期値を設定する。
	 * @param defaultValue 初期値。
	 */
	public void setDefault(String defaultValue) {
		this.defaultValue = Util.translateAttr(pageContext,defaultValue);
	}

	/**
	 * タグを実行する。
	 * @return SKIP_BODY。
	 */
	@Override
	public int doStartTag(){
		JspWriter out = pageContext.getOut();
		
		try {
			if (defaultValue==null)defaultValue=key;
			out.print(PropertiesManager.getProperty(key, defaultValue));
		} catch (IOException e) {
			e.printStackTrace();
		}
		key = "";
		defaultValue = null;
		return SKIP_BODY;
	}
}
