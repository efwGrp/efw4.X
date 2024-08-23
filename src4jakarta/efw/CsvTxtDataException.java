/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * CSVデータエラー。
 * @author kejun.chang
 */
public final class CsvTxtDataException extends efwException {
	/**
	 * @param type エラー箇所のタイプ、( Illegal state | Illegal quote | Illegal data | Unknown state )。
	 * @param index エラー発生する行番号（0から）。
	 * @param data エラー発生する行のデータ。
	 */
	public CsvTxtDataException(String type,int index,String data) {
		super(" "+type+" at row "+index+". data = "+data);
	}
}
