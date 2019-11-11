/**** efw4.X Copyright 2019 efwGrp ****/
package efw.csv;

import java.util.ArrayList;
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
			framework.setWritters(new ArrayList<PrintWriter>());
		try{
			PrintWriter writter = new java.io.PrintWriter(
					new java.io.BufferedWriter(
						new java.io.OutputStreamWriter(
							new java.io.FileOutputStream(FileManager.get(path),true),
							encoding)));
			framework.getWritters().add(writter);
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

		ArrayList<PrintWriter> ary=framework.getWritters();
		for(int i=0;i<ary.size();i++) {
			PrintWriter writter=ary.get(i);
			try{
				writter.close();//2回閉じても大丈夫。
			}catch(Exception ex){}
		}
		framework.removeWritters();
	}

}
