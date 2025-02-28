"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to format Date or Number in server.
 * 
 * @author Chang Kejun<br>
 *         the value of rounder:
 * 
 */
function EfwServerFormat() {
};
/**
 * The function to format Number to String.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
EfwServerFormat.prototype.formatNumber = function(value, formatter, rounder) {
	  var isFullWidth =false;
	  if (formatter.indexOf("０")>-1 || formatter.indexOf("＃")>-1){
					isFullWidth=true;
					formatter=formatter
					.replace(/０/g,"0")
					.replace(/＃/g,"#")
					.replace(/，/,",")
					.replace(/．/,".")
					.replace(/％/,"%");
					
	  }
	  value = Number(value);
	  if (isNaN(value))
					return "";// if it is not number return ""
	  var ret= ""+Packages.efw.format.FormatManager.formatNumber(value, formatter,
															  rounder);
	  if(isFullWidth){
					ret=ret
					.replace(/0/g,"０")
					.replace(/1/g,"１")
					.replace(/2/g,"２")
					.replace(/3/g,"３")
					.replace(/4/g,"４")
					.replace(/5/g,"５")
					.replace(/6/g,"６")
					.replace(/7/g,"７")
					.replace(/8/g,"８")
					.replace(/9/g,"９")
					.replace(/[\,]/g,"，")
					.replace(/[\.]/g,"．")
					.replace(/[\-]/g,"－")
					.replace(/[\%]/g,"％")
					;
	  }
	  return ret;
};

/**
 * The function to parse String to Number.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Number}
 */
EfwServerFormat.prototype.parseNumber = function(value, formatter) {
	value += ""; // change value to string if it is a number
	if (!value)
		return null; // if value is blank return null
	return 0 + new Number(Packages.efw.format.FormatManager.parseNumber(value,
			formatter));
};
/**
 * The function to format Date to String.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
EfwServerFormat.prototype.formatDate = function(value, formatter) {
	if (value == null)
		return "";// it value is not null, return ""
	if (!value.getTime)
		return "";// if value is not date, return ""

	if (formatter=="JSON_DATE"){
		return JSON.stringify(value).replace(/"/g,"");
	}
	var isFullWidth =false;
	if (formatter.indexOf("Ｇ")>-1 || formatter.indexOf("ｙ")>-1
			|| formatter.indexOf("Ｍ")>-1|| formatter.indexOf("ｄ")>-1
			|| formatter.indexOf("Ｈ")>-1|| formatter.indexOf("ｍ")>-1
			|| formatter.indexOf("ｓ")>-1|| formatter.indexOf("Ｓ")>-1){
			isFullWidth=true;
			formatter=formatter
			.replace(/Ｇ/g,"G")
			.replace(/ｙ/g,"y")
			.replace(/Ｍ/g,"M")
			.replace(/ｄ/g,"d")
			.replace(/Ｈ/g,"H")
			.replace(/ｍ/g,"m")
			.replace(/ｓ/g,"s")
			.replace(/Ｓ/g,"S")
			;	
	}
	
	var ret = "" + Packages.efw.format.FormatManager.formatDate(value.getTime(),
					formatter);
	if(isFullWidth){
			ret=ret
			.replace(/0/g,"０")
			.replace(/1/g,"１")
			.replace(/2/g,"２")
			.replace(/3/g,"３")
			.replace(/4/g,"４")
			.replace(/5/g,"５")
			.replace(/6/g,"６")
			.replace(/7/g,"７")
			.replace(/8/g,"８")
			.replace(/9/g,"９")
			.replace(/M/g,"Ｍ")
			.replace(/T/g,"Ｔ")
			.replace(/S/g,"Ｓ")
			.replace(/H/g,"Ｈ")
			;
    }
	return ret;
		
};
/**
 * The function to parse String to Date.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Date}
 */
EfwServerFormat.prototype.parseDate = function(value, formatter) {
	value += ""; // change value to string if it is not string
	if (!value)
		return null; // if value is blank return null
	var dt = new Date();
	if (formatter=="JSON_DATE"){//clientからjsonの日付を送ってくれる場合の対応
		return new Date(value);
	}
	dt.setTime(Packages.efw.format.FormatManager.parseDate(value, formatter)
			.getTime());
	return dt;
};
/**
 * The function to format any value to Enum string.
 * 
 * @param {Any}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
EfwServerFormat.prototype.formatEnum = function(value, formatter) {
	var _value=""+value;
	if (formatter==null) return _value;//formatter未設定の場合文字列に変換するだけ。
	if (formatter.indexOf("{")!=0) return _value;
	if (formatter.lastIndexOf("}")!=formatter.length-1) return _value;
	formatter=formatter.substring(1,formatter.length-1);
	var ary=formatter.split(",");
	for(var i=0;i<ary.length;i++){
		var item=ary[i].split("=");
		if (item.length!=2) return _value;//formatterはただしくない場合文字列に変換するだけ。
		var nm=item[0];
		var cd=item[1];
		if (cd.indexOf("'")==0&&cd.lastIndexOf("'")==cd.length-1){
			cd=cd.substring(1,cd.length-1);
		}
		if (_value==cd) return item[0];
		if (!isNaN(cd)) cd=""+new Number(cd);//数字と日付は書き方により違い発生するため、変換してから比較
		if (_value==cd) return item[0];
		if (!isNaN(new Date(cd)))cd=""+ new Date(cd);
		if (_value==cd) return item[0];
	}
	return "";
};
/**
 * The function to parse String to Enum.
 * 
 * @param {Boolean}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Boolean}
 */
EfwServerFormat.prototype.parseEnum = function(value, formatter) {
	var _value=""+value;
	if (formatter==null) return _value;//formatter未設定の場合文字列に変換するだけ。
	if (formatter.indexOf("{")!=0) return _value;
	if (formatter.lastIndexOf("}")!=formatter.length-1) return _value;
	formatter=formatter.substring(1,formatter.length-1);
	var ary=formatter.split(",");
	for(var i=0;i<ary.length;i++){
		var item=ary[i].split("=");
		if (item.length!=2) return _value;//formatterはただしくない場合文字列に変換するだけ。
		var nm=item[0];
		var cd=item[1];
		if (_value==nm) {
			if ((cd.indexOf("'")==0&&cd.lastIndexOf("'")==cd.length-1)||
			(cd.indexOf("\"")==0&&cd.lastIndexOf("\"")==cd.length-1)){
				return cd.substring(1,cd.length-1);
			}else{
				if (cd=="true")return true;
				if (cd=="false")return false;
				if (!isNaN(cd))return 0+new Number(cd);
				if (!isNaN(new Date(cd)))return new Date(cd);
				return cd;
			}
		}
	}
	return null;
};