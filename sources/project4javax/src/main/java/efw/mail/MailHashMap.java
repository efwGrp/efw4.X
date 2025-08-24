/**** efw4.X Copyright 2025 efwGrp ****/
package efw.mail;

import java.util.Date;
import java.util.HashMap;

final class MailHashMap extends HashMap<String, Mail> {
	private Date lastModifytime=null;

	protected Date getLastModifytime() {
		return lastModifytime;
	}

	protected void setLastModifytime(Date lastModifytime) {
		this.lastModifytime = lastModifytime;
	}
	private boolean isFromResource=false;
	protected boolean getIsFromResource() {
		return isFromResource;
	}
	protected void setIsFromResource(boolean isFromResource) {
		this.isFromResource=isFromResource;
	}
}
