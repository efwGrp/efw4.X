"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * イベントの実行結果を保持するクラス。
 * クライアント側へ送信する描画命令やアクション（alert, navigate等）を蓄積します。
 * @param {Boolean} [withoutI18nTranslation=false] - 任意。多言語翻訳（i18n）を行わない場合はtrue。
 * @author Chang Kejun
 * @constructor
 */
function Result(withoutI18nTranslation) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Result"); }
	this.actions = {};
	this.values = [];
	this.withoutI18nTranslation = withoutI18nTranslation;
};

/**
 * クライアントサイドで実行するアクション群。
 * @type {Object}
 */
Result.prototype.actions = null;

/**
 * クライアントサイドへ返すデータ値および描画命令の配列。
 * @type {Array}
 */
Result.prototype.values = null;

/**
 * 多言語翻訳をスキップするかどうかのフラグ。
 * @type {Boolean}
 */
Result.prototype.withoutI18nTranslation = false;

/**
 * データ反映の対象となる要素（セレクタ）を指定し、描画命令を開始します。
 * @param {String} [selector] - 任意。jQueryセレクタ形式の文字列。
 * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
 */
Result.prototype.runat = function (selector) {
	var ret = {};
	ret.runat = selector;
	this.values.push(ret);
	return this;
};

/**
 * 直前に指定した描画命令に対して、削除対象の要素を指定します。
 * @param {String} selector - 必須。削除する要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.remove = function (selector) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.remove == null) ret.remove = selector;
	}
	return this;
};

/**
 * 直前に指定した描画命令に対して、HTMLテンプレート（マスク）を指定します。
 * @param {String} mask - 必須。追加する要素のHTMLテンプレート名。
 * @returns {Result}
 */
Result.prototype.append = function (mask) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.append == null) ret.append = mask;
	}
	return this;
};

/**
 * 直前に指定した描画命令に対して、反映するデータを指定します。
 * @param {Array|Object} data - 必須。反映するデータ。
 * @returns {Result}
 */
Result.prototype.withdata = function (data) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.withdata == null) ret.withdata = data;
	}
	return this;
};

/**
 * 別の Result オブジェクトの内容を現在の Result に統合します。
 * @param {Result} result - 必須。統合元の Result インスタンス。
 * @returns {Result}
 */
Result.prototype.concat = function (result) {
	if (result) {
		if (result.values) {
			this.values = this.values.concat(result.values);
		}
		if (result.actions) {
			if (result.actions.show) this.show(result.actions.show);
			if (result.actions.hide) this.hide(result.actions.hide);
			if (result.actions.disable) this.disable(result.actions.disable);
			if (result.actions.enable) this.enable(result.actions.enable);
			if (result.actions.navigate) this.navigate(result.actions.navigate.url, result.actions.navigate.params);
			if (result.actions.download) {
				if (result.actions.download.zip) this.attach(result.actions.download.zip, result.actions.download.zipBasePath);
				if (result.actions.download.file) this.attach(result.actions.download.file, result.actions.download.zipBasePath);
				if (result.actions.download.saveas) this.saveas(result.actions.download.saveas, result.actions.download.password);
				if (result.actions.download.deleteafterdownload) this.deleteAfterDownload();
			}
			if (result.actions.alert) this.alert(result.actions.alert, result.actions.alertTitle);
			if (result.actions.highlight) this.highlight(result.actions.highlight);
			if (result.actions.focus) this.focus(result.actions.focus);
			if (result.actions.error) this.error(result.actions.error.clientMessageId, result.actions.error.params);
			if (result.actions.confirm) this.confirm(result.actions.confirm.message, result.actions.confirm.buttons, result.actions.confirmTitle);
			if (result.actions.eval) this.eval(result.actions.eval);
			if (result.actions.preview) this.preview(result.actions.preview.file, result.actions.preview.isAbs);
			if (result.data) this.provide(result.data);
			if (result.actions.progress) this.progress(result.actions.progress.message, result.actions.progress.percent, result.actions.progress.closeFlag);
		}
	}
	return this;
};

/**
 * クライアント側で要素を表示します。
 * @param {String} selector - 必須。表示する要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.show = function (selector) {
	if (this.actions.show == null) {
		this.actions.show = selector;
	} else {
		this.actions.show += "," + selector;
	}
	return this;
};

/**
 * クライアント側で要素を非表示にします。
 * @param {String} selector - 必須。非表示にする要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.hide = function (selector) {
	if (this.actions.hide == null) {
		this.actions.hide = selector;
	} else {
		this.actions.hide += "," + selector;
	}
	return this;
};

/**
 * クライアント側で要素を無効化（disabled）します。
 * @param {String} selector - 必須。無効化する要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.disable = function (selector) {
	if (this.actions.disable == null) {
		this.actions.disable = selector;
	} else {
		this.actions.disable += "," + selector;
	}
	return this;
};

/**
 * クライアント側で要素を有効化します。
 * @param {String} selector - 必須。有効化する要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.enable = function (selector) {
	if (this.actions.enable == null) {
		this.actions.enable = selector;
	} else {
		this.actions.enable += "," + selector;
	}
	return this;
};

/**
 * クライアント側で別のURLに画面遷移させます。
 * @param {String} url - 必須。遷移先のURL。
 * @param {Object} [params] - 任意。URLパラメータ。
 * @returns {Result}
 */
Result.prototype.navigate = function (url, params) {
	if (!this.actions.navigate) {
		this.actions.navigate = {};
		this.actions.navigate.url = url;
		this.actions.navigate.params = params;
	}
	return this;
};

/**
 * クライアント側へ送信（ダウンロード）するファイルやフォルダを添付します。
 * @param {String|Array} path - 必須。添付するファイルまたはフォルダの相対パス。
 * @param {String} [zipBasePath] - 任意。ZIP圧縮時のルートフォルダ名。
 * @param {Boolean} [isAbs=false] - 任意。パスを絶対パスとして扱うかどうか。
 * @returns {Result}
 */
Result.prototype.attach = function (path, zipBasePath, isAbs) {
	if (!this.actions.download) this.actions.download = {};
	if (zipBasePath != null) {
		this.actions.download.zipBasePath = zipBasePath;
	}
	if (isAbs) {
		this.actions.download.isAbs = isAbs;
	}
	if (this.actions.download.zip != null) {
		if (path instanceof Array) {
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.zip.push(path);
		}
	} else if (this.actions.download.file != null) {
		this.actions.download.zip = [];
		this.actions.download.zip.push(this.actions.download.file);
		if (path instanceof Array) {
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.zip.push(path);
		}
		delete this.actions.download.file;
	} else {
		if (path instanceof Array) {
			this.actions.download.zip = [];
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else if (isAbs ? absfile.isFolder(path) : file.isFolder(path)) {
			this.actions.download.zip = [];
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.file = path;
		}
	}
	return this;
};

/**
 * ダウンロード時のファイル名およびパスワードを設定します。
 * @param {String} filename - 必須。保存時のファイル名。
 * @param {String} [password] - 任意。暗号化用パスワード。
 * @returns {Result}
 */
Result.prototype.saveas = function (filename, password) {
	if (!this.actions.download) this.actions.download = {};
	this.actions.download.saveas = filename;
	this.actions.download.password = password;
	return this;
};

/**
 * ダウンロード完了後、サーバー上の元ファイルを削除するフラグを立てます。
 * @returns {Result}
 */
Result.prototype.deleteAfterDownload = function () {
	if (this.actions.download) this.actions.download.deleteafterdownload = true;
	return this;
};

/**
 * クライアント側でアラートメッセージを表示します。
 * @param {String|Array} message - 必須。表示するメッセージまたはメッセージの配列。
 * @param {String} [title] - 任意。アラートダイアログのタイトル。
 * @param {Object} [params] - 任意。メッセージ内に埋め込むパラメータ。
 * @returns {Result}
 */
Result.prototype.alert = function (message, title, params) {
	if (!this.actions.alert)
		this.actions.alert = [];

	if (typeof (title) == "object") {
		params = title;
		title = null;
	}

	if (!this.actions.alertTitle)
		this.actions.alertTitle = title;

	if (message instanceof Array) {
		this.actions.alert = this.actions.alert.concat(message);
	} else {
		for (var key in params) {
			message = message.replace(new RegExp("{" + key + "}", "g"), params[key]);
		}
		this.actions.alert.push(message);
	}
	return this;
};

/**
 * 指定した要素をハイライト（強調）表示します（主にエラー箇所等）。
 * @param {String} selector - 必須。対象要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.highlight = function (selector) {
	if (this.actions.highlight == null) {
		this.actions.highlight = selector;
	} else {
		this.actions.highlight += "," + selector;
	}
	return this;
};

/**
 * 指定した要素にフォーカスを当てます。
 * @param {String} selector - 必須。対象要素のセレクタ。
 * @returns {Result}
 */
Result.prototype.focus = function (selector) {
	if (!this.actions.focus) this.actions.focus = selector;
	return this;
};

/**
 * クライアント側へエラーメッセージIDを通知します。
 * @param {String} clientMessageId - 必須。メッセージID。
 * @param {Object} [params] - 任意。埋め込みパラメータ。
 * @returns {Result}
 */
Result.prototype.error = function (clientMessageId, params) {
	if (!this.actions.error)
		this.actions.error = { "clientMessageId": clientMessageId, "params": params };
	return this;
};

/**
 * クライアント側で確認ダイアログを表示します。
 * @param {String} message - 必須。メッセージ。
 * @param {Object} buttons - 必須。ボタン構成（コールバック等）。
 * @param {String} [title] - 任意。タイトル。
 * @param {Object} [params] - 任意。埋め込みパラメータ。
 * @returns {Result}
 */
Result.prototype.confirm = function (message, buttons, title, params) {
	if (typeof (title) == "object") {
		params = title;
		title = null;
	}
	if (!this.actions.confirm) {
		for (var key in params) {
			message = message.replace(new RegExp("{" + key + "}", "g"),
				params[key]);
		}
		this.actions.confirm = {
			"message": message,
			"buttons": buttons
		};
	}
	if (!this.actions.confirmTitle)
		this.actions.confirmTitle = title;

	return this;
};

/**
 * クライアント側で任意のJavaScriptを実行します。
 * @param {String|Array} script - 必須。実行するスクリプト。
 * @returns {Result}
 */
Result.prototype.eval = function (script) {
	if (!this.actions.eval) this.actions.eval = [];
	if (script instanceof Array) {
		this.actions.eval = this.actions.eval.concat(script);
	} else {
		this.actions.eval.push(script);
	}
	return this;
};

/**
 * コンソールにデバッグ情報を出力します。
 * @param {String} [label=""] - 任意。デバッグ用のラベル。
 * @returns {Result}
 */
Result.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Result class.");
	java.lang.System.out.println("result values:" + JSON.stringify(this.values));
	java.lang.System.out.println("result actions:" + JSON.stringify(this.actions));
	return this;
};

/**
 * クライアント側でファイルをプレビュー（PDF表示等）させます。
 * @param {String|Array} filePath - 必須。ファイルパス。
 * @param {Boolean} [isAbs=false] - 任意。絶対パスかどうか。
 * @returns {Result}
 */
Result.prototype.preview = function (filePath, isAbs) {
	if (!this.actions.preview) this.actions.preview = {};
	this.actions.preview.file = filePath;
	this.actions.preview.isAbs = isAbs;
	return this;
};

/**
 * クライアント側の Efw() コールバック関数へ渡す生データをセットします。
 * @param {Object} data - 必須。渡すデータ。
 * @returns {Result}
 */
Result.prototype.provide = function (data) {
	this.data = data;
	return this;
};

/**
 * バックグラウンド実行時、クライアント側のプログレスバーの状態を更新します。
 * @param {String} message - 必須。表示メッセージ。
 * @param {Number} percent - 必須。進捗率（0-100）。
 * @param {Boolean} [closeFlag=false] - 任意。完了時に閉じるかどうか。
 * @returns {Result}
 */
Result.prototype.progress = function (message, percent, closeFlag) {
	if (!this.actions.progress) this.actions.progress = {};
	this.actions.progress.message = message;
	this.actions.progress.percent = percent;
	this.actions.progress.closeFlag = closeFlag;
	return this;
};