"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * セッション操作を管理するクラス。
 * データの保持、取得、および型変換（JSON/Date）を自動で行います。
 * * @author Chang Kejun
 * @constructor
 */
function EfwServerSession() {
};

/**
 * セッションからデータを取得します。
 * JSON文字列として保存されている場合は、自動的にJavaScriptオブジェクトに変換し、日付型も復元します。
 * * @param {String} key - セッションキー。
 * @returns {Any} 保存されている値。
 */
EfwServerSession.prototype.get = function (key) {
	var value = Packages.efw.util.JavaxJakartaUtil.getSession().getAttribute(key);
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
 * セッションにデータを設定します。
 * JavaScriptオブジェクトは「JSON:」プレフィックス付きの文字列に変換して保存されます。
 * * @param {String} key - セッションキー。
 * @param {Any} value - 保存する値。
 */
EfwServerSession.prototype.set = function (key, value) {
	//javaからsessionに値を設定して、efwからそれを取る場合を考慮して以下の処理を行う
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
	Packages.efw.util.JavaxJakartaUtil.getSession().setAttribute(key, value);
};

/**
 * 新しいセッションを作成します。
 */
EfwServerSession.prototype.create = function () {
	Packages.efw.framework.getRequest().getSession(true);//This must be called by http
};

/**
 * 現在のセッションを無効化（破棄）します。
 */
EfwServerSession.prototype.invalidate = function () {
	Packages.efw.util.JavaxJakartaUtil.getSession().invalidate();
};

/**
 * オブジェクト内のISO形式の日付文字列をDateオブジェクトに再帰的に変換します。
 * * @param {Object} obj - 変換対象のオブジェクト。
 * @returns {Object} 変換後のオブジェクト。
 * @private
 */
EfwServerSession.prototype._restoreDate = function (obj) {
	if (obj == null) return obj;
	var oClone;
	switch (obj.constructor) {
		case String:
			// ISO 8601形式（yyyy-MM-ddTHH:mm:ss.sssZ）を判定してDate化
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
 * セッション操作用グローバルインスタンス。
 * @global
 */
var session = new EfwServerSession();