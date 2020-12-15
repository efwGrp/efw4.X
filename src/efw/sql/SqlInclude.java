/**** efw4.X Copyright 2020 efwGrp ****/
package efw.sql;

import java.io.StringWriter;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Element;

/**
 * サブSqlをインクロードするクラス。
 * @author Chang Kejun
 *
 */
final class SqlInclude {
	/**
	 * サブSqlインクロードを作成する。
	 * @param element includeタグ。
	 * @throws efwException タグ不正のエラー。
	 */
	protected SqlInclude(Element element) throws Exception{
		groupId=element.getAttribute("groupId");
		sqlId=element.getAttribute("sqlId");
		if (Sql.isBlank(groupId)||Sql.isBlank(sqlId)){//group sqlid未設定の場合
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
	 * groupのキー。
	 */
	private String groupId;
	/**
	 * groupのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getGroupId() {
		return groupId;
	}

	/**
	 * sqlidのキー。
	 */
	private String sqlId;
	/**
	 * sqlidのキーを取得する。
	 * @return パラメータのキー。
	 */
	protected String getSqlId() {
		return sqlId;
	}

}
