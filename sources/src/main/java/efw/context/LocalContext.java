/**** efw4.X Copyright 2026 efwGrp ****/
package efw.context;

import java.util.HashMap;

import efw.framework;
/**
 * ローカル環境に適用するコンテキストクラス
 * @author kejun.chang
 */
public class LocalContext implements EfwContext {

	private static HashMap<String,Object> context=new HashMap<String,Object>();
	/**
	 * ダミーコンストラクタ
	 */
	public LocalContext(){
		framework.initWLog("LocalContext inited.");
	}
	
	/**
	 * コンテキストから指定キーの値を取得する
	 * @param key キー
	 * @return 値
	 */
	@Override
	public Object get(String key) {
		return context.get(key);
	}

	/**
	 * コンテキストに指定キーの値を設定する
	 * @param key キー
	 * @param value 値
	 */
	@Override
	public void set(String key, Object value) {
		context.put(key, value);
	}

	/**
	 * コンテキストから指定キーを削除する
	 * @param key キー
	 */
	@Override
	public void remove(String key) {
		context.remove(key);
	}

	/**
	 * コンテキストを破棄する
	 */
	@Override
	public void destory() {
		//do nothing
	}
}
