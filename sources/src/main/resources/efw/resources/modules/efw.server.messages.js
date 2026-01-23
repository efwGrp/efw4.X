"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * サーバーサイドのメッセージ管理クラス。
 * システム標準メッセージの保持、多言語対応、およびテキスト内のプレースホルダ置換を行います。
 * * @author Chang Kejun
 * @constructor
 */
var EfwServerMessages = function () {
};

/**
 * 指定されたメッセージIDに対応するメッセージ文字列を取得します。
 * システム標準のバリデーションメッセージや例外メッセージを定義しています。
 * * @param {String} messageId - メッセージを識別するID。
 * @param {String} [lang] - 言語コード（例: "jp", "en"）。
 * @returns {String} 翻訳されたメッセージ、またはデフォルトメッセージ。
 */
EfwServerMessages.prototype.get = function (messageId, lang) {
	if (messageId == "NumberType") return Packages.efw.i18n.I18nManager.get(lang, messageId, "number");
	if (messageId == "DateType") return Packages.efw.i18n.I18nManager.get(lang, messageId, "date");
	if (messageId == "StringType") return Packages.efw.i18n.I18nManager.get(lang, messageId, "string");
	if (messageId == "SessionTimeoutException") return Packages.efw.i18n.I18nManager.get(lang, messageId, "Session timeout. Please login again.");
	if (messageId == "NumberIsReuqiredMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "Please enter {display-name} with a valid number.");
	if (messageId == "DateIsReuqiredMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "Please enter {display-name} with a valid date.");
	if (messageId == "IsRequiredMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "Please enter {display-name}.");
	if (messageId == "MaxLengthOverMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "{display-name} cannot be greater than {max-length} words.");
	if (messageId == "MinOrMaxOverMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "{display-name} is {data-type} between {min} and {max}.");
	if (messageId == "MinOverMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "{display-name} is {data-type} not less than {min}.");
	if (messageId == "MaxOverMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "{display-name} is {data-type} no larger than {max}.");
	if (messageId == "NotAcceptMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "Please select the correct file for {display-name}.");
	if (messageId == "EventIsNotExistsMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "The event cannot be loaded because there is no file or JavaScript language violation.");
	if (messageId == "ElFinderIdNotRegisteredMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "The elFinder is inoperable without id registration.");
	if (messageId == "ElFinderSessionTimeoutMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "The elFinder is inoperable because of session timeout.");
	if (messageId == "ElFinderIsProtectedMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "The action is rejected because of elFinder protection mode.");
	if (messageId == "ElFinderHackingRiskMessage") return Packages.efw.i18n.I18nManager.get(lang, messageId, "The action is rejected because of hacking risk detection.");

	return Packages.efw.i18n.I18nManager.get(lang, messageId, messageId);
};

/**
 * 文字列（主にJSON）内の `{key}` 形式のプレースホルダを翻訳されたメッセージに置換します。
 * * @param {String} jsonString - 置換対象の文字列。
 * @param {String} lang - 言語コード。nullの場合はそのまま返します。
 * @returns {String} 翻訳・置換後の文字列。
 */
EfwServerMessages.prototype.translate = function (jsonString, lang) {
	if (lang == null) {
		return jsonString;
	} else {
		var keys = jsonString.match(/\{[\w]+\}/g);
		if (keys != null) {
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				key = key.substr(1, key.length - 2);
				var msg = Packages.efw.i18n.I18nManager.get(lang, key, "");
				if (msg == "") {
					//定義がない場合は置換を行わない
				} else {
					jsonString = jsonString.replace("{" + key + "}", msg);
				}
			}
		}
	}
	return jsonString;
};

///////////////////////////////////////////////////////////////////////////////
/**
 * メッセージ操作用グローバルインスタンス。
 * @global
 */
var messages = new EfwServerMessages();