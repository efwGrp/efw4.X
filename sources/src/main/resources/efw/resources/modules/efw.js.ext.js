"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
/**
 * Add clone function to JSON for deep copy
 */
JSON.clone = function(obj,execFuncFlag) {//TODO
	if (obj === null || obj === undefined) { // null copy
		return obj;
	} else if (typeof obj == "function") { // function executed value
		if (execFuncFlag){
			return obj();
		}else{
			return obj;
		}
	} else if (typeof obj !== "object") { // simple value copy
		return obj;
	}
	var oClone;
	switch (obj.constructor) {
	case RegExp:
		oClone = new RegExp(obj.source, "g".substr(0, Number(obj.global)) + "i".substr(0, Number(obj.ignoreCase)) + "m".substr(0, Number(obj.multiline)));
		break;
	case Date:
		oClone = new Date(obj.getTime());
		break;
	case String:
		oClone = "" + obj;
		break;
	case Boolean:
		oClone = false && obj;
		break;
	case Number:
		oClone = 0 + obj;
		break;
	case Array:
		oClone = [];
		for (var sProp in obj) {
			oClone[sProp] = JSON.clone(obj[sProp],execFuncFlag); 
		}
		break;
	// etc.
	default:
		oClone = {};
		for (var sProp in obj) {
			oClone[sProp] = JSON.clone(obj[sProp],execFuncFlag); 
		}
	}
	return oClone;
};
///////////////////////////////////////////////////////////////////////////////
String.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return ""+this;
};
Object.defineProperty(String.prototype,"debug",{enumerable:false});
Number.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return 0+this;
};
Object.defineProperty(Number.prototype,"debug",{enumerable:false});
Boolean.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return this && true;
};
Object.defineProperty(Boolean.prototype,"debug",{enumerable:false});
Date.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return new Date(this.getTime());
};
Object.defineProperty(Date.prototype,"debug",{enumerable:false});
Array.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an array.");
	java.lang.System.out.println(JSON.stringify(this));
	return this;
};
Object.defineProperty(Array.prototype,"debug",{enumerable:false});
Function.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is a function.");
	return this;
};
Object.defineProperty(Function.prototype,"debug",{enumerable:false});
Object.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an object.");
	try{
		java.lang.System.out.println(JSON.stringify(this));
	}catch(e){
		if (e instanceof Error)e=""+e;
		java.lang.System.out.println(""+Packages.efw.framework.getUsefulInfoFromException(e));
	}
	return this;
};
Object.defineProperty(Object.prototype,"debug",{enumerable:false});
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to encode the string by base64.
 * @returns {String}
 */
String.prototype.base64Encode=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlEncoder().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype,"base64Encode",{enumerable:false});
/**
 * The function to encode the string by base64 for URI.
 * @returns {String}
 */
String.prototype.base64EncodeURI=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlEncoder().withoutPadding().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype,"base64EncodeURI",{enumerable:false});
/**
 * The function to decode a encoded String by base64.
 * @returns {String}
 */
String.prototype.base64Decode=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlDecoder().decode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype,"base64Decode",{enumerable:false});
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
	if (formatter.indexOf("{")==0&&formatter.lastIndexOf("}")==formatter.length-1){
		return EfwServerFormat.prototype.formatEnum(this,formatter);
	}else{
		return EfwServerFormat.prototype.formatNumber(this,formatter, rounder);
	}
};
Object.defineProperty(Number.prototype,"format",{enumerable:false});
/**
 * The function to parse the value to Number.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Number}
 */
Number.parse=function(value,formatter){
	if(formatter==null){
		return 0+new Number(value);
	}else if (formatter.indexOf("{")==0&&formatter.lastIndexOf("}")==formatter.length-1){
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	}else{
		return EfwServerFormat.prototype.parseNumber(value, formatter); 
	}
};
Object.defineProperty(Number,"parse",{enumerable:false});
/**
 * The function to format the Date self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Date.prototype.format=function(formatter){
	if (formatter.indexOf("{")==0&&formatter.lastIndexOf("}")==formatter.length-1){
		return EfwServerFormat.prototype.formatEnum(this,formatter);
	}else{
		return EfwServerFormat.prototype.formatDate(this,formatter);
	}
};
Object.defineProperty(Date.prototype,"format",{enumerable:false});
/**
 * The function to parse the value to Date.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Date}
 */
Date.parse=function(value,formatter){
	if(formatter==null){
		return (new Date(value)).getTime();
	}else if (formatter.indexOf("{")==0&&formatter.lastIndexOf("}")==formatter.length-1){
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	}else{
		return EfwServerFormat.prototype.parseDate(value, formatter); 
	}
};
Object.defineProperty(Date,"parse",{enumerable:false});
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
Object.defineProperty(Date.prototype,"getYears",{enumerable:false});
/**
 * The function to format the Boolean self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Boolean.prototype.format=function(formatter){
	return EfwServerFormat.prototype.formatEnum(this,formatter);
};
Object.defineProperty(Boolean.prototype,"format",{enumerable:false});
/**
 * The function to parse the value to Boolean.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Boolean}
 */
Boolean.parse=function(value,formatter){
	if(formatter==null){
		return true && new Boolean(value);
	}else{
		return EfwServerFormat.prototype.parseEnum(value, formatter); 
	}
};
Object.defineProperty(Boolean,"parse",{enumerable:false});

/**
 * The function to format the String self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
String.prototype.format=function(formatter){
	return EfwServerFormat.prototype.formatEnum(this,formatter);
};
Object.defineProperty(String.prototype,"format",{enumerable:false});
/**
 * The function to parse the value to String.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Boolean}
 */
String.parse=function(value,formatter){
	if(formatter==null){
		return value;
	}else{
		return EfwServerFormat.prototype.parseEnum(value, formatter); 
	}
};
Object.defineProperty(String,"parse",{enumerable:false});

///////////////////////////////////////////////////////////////////////////////
/**
 * 四捨五入
 */
Math.ROUND=function(num, digit){
	var sign =  num < 0 ? -1 : 1;
	var digitVal = Math.pow( 10, digit );
	return Math.round( num * sign * digitVal ) * sign/ digitVal;
};
/**
 * 切上げ
 */
Math.ROUNDUP=function(num, digit){
	var sign =  num < 0 ? -1 : 1;
	var digitVal = Math.pow( 10, digit );
	return Math.ceil( num * sign * digitVal ) *sign / digitVal;
};
/**
 * 切捨て
 */
Math.ROUNDDOWN=function(num, digit){
	var sign =  num < 0 ? -1 : 1;
	var digitVal = Math.pow( 10, digit );
	return Math.floor( num * sign * digitVal ) * sign/ digitVal;
};
