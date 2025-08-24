/**** efw4.X Copyright 2025 efwGrp ****/
package efw.sql;

import java.util.ArrayList;
/**
 * SQL定義分析結果を表すクラス。
 * @author kejun.chang
 *
 */
public final class SqlAnalysisResult {
	/**
	 * ダミーコンストラクタ
	 */
	public SqlAnalysisResult(){super();}
	
	private String sqlString;
	private ArrayList<Object> sqlParams;
	/**
	 * 文字列のSQL文を取得する。
	 * @return 文字列のSQL文。
	 */
	public String getSqlString() {
		return sqlString;
	}
	protected void setSqlString(String sqlString) {
		this.sqlString = sqlString;
	}
	/**
	 * SQLパラメータ配列を取得する。
	 * @return SQLパラメータ配列。
	 */
	public ArrayList<Object> getSqlParams() {
		return sqlParams;
	}
	protected void setSqlParams(ArrayList<Object> sqlParams) {
		this.sqlParams = sqlParams;
	}
}
