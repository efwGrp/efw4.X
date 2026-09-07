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
 *
 * @param {Array<String>} params - 必須。実行するコマンドとその引数を格納した配列。
 * 例: ["ls", "-l", "/tmp"]
 *
 * @returns {void}
 *
 * @security CRITICAL: Do NOT pass HTTP request parameters directly to this method.
 * This executes OS commands. If params originate from untrusted sources (web requests,
 * user input), you MUST validate/sanitize them in your event JS before calling cmd.execute().
 *
 * Safe pattern:
 *   var allowedCommands = {"backup": ["/usr/bin/backup.sh"], "status": ["/usr/bin/status.sh"]};
 *   var safeParams = allowedCommands[request.action];
 *   if (!safeParams) throw new Error("Invalid action");
 *   cmd.execute(safeParams);
 *
 * Unsafe pattern (DO NOT DO THIS):
 *   cmd.execute([request.command, request.arg1, request.arg2]);  // DANGEROUS!
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