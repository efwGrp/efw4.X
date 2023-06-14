/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * XMLタグが正しくないエラー。
 */
public final class XMLTagIsNotLegalException extends efwException {
	public XMLTagIsNotLegalException(String type,String groupId,String id,String message) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id+"; error = "+message);
	}
}
