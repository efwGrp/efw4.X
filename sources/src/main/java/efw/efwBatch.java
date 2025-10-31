/**** efw4.X Copyright 2025 efwGrp ****/
package efw;

import java.lang.reflect.Method;

import efw.script.ScriptManager;

/**
 * efwBatchはバッチイベントを実行する。
 * @author kejun.chang
 *
 */
public final class efwBatch {
	/**
	 * ダミーコンストラクタ
	 */
	public efwBatch(){super();}

	/**
	 * webアプリのフォルダ。
	 * ほかのフォルダの相対基準パス。
	 */
	private static final String WEBHOME="WEBHOME";
	
	private static final String PROPERTIES="PROPERTIES";

	/**
	 * バッチを実行する。
	 * @param args パラメータ配列。
	 * @throws Exception エラー。
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String args[]) throws Exception{
		//初期化関数を呼び出す
		//-----------------------------------------------------------------
		String webHome=System.getenv(WEBHOME);
		String properties =System.getenv(PROPERTIES);
		framework.initBatch(webHome,properties);

		//eventを実行する, efwServletのdoPostと同等
		//-----------------------------------------------------------------	 
		try{
			ScriptManager.doBatch(args[0]);
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
		}finally{
			if (framework.getBrmsImport()){
				Class brms = Class.forName("efw.brms.BrmsManager");
				Method destroyFromBatch = brms.getDeclaredMethod("destroyFromBatch", (Class[])null);
				destroyFromBatch.invoke(null,(Object[])null);
			}
		}
	}
}


