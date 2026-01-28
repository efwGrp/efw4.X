"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * ストレージ内のファイルを操作するためのクラス。
 * * @author Chang Kejun
 * @constructor
 * @param {Boolean} isAbsolutePath - 絶対パスとして扱う場合は true、ストレージ相対パスの場合は false。
 */
function EfwServerFile(isAbsolutePath) {
	this.isAbsolutePath = isAbsolutePath;
};

/**
 * 指定されたパスが存在するかどうかを判定します。
 * @param {String} path - チェック対象のパス。
 * @returns {Boolean} 存在する場合は true。
 */
EfwServerFile.prototype.exists = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	if (fl.exists()) {
		return true;
	} else {
		return false;
	}
};

/**
 * 指定されたパスがファイルであるか判定します。
 * @param {String} path - チェック対象のパス。
 * @returns {Boolean} ファイルの場合は true。
 */
EfwServerFile.prototype.isFile = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	if (fl.isFile()) {
		return true;
	} else {
		return false;
	}
};

/**
 * 指定されたパスがフォルダ（ディレクトリ）であるか判定します。
 * @param {String} path - チェック対象のパス。
 * @returns {Boolean} フォルダの場合は true。
 */
EfwServerFile.prototype.isFolder = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	if (fl.isDirectory()) {
		return true;
	} else {
		return false;
	}
};

/**
 * フォルダ内のファイルおよびサブフォルダの一覧情報を取得します。
 * * @param {String} path - 必須。対象フォルダのパス。
 * @param {Boolean} [withoutFolderLength] - 任意。trueの場合、フォルダサイズの計算をスキップします。
 * @returns {Array} ファイル情報オブジェクトの配列。
 */
EfwServerFile.prototype.list = function (path, withoutFolderLength) {
	var lst = this.isAbsolutePath
		? Packages.efw.file.FileManager.getListByAbsolutePath(path)
		: Packages.efw.file.FileManager.getList(path);
	var ret = [];
	for (var i = 0; i < lst.length; i++) {
		var fl = lst[i];
		var lastModified = new Date();
		lastModified.setTime(fl.lastModified());
		var data = {
			"name": "" + fl.getName(),
			"lastModified": lastModified,
			"absolutePath": "" + fl.getAbsolutePath(),
			"isHidden": true && fl.isHidden(),
			"mineType": "" + Packages.efw.file.FileManager.getMimeType(fl),
		};
		if (data.mineType == "directory") {
			if (withoutFolderLength == true) {
				data["length"] = 0;
			} else {
				data["length"] = 0 + Packages.efw.file.FileManager.getFolderSize(fl);
			}
			if (fl.listFiles().length == 0) {
				data["isBlank"] = true;
			} else {
				data["isBlank"] = false;
			}
		} else {
			data["length"] = 0 + fl.length();
			if (data["length"] == 0) {
				data["isBlank"] = true;
			} else {
				data["isBlank"] = false;
			}
		}
		ret.push(data);
	}
	return ret;
};

/**
 * 指定されたパスのファイルまたはフォルダ情報を取得します。
 * * @param {String} path - 必須。
 * @param {Boolean} [withoutFolderLength] - 任意。
 * @returns {Object} 詳細情報オブジェクト。
 */
EfwServerFile.prototype.get = function (path, withoutFolderLength) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	var lastModified = new Date();
	lastModified.setTime(fl.lastModified());
	var data = {
		"name": "" + fl.getName(),
		"lastModified": lastModified,
		"absolutePath": "" + fl.getAbsolutePath(),
		"mineType": "" + Packages.efw.file.FileManager.getMimeType(fl),
	};
	if (data.mineType == "directory") {
		if (withoutFolderLength == true) {
			data["length"] = 0;
		} else {
			data["length"] = 0 + Packages.efw.file.FileManager.getFolderSize(fl);
		}
		if (fl.listFiles().length == 0) {
			data["isBlank"] = true;
		} else {
			data["isBlank"] = false;
		}
	} else {
		data["length"] = 0 + fl.length();
		if (data["length"] == 0) {
			data["isBlank"] = true;
		} else {
			data["isBlank"] = false;
		}
	}
	return data;
};

/**
 * ファイルまたはフォルダを削除します。
 * @param {String} path - 必須。
 */
EfwServerFile.prototype.remove = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.remove(fl);
};

/**
 * システムのストレージフォルダの絶対パスを取得します。
 * @returns {String}
 */
EfwServerFile.prototype.getStorageFolder = function () {
	return "" + Packages.efw.framework.getStorageFolder();
};

/**
 * アップロードされた単一のファイルを指定パスに保存します。
 * @param {String} path - 必須。
 */
EfwServerFile.prototype.saveSingleUploadFile = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.saveSingleUploadFile(fl);
};

/**
 * アップロードされた複数のファイルを指定パスに保存します。
 * @param {String} path - 必須。
 */
EfwServerFile.prototype.saveUploadFiles = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.saveUploadFiles(fl);
};

/**
 * フォルダ（ディレクトリ）を作成します。
 * @param {String} path - 必須。
 */
EfwServerFile.prototype.makeDir = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.makeDir(fl);
};

/**
 * テキストファイルを読み込みます（文字コード自動判別対応）。
 * @param {String} path - 必須。
 * @param {String} [encoding="UTF-8"] - 任意。
 * @returns {String} ファイルの内容。
 */
EfwServerFile.prototype.readAllLines = function (path, encoding) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	if (encoding == null || encoding == "") encoding = "UTF-8";
	return "" + Packages.efw.file.FileManager.readAllLines(fl, encoding);
};

/**
 * ファイル名を変更します。
 * @param {String} orgPath - 変更前のパス。
 * @param {String} newName - 新しいファイル名。
 */
EfwServerFile.prototype.rename = function (orgPath, newName) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(orgPath)
		: Packages.efw.file.FileManager.get(orgPath);
	Packages.efw.file.FileManager.rename(fl, newName);
};

/**
 * ファイルを移動します。
 * @param {String} orgPath - 移動元。
 * @param {String} newPath - 移動先。
 */
EfwServerFile.prototype.move = function (orgPath, newPath) {
	var orgfile = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(orgPath)
		: Packages.efw.file.FileManager.get(orgPath);
	var newfile = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(newPath)
		: Packages.efw.file.FileManager.get(newPath);
	Packages.efw.file.FileManager.move(orgfile, newfile);
};

/**
 * 空のファイルを作成します。
 * @param {String} path - 必須。
 */
EfwServerFile.prototype.makeFile = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.makeFile(fl);
};

/**
 * テキストファイルに内容を書き込みます。
 * @param {String} path - 必須。
 * @param {String} content - 書き込む内容。
 * @param {String} [encoding="UTF-8"] - 任意。
 */
EfwServerFile.prototype.writeAllLines = function (path, content, encoding) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	if (encoding == null) encoding = "UTF-8";
	Packages.efw.file.FileManager.writeAllLines(fl, content, encoding);
};

/**
 * ファイルを複製（コピー）します。
 * @param {String} srcPath - 複製元。
 * @param {String} destPath - 複製先。
 */
EfwServerFile.prototype.duplicate = function (srcPath, destPath) {
	var srcfl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(srcPath)
		: Packages.efw.file.FileManager.get(srcPath);
	var destfl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(destPath)
		: Packages.efw.file.FileManager.get(destPath);
	Packages.efw.file.FileManager.duplicate(srcfl, destfl);
};

/**
 * フォルダ内に一時ファイル名を生成します。
 * @returns {String} 生成された一時ファイル名。
 */
EfwServerFile.prototype.getTempFileName = function () {
	return "" + Packages.efw.file.FileManager.getTempFileName();
};

/**
 * バイナリファイルを一括で読み込みます。
 * @param {String} path - 必須。
 * @returns {Bytes} バイト配列。
 */
EfwServerFile.prototype.readAllBytes = function (path) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	return Packages.efw.file.FileManager.readAllBytes(fl);
};

/**
 * バイナリデータをファイルに一括で書き込みます。
 * @param {String} path - 必須。
 * @param {Uint8Array} content - 書き込むバイトデータ。
 */
EfwServerFile.prototype.writeAllBytes = function (path, content) {
	var fl = this.isAbsolutePath
		? Packages.efw.file.FileManager.getByAbsolutePath(path)
		: Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.writeAllBytes(fl, content);
};

///////////////////////////////////////////////////////////////////////////////
/**
 * ストレージ相対パス操作用インスタンス。
 * @global
 */
var file = new EfwServerFile(false);

/**
 * 絶対パス操作用インスタンス。
 * @global
 */
var absfile = new EfwServerFile(true);