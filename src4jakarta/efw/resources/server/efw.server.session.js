"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
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
	var value= Packages.efw.framework.getRequest().getSession().getAttribute(key);
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	}else{
		var valueType=typeof value;
		//if (valueType == "string") {
			//以下タイプは自動的に文字と見なす
			//java.lang.String
		//}else if (valueType == "number") {
			//以下タイプは自動的に数字と見なす
			//java.lang.Byte
			//java.lang.Double
			//java.lang.Float
			//java.lang.Integer
			//java.lang.Short
		//}else if (valueType == "boolean") {
			//以下タイプは自動的にブールと見なす
			//java.lang.Boolean
		if (valueType == "object" && value.getClass) {
			var clsName=value.getClass().getName();
			if(clsName=="java.lang.Long"
					|| clsName=="java.math.BigDecimal"){
				value = 0 + new Number(value);//new Numberはdebug関数を付けていないため+0にする
			} else if (clsName == "java.sql.Date"
					|| clsName == "java.sql.Time"
					|| clsName == "java.sql.Timestamp"
					|| clsName == "java.util.Date") {
				var dt = new Date();
				dt.setTime(value.getTime());
				value = dt;
			} else if (clsName == "oracle.sql.TIMESTAMP"){
				var dt = new Date();
				dt.setTime(value.timestampValue().getTime());
				value = dt;
			//}else{//他のクラスの場合そのまま
			}
		//}else{//javascript objectの場合そのまま
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
	Packages.efw.framework.getRequest().getSession().setAttribute(key, value);
};
/**
 * The function to create a new session.
 */
EfwServerSession.prototype.create = function() {
	Packages.efw.framework.getRequest().getSession(true);
};
/**
 * The function to invalidate the current session.
 */
EfwServerSession.prototype.invalidate = function() {
	Packages.efw.framework.getRequest().getSession().invalidate();
};
