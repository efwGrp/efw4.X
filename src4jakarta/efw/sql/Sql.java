/**** efw4.X Copyright 2019 efwGrp ****/
package efw.sql;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Map;

import javax.script.ScriptContext;
import javax.script.ScriptException;
import javax.script.SimpleScriptContext;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import efw.efwException;
import efw.script.ScriptManager;

/**
 * SQL定義を表すクラス。
 * @author Chang Kejun
 *
 */
public final class Sql {
	/**
	 * SqlタグからSqlオブジェクトを作成する。
	 * @param element　Sql外部化XMLのsqlタグ
	 * @throws efwException　タグ不正のエラー。
	 */
	protected Sql(Element element) throws Exception{
		//もしSQLに:がある場合、paramPrefixを別文字に設定するようにできる
		String tmpParamPrefix=element.getAttribute("paramPrefix");
		if(tmpParamPrefix!=null&&tmpParamPrefix.length()>0)paramPrefix=tmpParamPrefix;
		//もしSQLに@がある場合、dynamicPrefixを別文字に設定するようにできる
		String tmpDynamicPrefix=element.getAttribute("dynamicPrefix");
		if(tmpDynamicPrefix!=null&&tmpDynamicPrefix.length()>0)dynamicPrefix=tmpDynamicPrefix;
		
		NodeList nodes=element.getChildNodes();
		for(int i=0;i<nodes.getLength();i++){
			Node node=nodes.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE){
				Element step= (Element)node;
				if (step.getTagName().equals("if")){
					steps.add(new SqlIf(step));
				}else if (step.getTagName().equals("include")){
					steps.add(new SqlInclude(step));
				}else{
					String information;
					try{
						StreamResult xmlOutput = new StreamResult(new StringWriter());
						Transformer transformer = TransformerFactory.newInstance().newTransformer();
						transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
						transformer.transform(new DOMSource(node), xmlOutput);
						information = xmlOutput.getWriter().toString();
					}catch(Exception e){
						information=e.getMessage();
					}
					throw new Exception(information);//loadでefwExceptionに変換
				}
			}else if(node.getNodeType()==Node.TEXT_NODE){
				String step= node.getNodeValue();
				steps.add(new SqlText(step));
			}
		}
	}	
	/**
	 * Sqlに動的キーワードを識別するための頭文字
	 */
	private String dynamicPrefix="@";
	protected String getDynamicPrefix(){
		return dynamicPrefix;
	}

	/**
	 * Sqlにパラメータを識別するための頭文字
	 */
	private String paramPrefix=":";
	protected String getParamPrefix(){
		return paramPrefix;
	}
	/**
	 * SQL定義を分析し、SQL文とパラメータ配列を作成する。
	 * @param params SQLパラメータのマップ。
	 * @return 分析結果を返す。
	 * @throws ScriptException スクリプトエラー。
	 * @throws efwException SQL定義エラー。
	 */
	public SqlAnalysisResult analyze(Map<String,Object> params) throws ScriptException, efwException{
		ArrayList<String> paramKeys=new ArrayList<String>();
		ArrayList<Object> sqlParams=new ArrayList<Object>();
		String bf=this.getSqlString(params,paramKeys);
		for(int i=0;i<paramKeys.size();i++){
			String key=paramKeys.get(i);
			if (params.containsKey(key)){
				sqlParams.add(params.get(key));
			}else{
				sqlParams.add(null);
			}
		}
		SqlAnalysisResult ret=new SqlAnalysisResult();
		ret.setSqlString(bf);
		ret.setSqlParams(sqlParams);
		return ret;
	}

	/**
	 * 文字列Sql文を作成する。
	 * @param params Sqlパラメータのマップ。
	 * @return　文字列のSql文を返す。
	 * @throws ScriptException 
	 * @throws efwException 
	 */
	protected String getSqlString(Map<String,Object> params,ArrayList<String> paramKeys) throws ScriptException, efwException{
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
	 * sqlタグの中に、ifタグにより、分割される部品を格納する。
	 */
	private ArrayList<Object> steps=new ArrayList<Object>();
	/**
	 * パラメータマップに指定キーのパラメータが空白か否か判断する。
	 * 指定キーのパラメータが存在しない場合、true。
	 * 指定キーのパラメータがnullの場合、true。
	 * 指摘キーのパラメータが""の場合、true。
	 * @param params　パラメータマップ。
	 * @param key　指定キー。
	 * @return　判断結果。
	 * @throws ScriptException 
	 */
	protected static boolean isTrue(Map<String,Object> params,String script) throws ScriptException{
		ScriptContext ct=new SimpleScriptContext();
		for(Map.Entry<String, Object> entry : params.entrySet()) {
			ct.setAttribute(entry.getKey(), entry.getValue(), ScriptContext.ENGINE_SCOPE);
		}
		return (Boolean)ScriptManager.se().eval(script,ct);
	}
	/**
	 * パラメータマップに指定キーのパラメータが空白か否か判断する。
	 * 指定キーのパラメータが存在しない場合、true。
	 * 指定キーのパラメータがnullの場合、true。
	 * 指摘キーのパラメータが""の場合、true。
	 * @param params　パラメータマップ。
	 * @param key　指定キー。
	 * @return　判断結果。
	 */
	protected static boolean isBlank(Map<String,Object> params,String key){
		if (isBlank(key)){
			return true;
		}else{
			if (!params.containsKey(key)){
				return true;
			}else{
				if (isBlank(params.get(key))){
					return true;
				}else{
					return false;
				}
			}
		}
	}
	/**
	 * 指定値は空白か否か判断する。
	 * nullの場合、true。
	 * ""の場合、true。
	 * @param value　指定値。
	 * @return　判断結果。
	 */
	protected static boolean isBlank(Object value){
		if (value==null){
			return true;
		}else if("".equals(value)){
			return true;
		}else{
			return false;
		}
	}
}
