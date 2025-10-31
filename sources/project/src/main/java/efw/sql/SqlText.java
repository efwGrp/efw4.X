/**** efw4.X Copyright 2025 efwGrp ****/
package efw.sql;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import efw.DynamicParamIsNotExistsException;
/**
 * sqlタグにifタグに分割されるSql文の部品を表すクラス。
 * @author Chang Kejun
 *
 */
final class SqlText {
	/**
	 * Sql文の部品によりオブジェクトを作成する。
	 * @param text Sql文部品。
	 */
	protected SqlText(String text){
		this.text=text+"\n";//必ず１改行を入れる。[^\\w]のため
	}
	/**
	 * 代入されるSql文部品そのもの。
	 */
	private String text;
	/**
	 * 代入されるSql文部品をそのまま取得する。
	 * @return Sql文部品。
	 */
	protected String getText() {
		return text;
	}
	/**
	 * Sql文部品に含まれるパラメーターキーを取得する。
	 * キーは、　「:　＋　キーの単語」で構成する。
	 * @return　出現順番どおりにキーの単語を格納する配列を戻す。
	 */
	private ArrayList<String> getParamKeys(String paramPrefix){
		ArrayList<String> ret=new ArrayList<String>();
		//Pattern p = Pattern.compile("(\\"+paramPrefix+"[a-zA-Z_][\\w]*)");//old
		Pattern p = Pattern.compile("(\\"+paramPrefix+"([a-zA-Z_]|[^\\x00-\\x7F])([^\\x00-\\x7F]|[\\w])*)");//２バイト文字を認識する
		Matcher m;
		String tmp;
		String subsql=text.replaceAll("//.*\\n", "\n");//コメント行を認識するため
		subsql=subsql.replaceAll("\\-\\-.*\\n", "\n");//コメント行を認識するため
		subsql=subsql.replaceAll("/\\*/?([^/]|[^*]/)*\\*/", "");//コメント行を認識するため
		m= p.matcher(subsql);
		while(m.find()){
			tmp=m.group();
			tmp=tmp.substring(1, tmp.length());
			ret.add(tmp);
		}
		return ret;
	}
	/**
	 * 代入されるSql文部品を通常書き方に変換する。
	 * 「:　＋　キーの単語」を「 ? 」に変換する。
	 * @return　変換後の文字列を戻す。
	 * @throws DynamicParamIsNotExistsException 
	 */
	protected String getSQL(String paramPrefix,String dynamicPrefix,Map<String,Object> params,ArrayList<String> paramKeys) throws DynamicParamIsNotExistsException{
		String subsql=text.replaceAll("//.*\\n", "\n");//コメント行を認識するため
		subsql=subsql.replaceAll("\\-\\-.*\\n", "\n");//コメント行を認識するため
		subsql=subsql.replaceAll("/\\*/?([^/]|[^*]/)*\\*/", "");//コメント行を認識するため
		subsql=subsql.replaceAll("(\\"+paramPrefix+"([a-zA-Z_]|[^\\x00-\\x7F])([^\\x00-\\x7F]|[\\w])*)", " ? ");//２バイト文字を認識する
		
		ArrayList<String> fds=getDynamicKeys(dynamicPrefix);
		Collections.sort(fds,new Comparator<String>() {
			public int compare(String lhs, String rhs) {
				// -1 - less than, 1 - greater than, 0 - equal, all inversed for descending
				return lhs.length() > rhs.length() ? -1 : (lhs.length() < rhs.length()) ? 1 : 0;
			}});

		for(int i=0;i<fds.size();i++){
			String fdKey=fds.get(i);
			if (params.containsKey(fdKey)) {
				subsql=subsql.replace(dynamicPrefix+fdKey, (String)params.get(fdKey));//1つずつ置換する。
			}else {
				throw new DynamicParamIsNotExistsException(fdKey);
			}
		}
		paramKeys.addAll(this.getParamKeys(paramPrefix));
		return subsql;
	}
	/**
	 * 代入される動的項目配列を取得する。
	 * キーは、　「 @ + キーの単語 」で構成する。
	 */
	protected ArrayList<String> getDynamicKeys(String replacePrefix){
		return getParamKeys(replacePrefix);
	}
}
