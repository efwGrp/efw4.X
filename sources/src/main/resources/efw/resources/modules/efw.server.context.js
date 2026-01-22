"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * アプリケーションコンテキストを操作するためのクラス。
 * サーバー内でのデータの共有や保持を管理します。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerContext() {
};

/**
 * コンテキストからデータを取得します。
 * 取得したデータがJSON形式の場合は自動的にJavaScriptオブジェクトに変換し、日付文字列もDateオブジェクトへ復元します。
 * @param {String} key - コンテキスト情報を識別するキー。
 * @returns {Any} 取得したデータ。
 */
EfwServerContext.prototype.get = function (key) {
	var value = Packages.efw.context.ContextManager.get(key);
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	} else {
		let valueType = typeof value;
		if (valueType == "string") {
			if (value.indexOf("JSON:") == 0) {
				value = JSON.parse(value.substring(5));
				value = this._restoreDate(value);
			}
		}
	}
	return value;
};

/**
 * コンテキストにデータを設定します。
 * JavaScriptオブジェクトは自動的にJSON文字列に変換されて保存されます。
 * @param {String} key - コンテキスト情報を識別するキー。
 * @param {Any} value - 設定するデータ。
 */
EfwServerContext.prototype.set = function (key, value) {
	//javaからapplication info に値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
	if (value == null) {
		//値がnullの場合処理を飛ばす
	} else {
		var valueType = typeof value;
		if (valueType == "object") {
			if (value.getClass) {
				//javaオブジェクトの場合そのまま
			} else {
				//javascript objectの場合JSON変換
				value = "JSON:" + JSON.stringify(value);
			}
			//javascriptの単純値の場合そのまま
		} else if (valueType == "string") {
		} else if (valueType == "boolean") {
		} else if (valueType == "number") {
		} else {
			Packages.efw.framework.runtimeWLog(valueType + " can not be set in session, the process will be ignored.");
			return;
		}
	}
	Packages.efw.context.ContextManager.set(key, value);
};

/**
 * コンテキストから指定された情報を削除します。
 * @param {String} key - 削除する情報のキー。
 */
EfwServerContext.prototype.remove = function (key) {
	Packages.efw.context.ContextManager.remove(key);
};

/**
 * JSONからパースされたオブジェクト内の日付文字列（ISO形式）を再帰的に走査し、Dateオブジェクトに復元します。
 * @param {Object} obj - 復元対象のオブジェクト。
 * @returns {Object} 復元後のオブジェクト。
 * @private
 */
EfwServerContext.prototype._restoreDate = function (obj) {
	if (obj == null) return obj;
	var oClone;
	switch (obj.constructor) {
		case String:
			if (obj.indexOf("T") == 10 && obj.indexOf("Z") == 23 && obj.indexOf("-") == 4) {
				oClone = new Date(obj);
				return oClone;
			} else {
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
 * コンテキスト操作用グローバルインスタンス。
 * @global
 */
var context = new EfwServerContext();