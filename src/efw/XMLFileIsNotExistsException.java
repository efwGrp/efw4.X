/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * XMLファイルが存在しないエラー。
 * @author kejun.chang
 */
public final class XMLFileIsNotExistsException extends efwException {
	/**
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 */
	public XMLFileIsNotExistsException(String type,String groupId) {
		super(" "+type+" xml file = "+groupId+".xml");
	}
}
