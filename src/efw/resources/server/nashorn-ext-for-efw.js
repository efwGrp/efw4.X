"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
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
			if (sProp=="debug") continue;// debug function is skipped
			oClone[sProp] = JSON.clone(obj[sProp],execFuncFlag); 
		}
		break;
	// etc.
	default:
		oClone = {};
		for (var sProp in obj) {
			if (sProp=="debug") continue;// debug function is skipped
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
	return EfwServerFormat.prototype.formatNumber(this,formatter, rounder);
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
		return new Number(value);
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
	return EfwServerFormat.prototype.formatDate(this,formatter);
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
///////////////////////////////////////////////////////////////////////////////
/**
 * Eval script in another engine context,and return several values.
 */
(function(context){
	//name:{max:10,scs:[{running:true,_sc:objSimpleScriptContext},]}
	var pool={};
	var _locker = new java.util.concurrent.locks.ReentrantLock();
	//param={name:"",max:9,initializer:"",script:"",context:{}}
	function loadWithGlobalPool(param){
		var name=param.name;
		var max=new Number(param.max);
		var initializer=param.initializer;
		var script=param.script;
		var context=param.context;
		if (name==null)name="default";
		if (isNaN(max))max=10;
		if (initializer==null)initializer="";
		if (script==null)script="";
		var borrowed=null;
		_locker.lock();
		try{
			while(true){
				if (pool[name]==null){
					pool[name]={max:max,scs:[]};
				}
				var scs=pool[name].scs;
				var max=pool[name].max;
				for(var i=0;i<scs.length;i++){
					var sc=scs[i];
					if (sc.running==false){
						borrowed=sc;
						scs.splice(i,1);
						scs.push(borrowed);
						break;
					}
				}
				if (borrowed!=null){
					borrowed.running=true;
					break;
				}else if (scs.length<max){
					borrowed={running:true,_sc:new javax.script.SimpleScriptContext()}
					var innerScript="";
					innerScript+="var _isdebug="+_isdebug+";\n";
					innerScript+="var _eventfolder='"+_eventfolder+"';\n";
					innerScript+="load('classpath:efw/resources/server/efw.server.format.js');\n";
					innerScript+="load('classpath:efw/resources/server/nashorn-ext-for-es6.min.js');\n";
					innerScript+="load('classpath:efw/resources/server/nashorn-ext-for-efw.js');\n";
					Packages.efw.script.ScriptManager.se().eval(innerScript,borrowed._sc);
					for(var key in context){
						borrowed._sc.setAttribute(key, context[key], javax.script.ScriptContext.ENGINE_SCOPE);
					}
					Packages.efw.script.ScriptManager.se().eval(initializer,borrowed._sc);
					scs.push(borrowed);
					break;
				}else{
					java.lang.Thread.sleep(50);
				}
			}
		}finally{
			_locker.unlock();
		}
		try{
			for(var key in context){
				borrowed._sc.setAttribute(key, context[key], javax.script.ScriptContext.ENGINE_SCOPE);
			}
			return Packages.efw.script.ScriptManager.se().eval(script,borrowed._sc);
		}finally{
			borrowed.running=false;
		}
	}
	context.loadWithGlobalPool=loadWithGlobalPool;
})(new Function('return this')());
