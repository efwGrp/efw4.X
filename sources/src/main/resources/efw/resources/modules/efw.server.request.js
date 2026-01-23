"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * リクエスト情報を操作するためのクラス。
 * 主に遷移元URL（Referer）に含まれるパラメータの取得と加工を行います。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerRequest() {
};

/**
 * リクエスト（Referer URL）から指定されたキーに対応する値を取得します。
 * 取得時に禁則文字のチェックおよび置換を自動的に行います。
 * @param {String} key - 取得したいパラメータのキー名。
 * @returns {Any} デコードおよび禁則文字置換済みの値。パラメータが存在しない場合は null。
 */
EfwServerRequest.prototype.get = function (key) {
	// Javaのユーティリティ経由でReferer URLを取得
	var url = Packages.efw.util.JavaxJakartaUtil.getReferer();

	/**
	 * URL文字列からパラメータを抽出する内部関数
	 */
	function getParam(url, name) {
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';

		// URLデコード処理
		var value = decodeURIComponent(results[2].replace(/\+/g, " "));

		// 禁則文字の定義をシステムプロパティから取得
		var characters = Packages.efw.properties.PropertiesManager.getProperty(
			Packages.efw.properties.PropertiesManager.EFW_FORBIDDEN_CHARACTERS, "");
		var replacement = Packages.efw.properties.PropertiesManager.getProperty(
			Packages.efw.properties.PropertiesManager.EFW_FORBIDDEN_REPLACEMENT, "");

		characters = characters.split("");
		replacement = replacement.split("");

		// 禁則文字の置換処理を実行
		for (var i = 0; i < characters.length; i++) {
			var chr = characters[i];
			var rpl = replacement[i];
			if (rpl == null) rpl = "";
			value = value.replace(new RegExp("[" + chr + "]", "g"), rpl);
		}
		return value;
	}

	return getParam(url, key);
};

///////////////////////////////////////////////////////////////////////////////
/**
 * リクエスト操作用グローバルインスタンス。
 * @global
 */
var request = new EfwServerRequest();