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
