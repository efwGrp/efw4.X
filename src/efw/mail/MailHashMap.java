/**** efw4.X Copyright 2019 efwGrp ****/
package efw.mail;

import java.util.Date;
import java.util.HashMap;

@SuppressWarnings("serial")
final class MailHashMap extends HashMap<String, Mail> {
	private Date lastModifytime=null;

	protected Date getLastModifytime() {
		return lastModifytime;
	}

	protected void setLastModifytime(Date lastModifytime) {
		this.lastModifytime = lastModifytime;
	}
	
}
