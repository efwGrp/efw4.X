/**** efw4.X Copyright 2019 efwGrp ****/
package efw;
/**
 * CSVデータエラー。
 */
public class CsvTxtDataException extends efwException {
	public CsvTxtDataException(String type,int index,String data) {
		super(" "+type+" at row "+index+". data = "+data);
	}
}
