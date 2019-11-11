/**** efw4.X Copyright 2019 efwGrp ****/
package efw.sql;

import java.util.Date;
import java.util.HashMap;

@SuppressWarnings("serial")
final class SqlHashMap extends HashMap<String, Sql> {
	private Date lastModifytime=null;

	protected Date getLastModifytime() {
		return lastModifytime;
	}

	protected void setLastModifytime(Date lastModifytime) {
		this.lastModifytime = lastModifytime;
	}
}
