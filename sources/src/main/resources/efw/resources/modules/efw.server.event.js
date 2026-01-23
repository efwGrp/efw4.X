"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * イベントの実行と管理を行うためのクラス。
 * サーバーサイドのビジネスロジック（イベント）の呼び出しを制御します。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerEvent() {
};

/**
 * 指定されたイベントを実行（fire）します。
 * 同一サーバー内のイベントだけでなく、別サーバー（CORS）のイベント呼び出しも可能です。
 * @param {String} eventId - 必須。実行するイベントのID。
 * @param {Object} [params={}] - 任意。イベントに渡すパラメータ。
 * @param {String} [server] - 任意。別のefwサーバーのURL（例: http://127.0.0.1:8080/app）。
 * @returns {Result} イベントの実行結果（Resultオブジェクト）。
 */
EfwServerEvent.prototype.fire = function (eventId, params, server) {
	if (server == undefined) {
		if (params == undefined) {
			params = {};
		} else if (typeof (params) == "string") {
			server = params;
			params = {};
		}
	}
	var result = new Result();
	if (server == undefined) {
		// ローカルイベントの実行
		var ev = this._get(eventId);
		if (ev == null || ev.from == "file") {
			ev = this._load(eventId);
		}
		result = ev.fire(params);
	} else {
		// リモートイベントの実行（別のefwサーバーへのリクエスト）
		var servletUrl = "efwServlet";
		var jsonString = "" + Packages.efw.event.RemoteEventManager.call(
			server + "/" + servletUrl,
			JSON.stringify({ eventId: eventId, params: params })
		);
		var resultJSON = JSON.parse(jsonString);
		if (resultJSON.actions != null && resultJSON.values != null) {
			result.actions = resultJSON.actions;
			result.values = resultJSON.values;
		} else {
			result = resultJSON;
		}
	}
	return result;
};

///////////////////////////////////////////////////////////////////////////////

/**
 * グローバルスコープからイベントオブジェクトを取得します。
 * @param {String} eventId - イベントID。
 * @returns {Object|undefined}
 * @private
 */
EfwServerEvent.prototype._get = function (eventId) {
	var g = Function('return this')();
	return g[eventId];
};

/**
 * グローバルスコープにイベントオブジェクトを設定します。
 * @param {String} eventId - イベントID。
 * @param {Object} ev - イベントオブジェクト。
 * @private
 */
EfwServerEvent.prototype._set = function (eventId, ev) {
	var g = Function('return this')();
	g[eventId] = ev;
};

/**
 * イベント操作用の排他制御ロッカー。
 * @private
 */
EfwServerEvent.prototype._locker = Packages.efw.script.ScriptManager.getLocker();

/**
 * イベントファイルをロードし、メモリ上に展開します。
 * デバッグモードの場合、ファイルの更新日時をチェックして自動的に再ロードを行います。
 * @param {String} eventId - 必須。ロードするイベントID。
 * @param {Boolean} [loadingGlobal] - 内部用。global.jsのロード中かどうか。
 * @returns {EventInfo|null} ロードされたイベント情報。
 * @private
 */
EfwServerEvent.prototype._load = function (eventId, loadingGlobal) {
	// global.jsが存在しない場合の警告
	if (loadingGlobal) {
		if (!absfile.exists(_eventfolder + "/" + eventId + ".js")) {
			Packages.efw.framework.initWLog(eventId + ".js is not found.");
			return null;
		}
	}

	/**
	 * イベントのサービス設定（同時実行制限など）を反映します。
	 */
	function setService(eventId, ev) {
		if (ev.service != null) {
			if (ev.service.max != null && ev.service.max > -1) {
				// セマフォによる最大同時実行数の制限を設定
				ev.semaphore = Packages.efw.script.ScriptManager.getSemaphore(eventId, ev.service.max);
			}
		} else {
			ev.semaphore = null;
		}
	}

	try {
		this._locker.lock();
		// イベントが未ロードの場合はロード
		if (!this._get(eventId)) {
			load(_eventfolder + "/" + eventId + ".js");
			var ev = this._get(eventId);
			if (ev) {
				ev.lastModified = "" + absfile.get(_eventfolder + "/" + eventId + ".js").lastModified;
				if (eventId != "global") setService(eventId, ev);
				ev.from = "file";
			}
		} else if (_isdebug) {
			// デバッグモード時はファイルの更新を確認して再ロード
			var org = this._get(eventId);
			var orgLastModified = "" + org.lastModified;
			var evLastModified = "" + absfile.get(_eventfolder + "/" + eventId + ".js").lastModified;
			if (orgLastModified != evLastModified) {
				this._set(eventId, null);
				load(_eventfolder + "/" + eventId + ".js");
				var ev = this._get(eventId);
				if (ev) {
					ev.lastModified = absfile.get(_eventfolder + "/" + eventId + ".js").lastModified;
					setService(eventId, ev);
					ev.from = "file";
				}
			}
		}
	} catch (e) {
		if (e instanceof Error) e = "" + e;
		if (loadingGlobal) {
			Packages.efw.framework.initSLog("global.js cannot be loaded.", e);
		} else {
			Packages.efw.framework.runtimeSLog(e);
		}
		this._set(eventId, null);
	} finally {
		this._locker.unlock();
	}
	return this._get(eventId);
};

///////////////////////////////////////////////////////////////////////////////
/**
 * イベント操作用グローバルインスタンス。
 * @global
 */
var event = new EfwServerEvent();