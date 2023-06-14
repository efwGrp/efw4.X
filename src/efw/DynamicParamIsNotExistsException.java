/**** efw4.X Copyright 2021 efwGrp ****/
package efw;
/**
 * 動的パラメータ存在しないエラー
 */
public final class DynamicParamIsNotExistsException extends efwException {
	public DynamicParamIsNotExistsException(String dynamicKey) {
		super("dynamicKey = "+dynamicKey);
	}
}
