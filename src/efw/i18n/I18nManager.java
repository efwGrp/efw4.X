/**** efw4.X Copyright 2019 efwGrp ****/
package efw.i18n;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import efw.framework;

public final class I18nManager {
	/**
	 * Msgを外部化するXMLファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String i18nFolder;
    /**
     * サーブレットから設定情報を受け取る。
     * @param msgFolder　Msg外部化XMLファイルの格納パス。
     * @throws efwException　Msg外部化XMLファイルの読み取りエラー。
     */
	public static void init(String i18nFolder){
		I18nManager.i18nFolder=i18nFolder;
	}
	/**
	 * ひとつのMsgを取得する。
	 * デバッグモードの場合、最終更新日時により再ロードするか否か判断する。
	 * 通常モードの場合、予めロード済みデータから、Msgを探す。
	 * @param lang Msg外部化XMLファイルのファイル名（拡張子を除く）。
	 * @param key　Entryタグに定義するkey。
	 * @return　Msg文字列。
	 * @throws efwException　Msg外部化XMLファイルの定義エラーか、存在しないエラーか。
	 */
	public static String get(String lang,String key,String defaultValue){
		//get group
		I18nProperties prop;
		if ((prop=framework.getI18nProp())==null){
			if ((prop=props.get(lang))==null){
				synchronized(props){
					if ((prop=props.get(lang))==null){
						load(lang);
						prop=props.get(lang);
					}
				}
			}else if (framework.getIsDebug()){
				if (checkModifyTime(lang)){
					synchronized(props){
						if (checkModifyTime(lang)){
							props.remove(lang);
							load(lang);
							prop=props.get(lang);
						}
					}
				}
			}
			
		}
		//if prop is not exists, return the key
		if (prop==null){
			return defaultValue;
		}else{
			framework.setI18nProp(prop);//efwServletに記録する。こうすれば、同じ画面の次回メッセージ取得は、チェックしない。
			return prop.getProperty(key,defaultValue);//get Msg
		}
	}
	/**
	 * 予めロード済みデータのPropオブジェクトの最終更新日時は、実ファイルと同じか否かをチェックする。
	 * @param lang Msg外部化XMLファイルのファイル名（拡張子を除く）。
	 * @return 最終更新日時が変更なしの場合 true　。
	 */
	private static boolean checkModifyTime(String lang){
		I18nProperties prop=props.get(lang);
		if (prop==null){
			return true;//xml file is not in memory,so it is need to reload
		}else{
			Date fileLastModifytime = new Date(new File(I18nManager.i18nFolder+"/"+lang+".xml").lastModified());
			if(!fileLastModifytime.equals(prop.getLastModifytime())){
				return true;//xml file is modified, so it is need to reload
			}else{
				return false;//xml file is not modified
			}
		}
	}
	/**
	 * Msg外部化XMLファイルのファイル名によりロードする。
	 * @param groupId Msg外部化XMLファイルのファイル名（拡張子を除く）。
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	///////////////////////////////////////////////////////////////////////////
	private static void load(String lang){
		try{
			String filename=I18nManager.i18nFolder+"/"+lang+".xml";
			File fl=new File(filename);
			if (fl.exists()){
				I18nProperties prop=new I18nProperties();
				prop.setLastModifytime(new Date(fl.lastModified()));
				FileInputStream strm;
				prop.loadFromXML(strm=new FileInputStream(fl));
				strm.close();
				props.put(lang,prop);
			}
		}catch(Exception e){
			e.printStackTrace();//エラーを投げない。
		}
	}
	/**
	 * ロードするMsg外部化XMLファイルを格納するオブジェクト。
	 */
	private static HashMap<String,I18nProperties> props=new HashMap<String,I18nProperties>();

}
