/**** efw4.X Copyright 2019 efwGrp ****/
package efw.sql;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import efw.XMLFileIsNotExistsException;
import efw.XMLFileIsNotLegalException;
import efw.XMLTagIdIsDuplicateException;
import efw.XMLTagIdIsNotExistsException;
import efw.XMLTagIsNotLegalException;
import efw.efwException;
import efw.framework;
/**
 * SQL定義XMLファイルを管理するクラス。
 * @author Chang Kejun
 *
 */
public final class SqlManager {
	/**
	 * ひとつのSQL定義を取得する。
	 * デバッグモードの場合、最終更新日時により再ロードするか否か判断する。
	 * 通常モードの場合、予めロード済みデータから、Sqlオブジェクトを探す。
	 * @param groupId SQL定義XMLファイル名（拡張子を除く）。
	 * @param sqlId SQL定義ID。
	 * @return SQLオブジェクト。
	 * @throws efwException SQL定義取得エラー。
	 */
	public static Sql get(String groupId,String sqlId) throws efwException{
		//get group
		SqlHashMap group;
		if ((group=groups.get(groupId))==null){
			synchronized(groups){
				if ((group=groups.get(groupId))==null){
					load(groupId);
					group=groups.get(groupId);
				}
			}
		}else if (framework.getIsDebug()){
			if (checkModifyTime(groupId)){
				synchronized(groups){
					if (checkModifyTime(groupId)){
						groups.remove(groupId);
						load(groupId);
						group=groups.get(groupId);
					}
				}
			}
		}
		//if group is not exists, it is wrong group id
		if (group==null){
			throw new XMLFileIsNotExistsException("sql",groupId);
		}else{
			//get sql
			Sql sql=group.get(sqlId);
			//if sql is not exists, it is wrong sql id
			if(sql==null){
				throw new XMLTagIdIsNotExistsException("sql",groupId,sqlId);
			}else{
				return sql;
			}
		}
	}
	/**
	 * 予めロード済みデータのSqlオブジェクトの最終更新日時は、実ファイルと同じか否かをチェックする。
	 * @param groupId Sql外部化XMLファイルのファイル名（拡張子を除く）。
	 * @return 最終更新日時が変更なしの場合 true　。
	 */
	private static boolean checkModifyTime(String groupId){
		SqlHashMap group=groups.get(groupId);
		if (group==null){
			return true;//xml file is not in memory,so it is need to reload
		}else if (group.getIsFromResource()) {
			return false;//リソース取得の場合更新日チェック不要
		}else{
			Date fileLastModifytime = new Date(new File(framework.getSqlFolder()+"/"+groupId+".xml").lastModified());
			if(!fileLastModifytime.equals(group.getLastModifytime())){
				return true;//xml file is modified, so it is need to reload
			}else{
				return false;//xml file is not modified
			}
		}
	}
	/**
	 * アプリのxmlをパッケージした場合、そのxmlをロードするための関数。
	 * ほかのケースの利用を推薦しない。
	 * @param groupId MailテンプレートXMLファイルのファイル名（拡張子を除く）。
	 * @param path jarファイル内のパス。
	 * @throws efwException メール定義エラー。
	 */
	public static void loadFromResource(String groupId,String path) throws efwException {
		try (InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(path);
			BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
			SqlHashMap group=new SqlHashMap();
			group.setIsFromResource(true);//リソース取得の意味
			group.setLastModifytime(null);//この場合更新日を保管しない
			//add a new map by file name in aryData 
			groups.put(groupId,group);
			//read xml to get Mails 
			NodeList sqls;
			try {
				sqls = DocumentBuilderFactory.newInstance().newDocumentBuilder()
									.parse(is)
									.getDocumentElement()
									.getElementsByTagName("sql");
			} catch (SAXException e) {
				throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
			} catch (IOException e) {
				throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
			} catch (ParserConfigurationException e) {
				throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
			}

			//get sql from element
			for(int i=0;i<sqls.getLength();i++){
				Node node = sqls.item(i);
				if (node.getNodeType() == Node.ELEMENT_NODE){
					Element element= (Element)node;
					String sqlId=element.getAttribute("id");
					if (group.get(sqlId)==null){
						try {
							group.put(sqlId, new Sql(element));
						}catch(Exception e) {
							throw new XMLTagIsNotLegalException("sql",groupId,sqlId,e.getMessage());
						}
					}else{
						throw new XMLTagIdIsDuplicateException("sql",groupId,sqlId);
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	/**
	 * Sql外部化XMLファイルのファイル名によりロードする。
	 * @param groupId Sql外部化XMLファイルのファイル名（拡張子を除く）。
	 */
	///////////////////////////////////////////////////////////////////////////
	private static void load(String groupId) throws efwException{
		String filename=framework.getSqlFolder()+"/"+groupId+".xml";
		File fl=new File(filename);
		if (!fl.exists()) return;//ファイルが存在しない場合、なにもしない。
		
		Date lastModifytime=new Date(fl.lastModified());
		SqlHashMap group=new SqlHashMap();
		group.setLastModifytime(lastModifytime);
		//add a new map by file name in aryData 
		groups.put(groupId,group);
		//read xml to get Sqls 
		NodeList sqls;
		try {
			sqls = DocumentBuilderFactory.newInstance().newDocumentBuilder()
								.parse(fl)
								.getDocumentElement()
								.getElementsByTagName("sql");
		} catch (SAXException e) {
			throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
		} catch (IOException e) {
			throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
		} catch (ParserConfigurationException e) {
			throw new XMLFileIsNotLegalException("sql",groupId,e.getMessage());
		}
		//get sql from element
		for(int i=0;i<sqls.getLength();i++){
			Node node = sqls.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE){
				Element element= (Element)node;
				String sqlId=element.getAttribute("id");
				if (group.get(sqlId)==null){
					try {
						group.put(sqlId, new Sql(element));
					}catch(Exception e) {
						throw new XMLTagIsNotLegalException("sql",groupId,sqlId,e.getMessage());
					}
				}else{
					throw new XMLTagIdIsDuplicateException("sql",groupId,sqlId);
				}
			}
		}
	}
	/**
	 * ロードするSql外部化XMLファイルを格納するオブジェクト。
	 */
	private static final HashMap<String,SqlHashMap> groups=new HashMap<String,SqlHashMap>();
}
