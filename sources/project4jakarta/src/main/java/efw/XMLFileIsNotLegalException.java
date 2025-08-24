/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * XMLファイルが正しくないエラー。
 * @author kejun.chang
 */
public final class XMLFileIsNotLegalException extends efwException {
	/**
	 * コンストラクタ
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 * @param message エラー内容。
	 */
	public XMLFileIsNotLegalException(String type,String groupId,String message) {
		super(" "+type+" xml file = "+groupId+".xml; error = "+message);
	}
}
