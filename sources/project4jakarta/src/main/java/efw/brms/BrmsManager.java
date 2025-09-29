/**** efw4.X Copyright 2025 efwGrp ****/
package efw.brms;

import java.util.Map;

import com.innorules.rrt.InitializerHelper;

import efw.BrmsExcuteException;
import efw.framework;
import efw.properties.PropertiesManager;

/**
 *ルールエンジンに対する操作を行うクラス。For 7.X 8.X
 * @author Chang
 */
public final class BrmsManager {
	private static int CODETYPE_ID = 0;
	private static int CODETYPE_NAME = 1;
	private static int CODETYPE_ALIAS = 2;
	private static String VERSION_7 ="7";
	private static String VERSION_8 ="8";
	/**
	 * ダミーコンストラクタ
	 */
	public BrmsManager(){super();}
	/***
	 * バッチからルールを実行する前の初期化。
	 * @throws Exception エラー。
	 */
	public static void initFromBatch() throws Exception{
		// プロパティ ファイルから、codeTypeを取得する。
		InitializerHelper.initialize(PropertiesManager.getProp());
	}
	/***
	 * バッチからルールを実行完了後の破棄。
	 */
	public static void destroyFromBatch(){
		InitializerHelper.cleanup();
	}
	/**
	 * IDでルール呼び出し。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws BrmsExcuteException ルール実行エラー。
	 */
	public static Object getRuleById(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws BrmsExcuteException{
		framework.brmsLog(BrmsManager.CODETYPE_ID,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(BrmsManager.CODETYPE_ID,ruleIndentifier,ruleDate,params);
	}
	/**
	 * 名称でルール呼び出し。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws BrmsExcuteException ルール実行エラー。
	 */
	public static Object getRuleByName(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws BrmsExcuteException{
		framework.brmsLog(BrmsManager.CODETYPE_NAME,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(BrmsManager.CODETYPE_NAME,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ALIASでルール呼び出し。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws BrmsExcuteException ルール実行エラー。
	 */
	public static Object getRuleByAlias(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws BrmsExcuteException{
		framework.brmsLog(BrmsManager.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(BrmsManager.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ルール呼び出し。
	 * @param codeType コードタイプ。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws BrmsExcuteException ルール実行エラー。
	 */
	protected static Object execute(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) throws BrmsExcuteException {
		try {
			if (VERSION_7.equals(PropertiesManager.getProperty(PropertiesManager.EFW_BRMS_VERESION, VERSION_7))) {
				return BrmsManager7.execute(codeType,ruleIndentifier,ruleDate,params);
			};
			if (VERSION_8.equals(PropertiesManager.getProperty(PropertiesManager.EFW_BRMS_VERESION, VERSION_7))) {
				return BrmsManager8.execute(codeType,ruleIndentifier,ruleDate,params);
			};
		}catch(Exception e) {
			throw new BrmsExcuteException(e);
		}
		return null;
	}

}