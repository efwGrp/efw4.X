/**** efw4.X Copyright 2025 efwGrp ****/
package efw.cmd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * インプットストリーム用のスレッド。
 * @author kejun.chang
 *
 */
final class InputStreamThread extends Thread {
	private BufferedReader br;

	private List<String> list = new ArrayList<String>();

	/**
	 * @param is 入力ストリーム。
	 */
	public InputStreamThread(InputStream is) {
		br = new BufferedReader(new InputStreamReader(is));
	}

	/**
	 * @param is 入力ストリーム。
	 * @param charset 文字コード。
	 */
	public InputStreamThread(InputStream is, String charset) {
		try {
			br = new BufferedReader(new InputStreamReader(is, charset));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * スレッドを実行する。
	 */
	@Override
	public void run() {
		try {
			for (;;) {
				String line = br.readLine();
				if (line == null)
					break;
				list.add(line);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				br.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * インプットストリームの内容を取得する。
	 * @return 文字列配列。
	 */
	public List<String> getStringList() {
		return list;
	}
}
