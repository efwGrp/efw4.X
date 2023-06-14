/**** efw4.X Copyright 2019 efwGrp ****/
package efw.db;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map.Entry;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import efw.framework;
import efw.properties.PropertiesManager;

/**
 * データベース接続を管理するクラス。
 * @author Chang Kejun
 *
 */
public final class DatabaseManager {
	/**
	 * ネーミング操作の開始コンテキストの名称。
	 * 「java:comp/env」に固定。
	 */
	private static final String JAVA_INITCONTEXT_NAME="java:comp/env";
	
	
    public static Database getDatabase(){
    	try{
        	return (framework.getDatabases()).get(framework.getJdbcResourceName());
    	}catch(Exception e){
    		return null;
    	}
    }
    public static Database getDatabase(String jdbcResourceName){
    	try{
        	if(jdbcResourceName==null||"".equals(jdbcResourceName)){
        		return DatabaseManager.getDatabase();
        	}
        	return (framework.getDatabases()).get(jdbcResourceName);
    	}catch(Exception e){
    		return null;
    	}
    }
    
	/**
	 * フレームワークに利用するデータソースを初期化する。
	 * @throws NamingException データソース初期化失敗のエラー。
	 * @throws SQLException 
	 */
	public static void init() throws NamingException, SQLException{
        DatabaseManager.open();//jdbc/efwを初期化すると、設定間違いがある場合すぐキャッチできる
	}
	
	private static Boolean fromBatch=false;
	private static final HashMap<String,BatchDataSource> batchDataSources=new HashMap<String,BatchDataSource>();
	public static synchronized void initFromBatch(){
		fromBatch=true;
    	for (int idx=0;true;idx++){
        	String jdbcResource=PropertiesManager.EFW_JDBC_RESOURCE+(idx==0?"":"."+idx);
        	String url=PropertiesManager.EFW_JDBC_RESOURCE_URL+(idx==0?"":"."+idx);
        	String username=PropertiesManager.EFW_JDBC_RESOURCE_USERNAME+(idx==0?"":"."+idx);
        	String password=PropertiesManager.EFW_JDBC_RESOURCE_PASSWORD+(idx==0?"":"."+idx);
        	String jdbcResourceValue=PropertiesManager.getProperty(jdbcResource, "");
        	if(jdbcResourceValue!=null && !"".equals(jdbcResourceValue)){
        		BatchDataSource dataSource = new BatchDataSource();
        		String urlValue=PropertiesManager.getProperty(url, "");
        		String usernameValue=PropertiesManager.getProperty(username, "");
        		String passwordValue=PropertiesManager.getProperty(password, "");
        		dataSource.setUrl(urlValue);
        		dataSource.setUsername(usernameValue);
        		dataSource.setPassword(passwordValue);
        		batchDataSources.put(jdbcResourceValue, dataSource);
        	}else{
        		break;
        	}
    	}
	}
    ///////////////////////////////////////////////////////////////////////////
	/**
	 * フレームワーク用データソースからデータベース接続を取得する。
	 * @return データベース接続を戻す。
	 * @throws SQLException データベースアクセスエラー。
	 * @throws NamingException 
	 */
    public static void open() throws SQLException, NamingException{
    	DatabaseManager.open(framework.getJdbcResourceName());
    }
    /**
     * jdbcリソース名称によりデータベース接続を取得する。
     * @param jdbcResourceName jdbcリソース名称
     * @return　データベース接続を戻す。
     * @throws NamingException　名称不正のエラー。　
     * @throws SQLException　データベースアクセスエラー。
     */
    public static void open(String jdbcResourceName) throws NamingException, SQLException{
    	if (jdbcResourceName==null||"".equals(jdbcResourceName)){
    		jdbcResourceName=framework.getJdbcResourceName();
    	}
        DataSource ds;
		if(fromBatch){
			ds = batchDataSources.get(jdbcResourceName);
		}else{//from web
            if(jdbcResourceName.indexOf("java:")>-1){//if the jdbc resouce begins from [java:], it is full jndi name.
            	ds = (DataSource) new InitialContext().lookup(jdbcResourceName);
            }else{//or it begins by [java:comp/env/]
            	ds = (DataSource) new InitialContext().lookup(JAVA_INITCONTEXT_NAME+"/"+jdbcResourceName);
            }
		}
        Database db = new Database(ds.getConnection());
		if(framework.getDatabases()==null)
			framework.setDatabases(new HashMap<String,Database>());
		framework.getDatabases()
		.put(jdbcResourceName, db);
    }
    /**
     * すべてのデータベースを閉じる。
     * @throws SQLException 　データベースアクセスエラー。
     */
    public static void closeAll() throws SQLException{
		if(framework.getDatabases()==null)
			return;

		HashMap<String,Database> map=framework.getDatabases();
		for(Entry<String, Database> e : map.entrySet()) {
			Database db=e.getValue();
			db.close();
		}
		framework.removeDatabases();
    }
    /**
     * すべてのデータベースをコミット。
     * @throws SQLException
     */
    public static void commitAll() throws SQLException{
		if(framework.getDatabases()==null)
			return;

		HashMap<String,Database> map=framework.getDatabases();
		for(Entry<String, Database> e : map.entrySet()) {
			Database db=e.getValue();
			db.commit();
		}
    }
    
    public static void rollbackAll() throws SQLException{
		if(framework.getDatabases()==null) return;

		HashMap<String,Database> map=framework.getDatabases();
		for(Entry<String, Database> e : map.entrySet()) {
			Database db=e.getValue();
			db.rollback();
		}
    }

}
