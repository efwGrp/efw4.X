"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * ビジネスルールエンジン（BRMS）を呼び出すためのクラス。
 * @author Chang kejun
 * @constructor
 */
function EfwServerBRMS() {
};

/**
 * ルールIDを指定してルールを実行し、結果を取得します。
 * @param {String} ruleId - 必須。ルールのID。
 * @param {Object} params - 必須。ルールに渡すパラメータ。{key: value, ...} の形式。
 * @param {Date} [ruleDate] - 任意。適用日。指定がない場合は当日が使用されます。
 * @returns {Record} 実行結果を格納したRecordオブジェクト。
 */
EfwServerBRMS.prototype.getRuleById = function (ruleId, params, ruleDate) {
	var values = this._executeQuery({
		"codeType": "CODETYPE_ID",
		"ruleIndentifier": ruleId,
		"params": params,
		"ruleDate": ruleDate,
	});
	return new Record(values);
};

/**
 * ルール名を指定してルールを実行し、結果を取得します。
 * @param {String} ruleName - 必須。ルールの名称。
 * @param {Object} params - 必須。ルールに渡すパラメータ。
 * @param {Date} [ruleDate] - 任意。適用日。
 * @returns {Record} 実行結果を格納したRecordオブジェクト。
 */
EfwServerBRMS.prototype.getRuleByName = function (ruleName, params, ruleDate) {
	var values = this._executeQuery({
		"codeType": "CODETYPE_NAME",
		"ruleIndentifier": ruleName,
		"params": params,
		"ruleDate": ruleDate,
	});
	return new Record(values);
};

/**
 * エイリアスを指定してルールを実行し、結果を取得します。
 * @param {String} ruleAlias - 必須。ルールの別名（Alias）。
 * @param {Object} params - 必須。ルールに渡すパラメータ。
 * @param {Date} [ruleDate] - 任意。適用日。
 * @returns {Record} 実行結果を格納したRecordオブジェクト。
 */
EfwServerBRMS.prototype.getRuleByAlias = function (ruleAlias, params, ruleDate) {
	var values = this._executeQuery({
		"codeType": "CODETYPE_ALIAS",
		"ruleIndentifier": ruleAlias,
		"params": params,
		"ruleDate": ruleDate,
	});
	return new Record(values);
};

///////////////////////////////////////////////////////////////////////////////

/**
 * ルールエンジンを実行する内部関数です。
 * JSの型（Number等）をJavaが要求する型（Double等）に変換してBRMSを呼び出します。
 * * @param {Object} executionParams - 実行パラメータ。
 * @param {String} executionParams.codeType - 識別子の種類（ID/NAME/ALIAS）。
 * @param {String} executionParams.ruleIndentifier - 識別子。
 * @param {Object} executionParams.params - 入力パラメータ。
 * @param {Date} [executionParams.ruleDate] - 適用日。
 * @returns {Array<Object>} 取得した行データの配列。
 * @private
 */
EfwServerBRMS.prototype._executeQuery = function (executionParams) {
	var codeType = executionParams.codeType;
	var ruleIndentifier = executionParams.ruleIndentifier;
	var ruleDate;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	if (executionParams.ruleDate != null) {
		ruleDate = executionParams.ruleDate.format("yyyy-MM-dd");
	} else {
		ruleDate = (new Date()).format("yyyy-MM-dd");
	}
	for (var key in aryParam) {
		var vl = aryParam[key];

		if (null == vl) {//null is not equals to ""
			params.put(key, vl);
		} else if (typeof (vl) == "string") {
			params.put(key, vl);
		} else if (typeof (vl) == "number") {
			params.put(key, vl * 1.0);//change the value to double,because brms only accepts double
		} else if (vl instanceof Array) {
			var aryparams = new java.util.ArrayList();
			for (var i = 0; i < vl.length; i++) {
				if (typeof (vl[i]) == "number") {
					aryparams.add(vl[i] * 1.0);//change the value to double,because brms only accepts double
				} else {
					aryparams.add(vl[i]);
				}

			}
			params.put(key, aryparams);
		}
	}

	var rs = null;
	if (codeType == "CODETYPE_ID") { rs = Packages.efw.brms.BrmsManager.getRuleById(ruleIndentifier, ruleDate, params); }
	if (codeType == "CODETYPE_NAME") { rs = Packages.efw.brms.BrmsManager.getRuleByName(ruleIndentifier, ruleDate, params); }
	if (codeType == "CODETYPE_ALIAS") { rs = Packages.efw.brms.BrmsManager.getRuleByAlias(ruleIndentifier, ruleDate, params); }

	var ret = [];
	var meta = rs.getMetaData();
	var parseValue = function (rs, idx) {
		var value = null;
		if (meta.getColumnType(idx) == 1) {//com.innoexpert.rulesclient.Constants.TYPE_NUMBER
			value = 0 + new Number(rs.getDouble(idx));
		} else if (meta.getColumnType(idx) == 2) {//com.innoexpert.rulesclient.Constants.TYPE_STRING
			value = "" + rs.getString(idx);
		} else if (meta.getColumnType(idx) == 3) {//com.innoexpert.rulesclient.Constants.TYPE_BOOLEAN
			value = true && rs.getBoolean(idx);
		}
		return value;
	};
	// change recordset to java array
	while (rs.next()) {
		var rsdata = {};
		var maxColumnCount = meta.getColumnCount();
		for (var j = 1; j <= maxColumnCount; j++) {
			var key = meta.getColumnName(j);
			rsdata[key] = parseValue(rs, j);
		}
		ret.push(rsdata);
	}
	return ret;
};

///////////////////////////////////////////////////////////////////////////////
/**
 * BRMS連携用グローバルインスタンス。
 * @global
 */
var brms = new EfwServerBRMS();