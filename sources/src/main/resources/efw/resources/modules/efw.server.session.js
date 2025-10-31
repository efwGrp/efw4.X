"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate session.
 * 
 * @author Chang Kejun
 */
function EfwServerSession() {
};
/**
 * The function to get data from session.
 * 
 * @param {String}
 *            key: the session key.
 * @returns {Any}
 */
EfwServerSession.prototype.get = function(key) {
	var value= Packages.efw.util.JavaxJakartaUtil.getSession().getAttribute(key);
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	}else{
		let valueType=typeof value;
		if (valueType == "string"){
			if (value.indexOf("JSON:")==0){
				value=JSON.parse(value.substring(5));
				value=EfwServerSession._restoreDate(value);
			}
		}
	}
	return value;
};
/**
 * The function to set data in session.
 * 
 * @param {String}
 *            key: the session key.
 * @param {Any}
 *            value: the data you want to set in session.
 */
EfwServerSession.prototype.set = function(key, value) {
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	}else{
		var valueType=typeof value;
		if (valueType == "object") {
			if (value.getClass){
				//javaオブジェクトの場合そのまま
			}else{
				//javascript objectの場合JSON変換
				value ="JSON:"+JSON.stringify(value);
			}
		//javascriptの単純値の場合そのまま
		}else if (valueType == "string") {
		}else if (valueType == "boolean") {
		}else if (valueType == "number") {
		}else{
			Packages.efw.framework.runtimeWLog(valueType +" can not be set in session, the process will be ignored.");
			return;
		}
	}
	Packages.efw.util.JavaxJakartaUtil.getSession().setAttribute(key, value);
};
/**
 * The function to create a new session.
 */
EfwServerSession.prototype.create = function() {
	Packages.efw.framework.getRequest().getSession(true);//This must be called by http
};
/**
 * The function to invalidate the current session.
 */
EfwServerSession.prototype.invalidate = function() {
	Packages.efw.util.JavaxJakartaUtil.getSession().invalidate();
};


EfwServerSession.prototype._restoreDate=function(obj){
	if (obj==null) return obj;
	var oClone;
	switch (obj.constructor) {
	case String:
		if (obj.indexOf("T")==10&&obj.indexOf("Z")==23&&obj.indexOf("-")==4){
			oClone=new Date(obj);
			return oClone;
		}else{
			return obj;
		}
	case Array:
		oClone = [];
		for (var sProp in obj) {
			oClone[sProp] = EfwServerSession._restoreDate(obj[sProp]); 
		}
		return oClone;
	case Object:
		oClone = {};
		for (var sProp in obj) {
			oClone[sProp] = EfwServerSession._restoreDate(obj[sProp]); 
		}
		return oClone;
	default:
		return obj;
	}
};
///////////////////////////////////////////////////////////////////////////////
/**
 * create instances.
 */
var session = new EfwServerSession();

