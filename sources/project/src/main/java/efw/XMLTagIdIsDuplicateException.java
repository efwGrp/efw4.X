/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * 指定Idは指定XMLファイルに複数存在しているエラー。
 * @author kejun.chang
 */
public final class XMLTagIdIsDuplicateException extends efwException {
	/**
	 * コンストラクタ
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 * @param id 定義ID。
	 */
	public XMLTagIdIsDuplicateException(String type,String groupId,String id) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id);
	}

}
