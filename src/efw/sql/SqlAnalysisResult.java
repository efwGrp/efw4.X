package efw.sql;

import java.util.ArrayList;

public final class SqlAnalysisResult {
	private String sqlString;
	private ArrayList<Object> sqlParams;
	public String getSqlString() {
		return sqlString;
	}
	protected void setSqlString(String sqlString) {
		this.sqlString = sqlString;
	}
	public ArrayList<Object> getSqlParams() {
		return sqlParams;
	}
	protected void setSqlParams(ArrayList<Object> sqlParams) {
		this.sqlParams = sqlParams;
	}
}
