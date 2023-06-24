/**** efw4.X Copyright 2019 efwGrp ****/
package efw.i18n;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;

import efw.framework;

public final class I18nManager {
	/**
	 * ひとつのMsgを取得する。
	 * デバッグモードの場合、最終更新日時により再ロードするか否か判断する。
	 * 通常モードの場合、予めロード済みデータから、Msgを探す。
	 * @param lang 多国語ファイル名（拡張子を除く）。
	 * @param key キー。
	 * @param defaultValue 初期値。
	 * @return 値。
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
			String filename=framework.getI18nFolder()+"/"+lang+".xml";
			File fl=new File(filename);
			if (fl.exists()){
				Date fileLastModifytime = new Date(fl.lastModified());
				if(!fileLastModifytime.equals(prop.getLastModifytime())){
					return true;//xml file is modified, so it is need to reload
				}else{
					return false;//xml file is not modified
				}
			}else {
				return false;
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
			String filename=framework.getI18nFolder()+"/"+lang+".xml";
			File fl=new File(filename);
			if (fl.exists()){
				I18nProperties prop=new I18nProperties();
				prop.setLastModifytime(new Date(fl.lastModified()));
				FileInputStream strm;
				prop.loadFromXML(strm=new FileInputStream(fl));
				strm.close();
				props.put(lang,prop);
			}else {
				if ("en".equals(lang)||"jp".equals(lang)||"cn".equals(lang)) {
					I18nProperties prop=new I18nProperties();
					InputStream strm;
					prop.loadFromXML(strm=I18nManager.class.getResourceAsStream(lang+".xml"));
					strm.close();
					props.put(lang,prop);
				}
			}
		}catch(Exception e){
			//エラー時ダミーの多国語オブジェクトを作成する。
			//こうすればlang設定間違い時画面ロードのスピードがアップできる。
			I18nProperties prop=new I18nProperties();
			props.put(lang,prop);
			e.printStackTrace();//エラーを投げない。
		}
	}
	/**
	 * ロードするMsg外部化XMLファイルを格納するオブジェクト。
	 */
	private static final HashMap<String,I18nProperties> props=new HashMap<String,I18nProperties>();

}
