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
	if (value == null)
		return "";// it value is not null, return ""
	if (!value.getTime)
		return "";// if value is not date, return ""
	
	
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
	dt.setTime(Packages.efw.format.FormatManager.parseDate(value, formatter)
			.getTime());
	return dt;
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to format the Number self to String. 
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
Number.prototype.format=function(formatter, rounder){
	return EfwServerFormat.prototype.formatNumber(this,formatter, rounder);
};
/**
 * The function to parse the value to Number.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Number}
 */
Number.parse=function(value,formatter){
	if(formatter==null){
		return new Number(value);
	}else{
		return EfwServerFormat.prototype.parseNumber(value, formatter); 
	}
};
/**
 * The function to format the Date self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Date.prototype.format=function(formatter){
	return EfwServerFormat.prototype.formatDate(this,formatter);
};
/**
 * The function to parse the value to Date.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Date}
 */
Date.parse=function(value,formatter){
	if(formatter==null){
		return (new Date(value)).getTime();
	}else{
		return EfwServerFormat.prototype.parseDate(value, formatter); 
	}
};
/**
 * The function to get years to now. 
  * @param {Date} current: optional<br>
 * @returns {Number}
 */
Date.prototype.getYears=function(current){
	if (current==null)current=new Date();
	var diff=Number.parse(current.format("yyyyMMdd"),"0")-Number.parse(this.format("yyyyMMdd"),"0");
	return Math.floor(diff/10000);
};
