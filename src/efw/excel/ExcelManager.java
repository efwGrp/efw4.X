/**** efw4.X Copyright 2019 efwGrp ****/
package efw.excel;

import java.util.HashMap;
import java.util.Map.Entry;

import efw.ExcelFileIsNotLegalException;
import efw.framework;
import efw.file.FileManager;
/**
 * Excelファイルを取り扱うクラス。
 */
public final class ExcelManager {
	/**
	 * 1つExcelを開く。
	 * @param path Excelのパス。
	 * @param isLarge ビッグファイルモード。
	 * @return Excelのオブジェクト。
	 * @throws ExcelFileIsNotLegalException Excelファイルエラー。
	 */
	public static Excel open(String path,boolean isLarge) throws ExcelFileIsNotLegalException {
		try {
			Excel excel=new Excel(FileManager.get(path),isLarge);
			framework.setExcel(excel.getKey(),excel);
			return excel;
		}catch(Exception e) {//ここでは詳細のExceptionをキャッチできない。そうしたらそれらのクラスをインポートする必要。
			throw new ExcelFileIsNotLegalException(path,e.getMessage());
		}
	}
	/**
	 * 開いた一つのファイルを閉じる。
	 * @param flnm ファイル名。
	 */
	public static void close(String flnm) {
		try {
			Excel excel=framework.getExcel(flnm);
			framework.removeExcel(flnm);
			excel.close();
		}catch(Exception ex) {
			ex.printStackTrace();//エラーをなげない。
		}
	}
	/**
	 * 該当スレッドに、開いたExcelをすべて閉じる。
	 */
	public static void closeAll(){
		if(framework.getExcels()==null) return;

		HashMap<String,Excel> map=framework.getExcels();
		for(Entry<String, Excel> e : map.entrySet()) { 
			Excel excel=e.getValue();
			try{
				excel.close();//2回閉じても大丈夫。
			}catch(Exception ex){
				ex.printStackTrace();//エラーをなげない。
			}
		}
		framework.removeExcels();
	}
}
