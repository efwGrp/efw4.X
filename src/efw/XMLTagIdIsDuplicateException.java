/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * 指定Idは指定XMLファイルに複数存在しているエラー。
 */
public class XMLTagIdIsDuplicateException extends efwException {
	public XMLTagIdIsDuplicateException(String type,String groupId,String id) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id);
	}

}
