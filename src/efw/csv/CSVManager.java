/**** efw4.X Copyright 2019 efwGrp ****/
package efw.csv;

import java.util.HashMap;
import java.util.Map.Entry;
import java.io.IOException;
import java.io.PrintWriter;

import efw.framework;
import efw.file.FileManager;

public final class CSVManager {
	/**
	 * 1つExcelを開く。
	 * @param path CSVのパス。
	 * @return Writterのオブジェクト。
	 */
	public static PrintWriter open(String path,String encoding) throws Exception{
		if(framework.getWritters()==null)
			framework.setWritters(new HashMap<String,PrintWriter>());
		try{
			PrintWriter writter = new java.io.PrintWriter(
					new java.io.BufferedWriter(
						new java.io.OutputStreamWriter(
							new java.io.FileOutputStream(FileManager.get(path),true),
							encoding)));
			framework.getWritters().put(path,writter);
			return writter;
		}catch(Exception ex){
			throw ex;
		}
	}
	/**
	 * 該当スレッドに、開いたWritterをすべて閉じる。
	 * @throws IOException
	 */
	public static void closeAll(){
		if(framework.getWritters()==null) return;

		HashMap<String,PrintWriter> map=framework.getWritters();
		for(Entry<String, PrintWriter> e : map.entrySet()) { 
			PrintWriter writter=e.getValue();  
			try{
				writter.close();//2回閉じても大丈夫。
			}catch(Exception ex){}
		}
		framework.removeWritters();
	}

}
