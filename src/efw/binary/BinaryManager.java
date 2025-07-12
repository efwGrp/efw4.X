/**** efw4.X Copyright 2025 efwGrp ****/
package efw.binary;

import java.io.Closeable;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map.Entry;

import efw.framework;
import efw.file.FileManager;

/**
 * Binaryファイル作成を管理するクラス。
 * @author kejun.chang
 *
 */
public class BinaryManager {
	/**
	 * 1つBinaryファイルを開く。
	 * @param path CSVのパス。
	 * @return Writterのオブジェクト。
	 * @throws FileNotFoundException ファイル無しエラー。
	 * @throws UnsupportedEncodingException エンコード不正エラー。
	 */
	public static FileOutputStream open(String path) throws UnsupportedEncodingException, FileNotFoundException{
		FileOutputStream writer=
						new FileOutputStream(
							FileManager.get(path),true);
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
