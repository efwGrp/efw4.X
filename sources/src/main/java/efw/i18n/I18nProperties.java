/**** efw4.X Copyright 2025 efwGrp ****/
package efw.i18n;

import java.util.Date;
import java.util.Properties;
/**
 * 多言語プロパティを表すクラス。
 * @author kejun.chang
 *
 */
public final class I18nProperties extends Properties {
	/**
	 * ダミーコンストラクタ
	 */
	public I18nProperties(){super();}
	/**
	 * 多言語XMLファイルの最終編集日時
	 */
	private Date lastModifytime=null;

	protected Date getLastModifytime() {
		return lastModifytime;
	}

	protected void setLastModifytime(Date lastModifytime) {
		this.lastModifytime = lastModifytime;
	}
	
}
