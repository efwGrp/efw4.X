"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * メール送信を管理するクラス。
 * 外部のメール定義ファイルに基づき、動的なパラメータを埋め込んでメールを送信します。
 * * @author Chang Kejun
 * @constructor
 */
function EfwServerMail() {
};

/**
 * 指定されたメールグループおよびメールIDを使用してメールを送信します。
 * * @param {String} groupId - 必須。メール定義ファイル内のグループID。
 * @param {String} mailId - 必須。メール定義ファイル内のメールID。
 * @param {Object} params - 必須。メール本文のプレースホルダに埋め込むパラメータオブジェクト。
 * 例: {userName: "田中", orderId: "123"}
 * @param {Boolean} [inBackground=false] - 任意。trueの場合、非同期（バックグラウンド）で送信を実行します。
 */
EfwServerMail.prototype.send = function (groupId, mailId, params, inBackground) {
	// JavaScriptのObjectからJavaのHashMapへ変換
	var hashMapParams = new java.util.HashMap();
	for (var key in params) {
		var vl = "" + params[key];
		hashMapParams.put(key, vl);
	}

	// バックグラウンド送信または通常送信の実行
	if (inBackground) {
		Packages.efw.mail.MailManager.sendInBackground(groupId, mailId, hashMapParams);
	} else {
		Packages.efw.mail.MailManager.send(groupId, mailId, hashMapParams);
	}
};

///////////////////////////////////////////////////////////////////////////////
/**
 * メール操作用グローバルインスタンス。
 * @global
 */
var mail = new EfwServerMail();