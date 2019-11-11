/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * XMLファイルが存在しないエラー。
 */
@SuppressWarnings("serial")
public class XMLFileIsNotExistsException extends efwException {
	public XMLFileIsNotExistsException(String type,String groupId) {
		super(" "+type+" xml file = "+groupId+".xml");
	}
}
