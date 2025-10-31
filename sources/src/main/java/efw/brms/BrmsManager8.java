/**** efw4.X Copyright 2025 efwGrp ****/
package efw.brms;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.innorules.rulesclient.ClusterManager;
import com.innorules.rulesclient.Item;
import com.innorules.rulesclient.ResultSet;
import com.innorules.rulesclient.RuleInterface;
import com.innorules.rulesclient.RuleReq;
import com.innorules.rulesclient.RulesException;

/**
 *ルールエンジンに対する操作を行うクラス。For 7.1
 * @author he.lin と tian.liang
 */
final class BrmsManager8 {
	/**
	 * ダミーコンストラクタ
	 */
	protected BrmsManager8(){super();}

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
	protected static ResultSet execute(int codeType, String ruleIndentifier, String ruleDate, Map<String, Object> params) throws RulesException {
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
				req.addStringItem(key).add((String)null);
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
						item.add((String)null);
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