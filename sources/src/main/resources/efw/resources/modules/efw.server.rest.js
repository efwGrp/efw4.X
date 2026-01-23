"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * RESTサービスにアクセスするためのクラス。
 * 外部APIとの通信（GET, POST, PUT, DELETE）を管理します。
 *
 * @author lndljack
 * @constructor
 */
function EfwServerRest() {

}

/**
 * RESTサービスからデータを取得（GET）します。
 * @param {String} apiUrl - 接続先のAPI URL。
 * @param {Object} [heads] - 必須ではない。HTTPヘッダーのキー・バリュー。
 * @returns {Object|null} レスポンスのJSONオブジェクト。空の場合はnull。
 */
EfwServerRest.prototype.get = function (apiUrl, heads) {
	var mapHeads = new java.util.HashMap();
	if (heads != null) {
		for (var key in heads) {
			mapHeads.put(key, heads[key]);
		}
	}
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl, "GET", "", mapHeads);
	if (strRtnVal == "") {
		return null;
	} else {
		return JSON.parse(strRtnVal);
	}
};

/**
 * RESTサービスへデータを送信（POST）します。
 * @param {String} apiUrl - 接続先のAPI URL。
 * @param {Object} params - 送信するデータオブジェクト。
 * @param {Object} [heads] - HTTPヘッダー。
 * @returns {Object|null} レスポンスのJSONオブジェクト。
 */
EfwServerRest.prototype.post = function (apiUrl, params, heads) {
	var mapHeads = new java.util.HashMap();
	if (heads != null) {
		for (var key in heads) {
			mapHeads.put(key, heads[key]);
		}
	}
	var strJson = JSON.stringify(params);
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl, "POST", strJson, mapHeads);
	if (strRtnVal == "") {
		return null;
	} else {
		return JSON.parse(strRtnVal);
	}
};

/**
 * RESTサービスへデータを更新送信（PUT）します。
 * @param {String} apiUrl - 接続先のAPI URL。
 * @param {Object} params - 更新するデータオブジェクト。
 * @param {Object} [heads] - HTTPヘッダー。
 * @returns {Object|null} レスポンスのJSONオブジェクト。
 */
EfwServerRest.prototype.put = function (apiUrl, params, heads) {
	var mapHeads = new java.util.HashMap();
	if (heads != null) {
		for (var key in heads) {
			mapHeads.put(key, heads[key]);
		}
	}
	var strJson = JSON.stringify(params);
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl, "PUT", strJson, mapHeads);
	if (strRtnVal == "") {
		return null;
	} else {
		return JSON.parse(strRtnVal);
	}
};

/**
 * RESTサービスからリソースを削除（DELETE）します。
 * @param {String} apiUrl - 接続先のAPI URL。
 * @param {Object} [heads] - HTTPヘッダー。
 * @returns {Object|null} レスポンスのJSONオブジェクト。
 */
EfwServerRest.prototype.delete = function (apiUrl, heads) {
	var mapHeads = new java.util.HashMap();
	if (heads != null) {
		for (var key in heads) {
			mapHeads.put(key, heads[key]);
		}
	}
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl, "DELETE", "", mapHeads);
	if (strRtnVal == "") {
		return null;
	} else {
		return JSON.parse(strRtnVal);
	}
};

/**
 * 直近のREST呼び出し結果のHTTPステータスコードを取得します。
 * @returns {Number} HTTPステータスコード（200, 404, 500など）。
 */
EfwServerRest.prototype.getStatus = function () {
	return 0 + Packages.efw.rest.RestManager.getStatus();
}

///////////////////////////////////////////////////////////////////////////////
/**
 * REST操作用グローバルインスタンス。
 * @global
 */
var rest = new EfwServerRest();