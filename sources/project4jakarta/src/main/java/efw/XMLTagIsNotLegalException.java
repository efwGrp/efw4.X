/**** efw4.X Copyright 2025 efwGrp ****/
package efw;
/**
 * XMLタグが正しくないエラー。
 * @author kejun.chang
 */
public final class XMLTagIsNotLegalException extends efwException {
	/**
	 * コンストラクタ
	 * @param type メール定義かSQL定義かを区別するためのタイプ。
	 * @param groupId xmlファイル名。
	 * @param id 定義ID。
	 * @param message エラー内容。
	 */
	public XMLTagIsNotLegalException(String type,String groupId,String id,String message) {
		super(" "+type+" xml file = "+groupId+".xml; id = "+id+"; error = "+message);
	}
	/**
	 * コンストラクタ
	 * @param source 動的SQL文を表すキー。
	 * @param sql SQL文。
	 */
	public XMLTagIsNotLegalException(String source,String sql) {
		super(" " + source + " = [ " + sql+" ]");
	}
}
