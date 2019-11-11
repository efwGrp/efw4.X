/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * 指定Idが指定XMLファイルに存在しないエラー。
 */
@SuppressWarnings("serial")
public class XMLTagIdIsNotExistsException extends efwException {
	public XMLTagIdIsNotExistsException(String type,String groupId,String id) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id);
	}
}
