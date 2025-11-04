"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate context.
 * 
 * @author Chang Kejun
 */
function EfwServerContext() {
};
/**
 * The function to get data from context.
 * 
 * @param {String}
 *            key: the context info key.
 * @returns {Any}
 */
EfwServerContext.prototype.get = function(key) {
	var value= Packages.efw.context.ContextManager.get(key);
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	}else{
		let valueType=typeof value;
		if (valueType == "string"){
			if (value.indexOf("JSON:")==0){
				value=JSON.parse(value.substring(5));
				value=this._restoreDate(value);
			}
		}
	}
	return value;
};
/**
 * The function to set data in context.
 * 
 * @param {String}
 *            key: the context info key.
 * @param {Any}
 *            value: the data you want to set in context.
 */
EfwServerContext.prototype.set = function(key, value) {
	//javaからapplication info に値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
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
	Packages.efw.context.ContextManager.set(key, value);
};
/**
 * The function to remove a context info.
 */
EfwServerContext.prototype.remove = function(key) {
	Packages.efw.context.ContextManager.remove(key);
};

EfwServerContext.prototype._restoreDate=function(obj){
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
			oClone[sProp] = this._restoreDate(obj[sProp]); 
		}
		return oClone;
	case Object:
		oClone = {};
		for (var sProp in obj) {
			oClone[sProp] = this._restoreDate(obj[sProp]); 
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
var context = new EfwServerContext();

