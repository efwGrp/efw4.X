/**** efw4.X Copyright 2019 efwGrp ****/
package efw.format;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import efw.framework;
import efw.properties.PropertiesManager;

/**
 * 数字と日付のフォーマットを管理するクラス。
 * @author Chang Kejun
 *
 */
public final class FormatManager {
	/**
	 * ロケール情報（西暦用）。
	 * 初期化時、システムデフォルトロケールを設定する。
	 */
	private static Locale locale;
	/**
	 * ロケール情報（和暦用）。
	 * 初期化時、ja_JP_JPで作成する。
	 */
	private static Locale localeJ;
	/**
	 * フォーマット関数用Rounder
	 */
	private static String formatRounderPro="HALF_EVEN";
	private static RoundingMode formatRounder=RoundingMode.HALF_EVEN;

    /**
     * フォーマット管理を初期化する。
     */
    public static void init(){
    	FormatManager.locale = Locale.getDefault();
    	FormatManager.localeJ = new Locale("ja","JP","JP");
    	FormatManager.formatRounderPro = PropertiesManager.getProperty(PropertiesManager.EFW_FORMAT_ROUNDER, FormatManager.formatRounderPro);
    	if("UP".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.UP;
    	}else if("DOWN".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.DOWN;
    	}else if("CEILING".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.CEILING;
    	}else if("FLOOR".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.FLOOR;
    	}else if("HALF_UP".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.HALF_UP;
    	}else if("HALF_DOWN".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.HALF_DOWN;
    	}else if("HALF_EVEN".equals(FormatManager.formatRounderPro)){
    		FormatManager.formatRounder=RoundingMode.HALF_EVEN;
    	}else{
    		FormatManager.formatRounder=RoundingMode.HALF_EVEN;
    	}
	}
    /**
     * 数字を指定フォーマットで文字列に変換する。
     * @param value　数字データ。
     * @param format 指定フォーマット。java.text.DecimalFormatを参照。
     * @param round 指定ROUND方式。java.mat.RoundingModeを参照。
     * 				UP、DOWN、CEILING、FLOOR、HALF_UP（四捨五入）、HALF_DOWN、HALF_EVEN
     * @return 変換後の文字列。
     */
    public static String formatNumber(Object value,String format,String round){
    	DecimalFormat df;
    	HashMap<String,DecimalFormat> map;
    	if ((map=framework.getNumberFormats())==null) {
    		map=new HashMap<String,DecimalFormat>();
    		framework.setNumberFormats(map);
    	}
    	if((df=map.get(format+"|"+round)) == null){
        	df=new DecimalFormat(format);
	    	if("UP".equals(round)){
	    		df.setRoundingMode(RoundingMode.UP);
	    	}else if("DOWN".equals(round)){
		    	df.setRoundingMode(RoundingMode.DOWN);
	    	}else if("CEILING".equals(round)){
		    	df.setRoundingMode(RoundingMode.CEILING);
	    	}else if("FLOOR".equals(round)){
		    	df.setRoundingMode(RoundingMode.FLOOR);
	    	}else if("HALF_UP".equals(round)){
		    	df.setRoundingMode(RoundingMode.HALF_UP);
	    	}else if("HALF_DOWN".equals(round)){
		    	df.setRoundingMode(RoundingMode.HALF_DOWN);
	    	}else if("HALF_EVEN".equals(round)){
		    	df.setRoundingMode(RoundingMode.HALF_EVEN);
	    	}else{
	    		df.setRoundingMode(FormatManager.formatRounder);
	    	}
        	map.put(format+"|"+round, df);
    	}
		return df.format(value);
    }
    /**
     * フォーマットされた文字列をフォーマット前の数字に戻す。
     * @param value フォーマットされた文字列。
     * @param format　指定フォーマット。java.text.DecimalFormatを参照。
     * @return　フォーマット前の数字。
     * @throws ParseException　変換エラー。
     */
    public static Number parseNumber(String value,String format) throws ParseException{
    	DecimalFormat df;
    	HashMap<String,DecimalFormat> map;
    	if ((map=framework.getNumberFormats())==null) {
    		map=new HashMap<String,DecimalFormat>();
    		framework.setNumberFormats(map);
    	}
    	if((df=map.get(format)) == null){//formatterの有り無しを判断。普通な場合、lockerにかからないように。
        	df=new DecimalFormat(format);
        	map.put(format, df);
    	}
    	Number num= df.parse(value);
    	if(format.indexOf("%")>-1){
    		num=(new BigDecimal(num.doubleValue())
    				.setScale(
    						df.getMaximumFractionDigits()+2,
    						RoundingMode.HALF_EVEN)
    				).doubleValue();
    	}
    	return num;
    }
    /**
     * 日付を指定フォーマットで文字列に変換する。
     * もし指定フォーマットに"G"がある場合(※例：GGGGy/MM/dd)、和暦として変換する。
     * @param value 日付データ。
     * @param format　指定フォーマット。java.text.SimpleDateFormatを参照。
     * @return　変換後の文字列。
     */
    public static String formatDate(Object value,String format){
    	DateFormat df;
    	HashMap<String,DateFormat> map;
    	if ((map=framework.getDateFormats())==null) {
    		map=new HashMap<String,DateFormat>();
    		framework.setDateFormats(map);
    	}
    	if((df=map.get(format)) == null){//formatterの有り無しを判断。普通な場合、lockerにかからないように。
    		if(format.indexOf("G")>-1){
	        	df=new SimpleDateFormat(format,FormatManager.localeJ);
    		}else{
	        	df=new SimpleDateFormat(format,FormatManager.locale);
    		}
        	map.put(format, df);
    	}
		return df.format(value);    	
    }
    /**
     * フォーマットされた文字列をフォーマット前の日付に戻す。
     * @param value フォーマットされた文字列。
     * @param format　指定フォーマット。java.text.SimpleDateFormatを参照。
     * @return　フォーマット前の数字。
     * @throws ParseException　変換エラー。
     */
    public static Date parseDate(String value,String format) throws ParseException{
    	DateFormat df;
    	HashMap<String,DateFormat> map;
    	if ((map=framework.getDateFormats())==null) {
    		map=new HashMap<String,DateFormat>();
    		framework.setDateFormats(map);
    	}
    	if((df=map.get(format)) == null){//formatterの有り無しを判断。普通な場合、lockerにかからないように。
			if(format.indexOf("G")>-1){
	        	df=new SimpleDateFormat(format,FormatManager.localeJ);
			}else{
	        	df=new SimpleDateFormat(format,FormatManager.locale);
			}
			map.put(format, df);
    	}
		return df.parse(value);    	
    }
}
