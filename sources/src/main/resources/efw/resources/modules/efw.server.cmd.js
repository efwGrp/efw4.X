"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * OSのコマンドラインを実行するためのクラス。
 * * @author Chang kejun
 * @constructor
 */
function EfwServerCmd() { }

/**
 * OSのコマンドラインを実行します。
 * コマンドの実行ステータスが 0 以外（異常終了）の場合、エラーメッセージを伴う例外をスローします。
 * * @param {Array<String>} params - 必須。実行するコマンドとその引数を格納した配列。
 * 例: ["ls", "-l", "/tmp"]
 * * @returns {void}
 */
EfwServerCmd.prototype.execute = function (params) {
	if (params == null && !(params instanceof Array)) params = [];
	// JavaScriptの配列をJavaのString配列に変換して実行
	Packages.efw.cmd.CmdManager.execute(Java.to(params, Java.type("java.lang.String[]")));
};

///////////////////////////////////////////////////////////////////////////////
/**
 * コマンド実行用グローバルインスタンス。
 * @global
 */
var cmd = new EfwServerCmd();