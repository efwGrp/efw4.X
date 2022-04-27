/**** efw4.X Copyright 2019 efwGrp ****/
package efw.excel;

import java.util.HashMap;
import java.util.Map.Entry;

import efw.framework;
import efw.file.FileManager;
/**
 * Excelファイルを取り扱うクラス。
 */
public final class ExcelManager {
	/**
	 * 1つExcelを開く。
	 * @param path Excelのパス。
	 * @return Excelのオブジェクト。
	 * @throws Exception
	 */
	public static Excel open(String path,boolean isLarge) throws Exception{
		if(framework.getExcels()==null)
		framework.setExcels(new HashMap<String,Excel>());
		try{
			Excel excel=new Excel(FileManager.get(path),isLarge);
			framework.getExcels().put(excel.getKey(),excel);
			return excel;
		}catch(Exception e){
	        e.printStackTrace();
			throw e;
		}
	}
	/**
	 * 開いた一つのファイルを閉じる
	 * @param path
	 */
	public static void close(String flnm) {
		try {
			Excel excel=framework.getExcels().get(flnm);
			framework.getExcels().remove(flnm);
			excel.close();
		}catch(Exception ex) {
			ex.printStackTrace();
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
				ex.printStackTrace();
			}
		}
		framework.removeExcels();
	}
}
