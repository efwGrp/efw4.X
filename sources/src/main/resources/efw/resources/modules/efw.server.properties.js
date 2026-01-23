"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * efw.propertiesファイルを操作するためのクラス。
 * サーバーの動作設定や環境変数を動的に取得します。
 * * @author Chang Kejun
 * @constructor
 */
function EfwServerProperties() {
};

/**
 * efw.propertiesファイルから指定されたキーの値を取得します。
 * defaultValueが指定されている場合、その型に合わせて自動的にキャストします。
 * * @param {String} key - 必須。取得したいプロパティのキー。
 * @param {any} [defaultValue] - 任意。キーが存在しない場合のデフォルト値。
 * この引数の型（String/Number/Boolean）に基づいて戻り値が変換されます。
 * @returns {any} プロパティの値。型はdefaultValueに準拠します。
 */
EfwServerProperties.prototype.get = function (key, defaultValue) {
	var dv;
	if (defaultValue == null) {
		dv = null;
	} else {
		dv = defaultValue + "";
	}

	// JavaのPropertiesManagerから値を取得
	var value = "" + Packages.efw.properties.PropertiesManager.getProperty(key, dv);

	// デフォルト値の型に応じたキャスト処理
	if (defaultValue == null) {
		return value;
	} else if (typeof defaultValue == "string") {
		return value;
	} else if (typeof defaultValue == "number") {
		return 0 + new Number(value);
	} else if (typeof defaultValue == "boolean") {
		// Javaのパース処理を利用して正確に変換
		return true && java.lang.Boolean.parseBoolean(value);
	} else {
		return value;
	}
};

///////////////////////////////////////////////////////////////////////////////
/**
 * プロパティ操作用グローバルインスタンス。
 * @global
 */
var properties = new EfwServerProperties();