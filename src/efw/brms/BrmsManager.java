/**** efw4.X Copyright 2019 efwGrp ****/
package efw.brms;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.innoexpert.rulesclient.ClusterManager;
import com.innoexpert.rulesclient.Constants;
import com.innoexpert.rulesclient.Item;
import com.innoexpert.rulesclient.ResultSet;
import com.innoexpert.rulesclient.RuleInterface;
import com.innoexpert.rulesclient.RuleReq;
import com.innoexpert.rulesclient.RulesException;
import com.innorules.rrt.InitializerHelper;

import efw.framework;
import efw.properties.PropertiesManager;

/**
 *ルールエンジンに対する操作を行うクラス。For 7.1
 * @author he.lin と tian.liang
 */
public final class BrmsManager {

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
	 * @throws RulesException ルール実行エラー。
	 */
	public static ResultSet getRuleById(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		framework.brmsLog(Constants.CODETYPE_ID,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(Constants.CODETYPE_ID,ruleIndentifier,ruleDate,params);
	}
	/**
	 * 名称でルール呼び出し。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws RulesException ルール実行エラー。
	 */
	public static ResultSet getRuleByName(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		framework.brmsLog(Constants.CODETYPE_NAME,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(Constants.CODETYPE_NAME,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ALIASでルール呼び出し。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws RulesException ルール実行エラー。
	 */
	public static ResultSet getRuleByAlias(String ruleIndentifier, String ruleDate, Map<String, Object> params)throws RulesException{
		framework.brmsLog(Constants.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params);
		return BrmsManager.execute(Constants.CODETYPE_ALIAS,ruleIndentifier,ruleDate,params);
	}
	/**
	 * ルール呼び出し。
	 * @param codeType コードタイプ。
	 * @param ruleIndentifier ルールの識別子。
	 * @param ruleDate ルール呼び出し基準日(yyyy-MM-dd)。
	 * @param params ルール呼び出しパラメーター。
	 * @return ルール実行結果。
	 * @throws RulesException ルール実行エラー。
	 */
	@SuppressWarnings("rawtypes")
	private static ResultSet execute(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) throws RulesException {
		RuleReq req = new RuleReq();
		req.setRuleCode(ruleIndentifier);
		req.setDate(ruleDate);
		req.resetItems();
		Iterator<Entry<String, Object>> it = params.entrySet().iterator();
		while(it.hasNext()){
			Entry<String,Object> entry = (Entry<String,Object>)it.next();
			String key=entry.getKey().toString();
			Object value=entry.getValue();
			
			if (value==null){
				req.addStringItem(key).add(null);
			}else if(value instanceof String){
				req.addStringItem(key).add((String) value);
			}else if(value instanceof Double){
				req.addNumberItem(key).add((Double) value);
			}else if(value instanceof ArrayList){
				ArrayList ary=(ArrayList)value;
				Item item=null;
				for(int i=0;i<ary.size();i++){
					Object subValue=ary.get(i);
					if (i==0){
						if (subValue==null){
							item=req.addStringItem(key);
						}else if (subValue instanceof String){
							item=req.addStringItem(key);
						}else if(subValue instanceof Double){
							item=req.addNumberItem(key);
						}
					}
					if (subValue==null){
						item.add(null);
					}else if (subValue instanceof String){
						item.add((String)subValue);
					}else if(subValue instanceof Double){
						item.add((Double)subValue);
					}
					
				}
			}
		}
		RuleInterface intf = ClusterManager.getInterface();
		try {
			return intf.execute(req, codeType);
		} finally {
			intf.close();
		}
	}
}