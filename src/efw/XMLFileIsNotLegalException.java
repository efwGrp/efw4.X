/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * XMLファイルが正しくないエラー。
 */
public final class XMLFileIsNotLegalException extends efwException {
	public XMLFileIsNotLegalException(String type,String groupId,String message) {
		super(" "+type+" xml file = "+groupId+".xml; error = "+message);
	}
}
