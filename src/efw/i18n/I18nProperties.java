/**** efw4.X Copyright 2019 efwGrp ****/
package efw.i18n;

import java.util.Date;
import java.util.Properties;

@SuppressWarnings("serial")
public final class I18nProperties extends Properties {
	private Date lastModifytime=null;

	protected Date getLastModifytime() {
		return lastModifytime;
	}

	protected void setLastModifytime(Date lastModifytime) {
		this.lastModifytime = lastModifytime;
	}
	
}
