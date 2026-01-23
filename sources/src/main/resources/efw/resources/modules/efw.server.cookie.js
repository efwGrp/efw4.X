"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * クッキー（Cookie）を操作するためのクラス。
 * クライアントのブラウザにデータを一時保持または取得するために使用します。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerCookie() {
};

/**
 * 指定されたキーに対応する値をクッキーから取得します。
 * @param {String} key - 取得したいクッキーのキー名。
 * @returns {String|null} クッキーの値。存在しない場合は null を返します。
 */
EfwServerCookie.prototype.get = function (key) {
	var value = Packages.efw.cookie.CookieManager.get(key);
	if (value == null) {
		value = null;
	} else {
		// JavaのStringオブジェクトをJavaScriptの文字列に明示的に変換
		value = "" + value;
	}
	return value;
};

/**
 * 指定されたキーと値をクッキーに設定（保存）します。
 * @param {String} key - 設定するクッキーのキー名。
 * @param {String} value - 設定する値。内部で文字列に変換されます。
 */
EfwServerCookie.prototype.set = function (key, value) {
	// JavaScriptの値を文字列化してJavaマネージャーに渡す
	Packages.efw.cookie.CookieManager.set(key, "" + value);
};

///////////////////////////////////////////////////////////////////////////////
/**
 * クッキー操作用グローバルインスタンス。
 * @global
 */
var cookie = new EfwServerCookie();