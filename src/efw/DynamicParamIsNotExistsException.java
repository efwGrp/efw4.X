/**** efw4.X Copyright 2021 efwGrp ****/
package efw;
/**
 * 動的パラメータ存在しないエラー
 * @author kejun.chang
 */
public final class DynamicParamIsNotExistsException extends efwException {
	/**
	 * @param dynamicKey 動的パラメータ
	 */
	public DynamicParamIsNotExistsException(String dynamicKey) {
		super("dynamicKey = "+dynamicKey);
	}
}
