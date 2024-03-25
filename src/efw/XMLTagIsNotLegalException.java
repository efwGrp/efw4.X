/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * XMLタグが正しくないエラー。
 * @author kejun.chang
 */
public final class XMLTagIsNotLegalException extends efwException {
	/**
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 * @param id 定義ID。
	 * @param message エラー内容。
	 */
	public XMLTagIsNotLegalException(String type,String groupId,String id,String message) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id+"; error = "+message);
	}
	public XMLTagIsNotLegalException(String source,String sql) {
		super(" " + source + " = [ " + sql+" ]");
	}
}
