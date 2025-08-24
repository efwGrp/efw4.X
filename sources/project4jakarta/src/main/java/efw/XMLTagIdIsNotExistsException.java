/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * 指定Idが指定XMLファイルに存在しないエラー。
 * @author kejun.chang
 */
public final class XMLTagIdIsNotExistsException extends efwException {
	/**
	 * コンストラクタ
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 * @param id 定義ID。
	 */
	public XMLTagIdIsNotExistsException(String type,String groupId,String id) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id);
	}
}
