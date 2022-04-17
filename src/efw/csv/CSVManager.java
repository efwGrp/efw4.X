/**** efw4.X Copyright 2019 efwGrp ****/
package efw.csv;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map.Entry;

import efw.framework;
import efw.file.FileManager;

public final class CSVManager {
	/**
	 * 1つExcelを開く。
	 * @param path CSVのパス。
	 * @return Writterのオブジェクト。
	 */
	public static PrintWriter open(String path,String encoding) throws Exception{
		if(framework.getWriters()==null) framework.setWriters(new HashMap<String,PrintWriter>());
		
		try{
			PrintWriter writer = new PrintWriter(
									new BufferedWriter(
										new OutputStreamWriter(
											new FileOutputStream(
												FileManager.get(path),true),encoding)));
			framework.getWriters().put(path,writer);
			return writer;
		}catch(Exception ex){
			throw ex;
		}
	}
	/**
	 * 開いた一つのファイルを閉じる
	 * @param path
	 */
	public static void close(String path) {
		try {
			PrintWriter writer=framework.getWriters().get(path);
			framework.getWriters().remove(path);
			writer.close();
		}catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	/**
	 * 該当スレッドに、開いたWritterをすべて閉じる。
	 * @throws IOException
	 */
	public static void closeAll(){
		if(framework.getWriters()==null) return;

		HashMap<String,PrintWriter> map=framework.getWriters();
		for(Entry<String, PrintWriter> e : map.entrySet()) { 
			PrintWriter writer=e.getValue();
			try{
				writer.close();//2回閉じても大丈夫。
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
		framework.removeWriters();
	}

}
