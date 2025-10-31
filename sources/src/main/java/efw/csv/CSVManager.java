/**** efw4.X Copyright 2025 efwGrp ****/
package efw.csv;

import java.io.BufferedWriter;
import java.io.Closeable;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map.Entry;

import efw.framework;
import efw.file.FileManager;

/**
 * CSV作成を管理するクラス。
 * @author kejun.chang
 *
 */
public final class CSVManager {
	/**
	 * ダミーコンストラクタ
	 */
	public CSVManager(){super();}

	/**
	 * 1つCSVを開く。
	 * @param path CSVのパス。
	 * @param encoding エンコード。
	 * @return Writterのオブジェクト。
	 * @throws FileNotFoundException ファイル無しエラー。
	 * @throws UnsupportedEncodingException エンコード不正エラー。
	 */
	public static PrintWriter open(String path,String encoding) throws UnsupportedEncodingException, FileNotFoundException{
		PrintWriter writer;
		writer = new PrintWriter(
								new BufferedWriter(
									new OutputStreamWriter(
										new FileOutputStream(
											FileManager.get(path),true),encoding)));
		framework.setWriter(path, writer);
		return writer;
	}
	/**
	 * 開いた一つのファイルを閉じる。
	 * @param path CSVファイルパス。
	 */
	public static void close(String path) {
		try {
			Closeable writer=framework.getWriter(path);
			framework.removeWriter(path);
			writer.close();
		}catch(Exception ex) {
			ex.printStackTrace();//エラーを投げない。
		}
	}
	/**
	 * 該当スレッドに、開いたWritterをすべて閉じる。
	 */
	public static void closeAll(){
		if(framework.getWriters()==null) return;

		HashMap<String,Closeable> map=framework.getWriters();
		for(Entry<String, Closeable> e : map.entrySet()) { 
			Closeable writer=e.getValue();
			try{
				writer.close();//2回閉じても大丈夫。
			}catch(Exception ex){
				ex.printStackTrace();//エラーを投げない。
			}
		}
		framework.removeWriters();
	}

}
