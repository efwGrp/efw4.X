/**** efw4.X Copyright 2025 efwGrp ****/
package efw.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;

import javax.script.ScriptException;

import efw.efwException;
import efw.framework;
import efw.sql.Sql;
import efw.sql.SqlAnalysisResult;
import efw.sql.SqlManager;

/**
 * データーベースに対する操作を行うクラス。
 * @author Chang Kejun
 */
public final class Database {
	/**
	 * データベースの接続。
	 */
	private Connection mConn;
	/**
	 * java.sql.Connectionを取得する。他システム連携用。
	 * @return データベースの接続。
	 */
	public Connection getConnection() {
		return mConn;
	}
	/**
	 * SQL実行するステートメントを格納する配列。
	 */
	private ArrayList<CallableStatement> mStmtAry;
	/**
	 * java.sql.CallableStatementを取得する。他システム連携用。
	 * @return SQL実行するステートメントを格納する配列。
	 */
	public ArrayList<CallableStatement> getCallableStatements(){
		return mStmtAry;
	}
	/**
	 * DatabaseManagerのopenにより初期化される。直接新規作成をしない。
	 * @param mConn データベース接続。
	 * @throws SQLException SQLエラー。
	 */
    protected Database(Connection mConn) throws SQLException {
    	this.mConn=mConn;
    	this.mConn.setAutoCommit(false);
    	mStmtAry=new ArrayList<CallableStatement>();
    }
    /**
     * 単一の ResultSetオブジェクトを返すSqlを実行する。
     * 
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @return　指定されたクエリーによって作成されたデータを含む ResultSet オブジェクト。null にはならない。
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException SQLエラー。
     * @throws ScriptException スクリプトエラー。
     */
    public ResultSet executeQuery(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException, ScriptException{
    	try {
    		Sql sql=SqlManager.get(groupId, sqlId);
    		SqlAnalysisResult sqlAnalysisResult=sql.analyze(params);
    		String sqlString=sqlAnalysisResult.getSqlString();
    		ArrayList<Object> sqlParams=sqlAnalysisResult.getSqlParams();
    		framework.databaseLog(groupId, sqlId, sqlString, sqlParams);
    	    CallableStatement mStmt = mConn.prepareCall(sqlString);//これはfinallyで閉じることはできない。
    	    mStmtAry.add(mStmt);
    	    setSQLParams(mStmt, sqlParams);
    	    ResultSet rs = mStmt.executeQuery();
    	    return rs;
    	} catch (efwException e){
    		throw e;
    	} catch (ScriptException e){
    		throw e;
    	} catch (SQLException e){
    		throw e;
		}
	}
    /**
     * クエリを閉じる
     * 必ず必要ではない。データベースを閉じる際、クエリは閉じられる。
     * ただし、大量クエリ（数百回）が発生する場合、リソースのためクエリを閉じる必要。
     * @throws SQLException SQLエラー。
     */
    public void closeQuery() throws SQLException{
        try{
             if (!mConn.isClosed()) {
                 if (null != mStmtAry) {
                     if (mStmtAry.size() > 0) {
                    	 CallableStatement mStmt = mStmtAry.get(mStmtAry.size()-1);
                         mStmt.close();
                         mStmtAry.remove(mStmtAry.size()-1);
                     }
                 }
             }
        }catch(SQLException e){
           throw e;
        }
     }    
    /**
     * INSERT文、UPDATE文、DELETE文を実行する。
     * @param groupId　Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params　Sqlに利用される引数を格納するマップ。
     * @return　実行された行数を戻す。 
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException SQLエラー。
     * @throws ScriptException スクリプトエラー。
     */
    public int executeUpdate(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException, ScriptException{
    	CallableStatement mStmt=null;
    	try{
        	Sql sql=SqlManager.get(groupId, sqlId);
    		SqlAnalysisResult sqlAnalysisResult=sql.analyze(params);
    		String sqlString=sqlAnalysisResult.getSqlString();
    		ArrayList<Object> sqlParams=sqlAnalysisResult.getSqlParams();
        	framework.databaseLog(groupId, sqlId, sqlString, sqlParams);
            mStmt = mConn.prepareCall(sqlString);
            setSQLParams(mStmt, sqlParams);
            int cnt = mStmt.executeUpdate();
            
            return cnt;
    	}catch(efwException e){
    		throw e;
    	}catch(SQLException e){
    		throw e;
    	}catch (ScriptException e){
    		throw e;
		}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * 任意のSQL文を実行する。
     * @param groupId Sqlを外部化するXMLのファイル名（拡張子を除く）。
     * @param sqlId SqlXMLファイルのsqlタグに定義されるId。
     * @param params Sqlに利用される引数を格納するマップ。
     * @throws efwException フレームワークの実行時エラー。
     * @throws SQLException SQLエラー。
     * @throws ScriptException スクリプトエラー。
     */
    public void execute(String groupId,String sqlId,Map<String,Object> params) throws efwException, SQLException, ScriptException{
    	CallableStatement mStmt=null;
    	try{
        	Sql sql=SqlManager.get(groupId, sqlId);
    		SqlAnalysisResult sqlAnalysisResult=sql.analyze(params);
    		String sqlString=sqlAnalysisResult.getSqlString();
    		ArrayList<Object> sqlParams=sqlAnalysisResult.getSqlParams();
        	framework.databaseLog(groupId, sqlId, sqlString, sqlParams);
            mStmt = mConn.prepareCall(sqlString);
            setSQLParams(mStmt, sqlParams);
            mStmt.execute();
    	}catch(efwException e){
    		throw e;
    	}catch(SQLException e){
    		throw e;
    	}catch(ScriptException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * データベースへの更新を無効とし、 データベース接続が保持するデータベースロックをすべて解除する。
     * @throws SQLException SQLエラー。
     */
    public void rollback() throws SQLException{
    	try{
            if (null != mConn) {
                if (!mConn.isClosed()) {
                    mConn.rollback();
                }
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * データベースへの更新を有効とし、 データベース接続が保持するデータベースロックをすべて解除する。
     * @throws SQLException SQLエラー。
     */
    public void commit() throws SQLException{
    	try{
            if (null != mConn) {
                if (!mConn.isClosed()) {
                    mConn.commit();
                }
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * ステートメントを全部閉じて、データベース接続をコミットして、閉じる。
     * @throws SQLException SQLエラー。
     */
    public void close() throws SQLException{
    	try{
            if (!mConn.isClosed()) {
                if (null != mStmtAry) {
                    CallableStatement mStmt = null;
                    for (int i=0; i<mStmtAry.size(); i++) {
                        mStmt = mStmtAry.get(i);
                        mStmt.close();
                    }
                    while (mStmtAry.size() > 0) {
                        mStmtAry.remove(0);
                    }
                    mConn.commit();
                }
                mConn.close();
            }
    	}catch(SQLException e){
    		throw e;
    	}
    }
    /**
     * Sqlパラメータを配列から設定する。
     * @param mStmt ステートメント。
     * @param prms 配列に格納するパラメータ。
     * @throws SQLException SQLエラー。
     */
    private void setSQLParams(CallableStatement mStmt, ArrayList<Object> prms) throws SQLException {
        if (null != prms) {
        	StringBuffer bf=new StringBuffer();
            for (int i=0; i<prms.size(); i++) {
            	if (i>0)bf.append(",");
            	Object vl=prms.get(i);
            	if(vl!=null){
            		if("java.sql.Timestamp".equals(vl.getClass().getName())){
                        mStmt.setTimestamp(i+1, (Timestamp)vl);
            		}else{
                        mStmt.setObject(i+1, vl);
            		}
            	}else{
                    mStmt.setObject(i+1, vl);
            	}
            	bf.append(vl);
            }
        }
    }
    
    
    /**
     * 単一の ResultSetオブジェクトを返すSqlを直接実行する。
     * 
     * @param sql 実行されるsql。
     * @return ResultSet オブジェクト。null にはならない。
     * @throws SQLException SQLエラー。
     */
    public ResultSet executeQuerySql(String sql) throws SQLException{
    	try{
        	framework.databaseLog(sql);
    	    CallableStatement mStmt = mConn.prepareCall(sql);
    	    mStmtAry.add(mStmt);
    	    ResultSet rs = mStmt.executeQuery();
    	    return rs;
    	}catch(SQLException e){
    		throw e;
    	}
	}
    /**
     * INSERT文、UPDATE文、DELETE文を直接実行する。
     * @param sql SQL文。
     * @return データ行数。 
     * @throws SQLException SQLエラー。
     */
    public int executeUpdateSql(String sql) throws SQLException{
    	CallableStatement mStmt=null;
    	try{
        	framework.databaseLog(sql);
            mStmt = mConn.prepareCall(sql);
            int cnt = mStmt.executeUpdate();
            
            return cnt;
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }
    /**
     * 任意のSQL文を直接実行する。
     * @param sql SQL文。
     * @throws SQLException SQLエラー。
     */
    public void executeSql(String sql) throws SQLException{
    	CallableStatement mStmt=null;
    	try{
        	framework.databaseLog(sql);
            mStmt = mConn.prepareCall(sql);
            mStmt.execute();
    	}catch(SQLException e){
    		throw e;
    	}finally{
    		if(mStmt!=null)mStmt.close();
    	}
    }    
}
