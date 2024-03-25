/**** efw4.X Copyright 2019 efwGrp ****/
package efw.sql;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Map;

import javax.script.ScriptException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import efw.efwException;

/**
 * Sqlを外部化するXMLのifタグとマッピングし、1つの条件式を表すクラス。
 * @author Chang Kejun
 *
 */
final class SqlIf {
	/**
	 * ifタグから条件式オブジェクトを作成する。
	 * @param element Sql外部化XMLのifタグ。
	 * @throws efwException タグ不正のエラー。
	 */
	protected SqlIf(Element element) throws Exception{
		exists=element.getAttribute("exists");
		notExists=element.getAttribute("notexists");
		isTrue=element.getAttribute("istrue");
		isFalse=element.getAttribute("isfalse");
		int isNotBlankCnt=0;
		if (!Sql.isBlank(exists))isNotBlankCnt++;
		if (!Sql.isBlank(notExists))isNotBlankCnt++;
		if (!Sql.isBlank(isTrue))isNotBlankCnt++;
		if (!Sql.isBlank(isFalse))isNotBlankCnt++;
		

		NodeList nodes=element.getChildNodes();
		for(int i=0;i<nodes.getLength();i++){
			Node node=nodes.item(i);
			if (node.getNodeType() == Node.TEXT_NODE){
				SqlText sqlText=new SqlText(node.getNodeValue());
				steps.add(sqlText);
			}else if (node.getNodeType() == Node.ELEMENT_NODE){
				Element step= (Element)node;
				if (step.getTagName().equals("if")){
					steps.add(new SqlIf(step));
				}else if (step.getTagName().equals("include")){
					steps.add(new SqlInclude(step));
				}
			}
		}
		if (isNotBlankCnt!=1){//条件式は1つしか設定できない
			String information;
			try{
				StreamResult xmlOutput = new StreamResult(new StringWriter());
				Transformer transformer = TransformerFactory.newInstance().newTransformer();
				transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
				transformer.transform(new DOMSource(element), xmlOutput);
				information = xmlOutput.getWriter().toString();
			}catch(Exception e){
				information=e.getMessage();
			}
			throw new Exception(information);//loadでefwExceptionに変換
		}
	}
	/**
	 * 文字列Sql文を作成する。
	 * @param params Sqlパラメータのマップ。
	 * @param paramPrefix Sqlにパラメータを識別するための頭文字
	 * @param dynamicPrefix Sqlに動的キーワードを識別するための頭文字
	 * @return　文字列のSql文を返す。
	 * @throws ScriptException 
	 * @throws efwException 
	 */
	protected String getSqlString(String paramPrefix,String dynamicPrefix,Map<String,Object> params,ArrayList<String> paramKeys) throws ScriptException, efwException{
		StringBuffer bf=new StringBuffer();
		for(int i=0;i<steps.size();i++){
			Object obj=steps.get(i);
			if (obj.getClass().getName().equals("efw.sql.SqlText")){
				SqlText sqltext=(SqlText)obj;
				bf.append(sqltext.getSQL(paramPrefix,dynamicPrefix,params,paramKeys));
			}else if(obj.getClass().getName().equals("efw.sql.SqlIf")){
				SqlIf sqlif=(SqlIf)obj;
				if ((!Sql.isBlank(sqlif.getExists())&&!Sql.isBlank(params,sqlif.getExists()))
				||(!Sql.isBlank(sqlif.getNotExists())&&Sql.isBlank(params,sqlif.getNotExists()))
				||(!Sql.isBlank(sqlif.getIsTrue())&&Sql.isTrue(params,sqlif.getIsTrue()))
				||(!Sql.isBlank(sqlif.getIsFalse())&&!Sql.isTrue(params,sqlif.getIsFalse()))){
					bf.append(sqlif.getSqlString(paramPrefix,dynamicPrefix,params,paramKeys));
				}
			}else if(obj.getClass().getName().equals("efw.sql.SqlInclude")){
				SqlInclude sqlinclude=(SqlInclude)obj;
				String source=sqlinclude.getSource();
				if (!"".equals(source)&&source!=null){
					if(params.containsKey(source)){
						String v=(String)params.get(source);
						if (!"".equals(v)&&v!=null){
							Sql subsql=SqlManager.getSqlFromSource(source,params);
							String sqlsource=subsql.getSqlString(params,paramKeys);
							if (sqlsource!=null) {
								bf.append(sqlsource);
							}
						}
					}
				}else {
					Sql subsql=SqlManager.get(sqlinclude.getGroupId(), sqlinclude.getSqlId());
					bf.append(subsql.getSqlString(params,paramKeys));
				}
				
			}
		}
		return bf.toString();		
	}
	
	/**
	 * Falseと判断するパラメータのキー。
	 */
	private String isFalse;
	/**
	 * Falseと判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getIsFalse() {
		return isFalse;
	}
	/**
	 * Trueと判断するパラメータのキー。
	 */
	private String isTrue;
	/**
	 * Trueと判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getIsTrue() {
		return isTrue;
	}
	/**
	 * 存在と判断するパラメータのキー。
	 */
	private String exists;
	/**
	 * 存在と判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getExists() {
		return exists;
	}
	/**
	 * 存在しないと判断するパラメータのキー。
	 */
	private String notExists;
	/**
	 * 存在しないと判断するパラメータのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getNotExists() {
		return notExists;
	}
	/**
	 * sqlタグの中に、ifタグにより、分割される部品を格納する。
	 */
	private ArrayList<Object> steps=new ArrayList<Object>();
	
}
