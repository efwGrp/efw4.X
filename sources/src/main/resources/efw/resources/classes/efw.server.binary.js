"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * バイナリファイルを読み込むためのクラス。
 * @param {String} path - 必須。ファイルパス。
 * @param {Array} aryFieldsDef - 必須。各フィールドのバイト長を定義した配列。
 * @param {Array} aryEncoding - 必須。各フィールドの文字コードを定義した配列。
 * @param {Number} rowSize - 必須。1行あたりの総バイト長。
 * @param {Number} [skipRows] - 任意。スキップする行数。
 * @param {Number} [rowsToRead] - 任意。読み込む最大行数。
 * @author Chang kejun
 * @constructor
 */
function BinaryReader(path, aryFieldsDef, aryEncoding, rowSize, skipRows, rowsToRead) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("BinaryReader"); }
	this._path = path;
	this._aryFieldsDef = aryFieldsDef;
	this._aryEncoding = aryEncoding;
	this._rowSize = rowSize;
	if (skipRows != null) { this._skipRows = skipRows; }
	if (rowsToRead != null) { this._rowsToRead = rowsToRead; }
};
/**
 * リーダーオープン時の排他制御用ロッカー。
 * @type {Packages.efw.script.Locker}
 * @private
 */
BinaryReader.prototype._locker = Packages.efw.script.ScriptManager.getLocker();
/**
 * ファイルパスを保持する内部プロパティ。
 * @type {String}
 * @private
 */
BinaryReader.prototype._path = null;
/**
 * フィールド長定義配列を保持する内部プロパティ。
 * @type {Array}
 * @private
 */
BinaryReader.prototype._aryFieldsDef = null;
/**
 * エンコーディング定義配列を保持する内部プロパティ。
 * @type {Array}
 * @private
 */
BinaryReader.prototype._aryEncoding = null;
/**
 * 1行のサイズ（バイト）を保持する内部プロパティ。
 * @type {Number}
 * @private
 */
BinaryReader.prototype._rowSize = null;
/**
 * スキップ行数を保持する内部プロパティ。
 * @type {Number}
 * @private
 */
BinaryReader.prototype._skipRows = -1;
/**
 * 読み込み制限行数を保持する内部プロパティ。
 * @type {Number}
 * @private
 */
BinaryReader.prototype._rowsToRead = -1;
/**
 * 全ての行を読み込み、2次元配列として返します。
 * @returns {Array} 1行ごとのフィールド配列を格納したマトリックス。
 */
BinaryReader.prototype.readAllLines = function () {
	var aryLines = [];
	this.loopAllLines(callback);
	function callback(aryField, intNum) {
		aryLines.push(aryField);
	}
	return aryLines;
};
/**
 * 全ての行をループし、各行に対してコールバック関数を実行します。
 * @param {Function} callback - 必須。実行するコールバック関数。引数は(aryField, intNum)。
 */
BinaryReader.prototype.loopAllLines = function (callback) {
	var br = null;
	if (callback == null) { return; }
	try {
		var intNum = 0;
		try {
			this._locker.lock();
			br = new java.io.FileInputStream(Packages.efw.file.FileManager.get(this._path));
			if (this._skipRows != -1) {
				br.skip(new java.lang.Long("" + (this._skipRows * this._rowSize)).longValue());
			}
		} finally {
			this._locker.unlock();
		}
		var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize);//ファイルから読み込むバファー
		var bufs = [];
		for (var i = 0; i < this._aryFieldsDef.length; i++) {
			if (this._aryEncoding[i] == "Cp939WithoutShiftInOut") {
				bufs[i] = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i] + 2);
				bufs[i][0] = 14;//shift in 
				bufs[i][this._aryFieldsDef[i] + 2 - 1] = 15;//shift out
			} else {
				bufs[i] = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			}
		}
		while (br.read(buf) == this._rowSize) {
			var fromP = 0;
			var aryField = [];
			for (var i = 0; i < this._aryFieldsDef.length; i++) {
				if (this._aryEncoding[i] == "Cp939WithoutShiftInOut") {
					java.lang.System.arraycopy(buf, fromP, bufs[i], 1, this._aryFieldsDef[i]);
					aryField.push(new java.lang.String(bufs[i], "Cp939"));
				} else if (this._aryEncoding[i] == "S9") {
					java.lang.System.arraycopy(buf, fromP, bufs[i], 0, this._aryFieldsDef[i]);
					var tmpS9 = "" + new java.lang.String(bufs[i], "Cp930");
					var retS9 = "";
					for (var indexS9 = 0; indexS9 < tmpS9.length; indexS9++) {
						var c = tmpS9[indexS9];
						if (c == "{") { retS9 += "0"; }
						else if (c == "0") { retS9 += "0"; }
						else if (c == "A") { retS9 += "1"; }
						else if (c == "1") { retS9 += "1"; }
						else if (c == "B") { retS9 += "2"; }
						else if (c == "2") { retS9 += "2"; }
						else if (c == "C") { retS9 += "3"; }
						else if (c == "3") { retS9 += "3"; }
						else if (c == "D") { retS9 += "4"; }
						else if (c == "4") { retS9 += "4"; }
						else if (c == "E") { retS9 += "5"; }
						else if (c == "5") { retS9 += "5"; }
						else if (c == "F") { retS9 += "6"; }
						else if (c == "6") { retS9 += "6"; }
						else if (c == "G") { retS9 += "7"; }
						else if (c == "7") { retS9 += "7"; }
						else if (c == "H") { retS9 += "8"; }
						else if (c == "8") { retS9 += "8"; }
						else if (c == "I") { retS9 += "9"; }
						else if (c == "9") { retS9 += "9"; }
						else if (c == "}") { retS9 = "-" + retS9 + "0"; }
						else if (c == "J") { retS9 = "-" + retS9 + "1"; }
						else if (c == "K") { retS9 = "-" + retS9 + "2"; }
						else if (c == "L") { retS9 = "-" + retS9 + "3"; }
						else if (c == "M") { retS9 = "-" + retS9 + "4"; }
						else if (c == "N") { retS9 = "-" + retS9 + "5"; }
						else if (c == "O") { retS9 = "-" + retS9 + "6"; }
						else if (c == "P") { retS9 = "-" + retS9 + "7"; }
						else if (c == "Q") { retS9 = "-" + retS9 + "8"; }
						else if (c == "R") { retS9 = "-" + retS9 + "9"; }
						else { retS9 += c; }
					}
					aryField.push(retS9.trim());
				} else {
					java.lang.System.arraycopy(buf, fromP, bufs[i], 0, this._aryFieldsDef[i]);
					aryField.push(new java.lang.String(bufs[i], this._aryEncoding[i]));
				}
				fromP += this._aryFieldsDef[i];
			}
			if (this._rowsToRead != -1 && intNum >= this._rowsToRead) {
				break;
			} else {
				callback(aryField, intNum + (this._skipRows != -1 ? this._skipRows : 0));
				intNum++;
			}
		}
	} finally {
		try {
			br.close();
		} catch (e) {
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
/**
 * バイナリファイルを書き込むためのクラス。
 * @param {String} path - 必須。出力ファイルパス。
 * @param {Array} aryFieldsDef - 必須。フィールド長定義配列。
 * @param {Array} aryEncoding - 必須。エンコーディング定義配列。
 * @param {Number} rowSize - 必須。1行のバイト長。
 * @author Chang Kejun
 * @constructor
 */
function BinaryWriter(path, aryFieldsDef, aryEncoding, rowSize) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("BinaryWriter"); }
	this._path = path;
	this._aryFieldsDef = aryFieldsDef;
	this._aryEncoding = aryEncoding;
	this._rowSize = rowSize;
	this._printWriter = Packages.efw.binary.BinaryManager.open(path);
};
/**
 * ファイルパスを保持する内部プロパティ。
 * @type {String}
 * @private
 */
BinaryWriter.prototype._path = null;
/**
 * フィールド長定義配列を保持する内部プロパティ。
 * @type {Array}
 * @private
 */
BinaryWriter.prototype._aryFieldsDef = null;
/**
 * エンコーディング定義配列を保持する内部プロパティ。
 * @type {Array}
 * @private
 */
BinaryWriter.prototype._aryEncoding = null;
/**
 * 1行のサイズ（バイト）を保持する内部プロパティ。
 * @type {Number}
 * @private
 */
BinaryWriter.prototype._rowSize = null;
/**
 * Java側のバイナリライターインスタンスを保持する内部プロパティ。
 * @type {Packages.efw.binary.BinaryWriter}
 * @private
 */
BinaryWriter.prototype._printWriter = null;
/**
 * Java側のバイナリライターを閉じます。
 */
BinaryWriter.prototype.close = function () {
	Packages.efw.binary.BinaryManager.close(this._path);
};
/**
 * 全てのバイナリライターを一括で閉じます。
 * @private
 */
BinaryWriter.prototype._closeAll = function () {
	Packages.efw.binary.BinaryManager.closeAll();
};
/**
 * 全ての行をファイルに一括書き込みします。
 * @param {Array} aryLines - 必須。書き込むデータの2次元配列。
 */
BinaryWriter.prototype.writeAllLines = function (aryLines) {
	var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize * aryLines.length);//一括書き込み用バッファ

	for (var i = 0; i < aryLines.length; i++) {
		var buf4row = this._join(aryLines[i]);
		java.lang.System.arraycopy(buf4row, 0, buf, this._rowSize * i, this._rowSize);
	}
	file.writeAllBytes(this._path, buf);
};
/**
 * 1行のデータをファイルに書き込みます。
 * @param {Array} aryLine - 必須。書き込むデータの配列。
 */
BinaryWriter.prototype.writeLine = function (aryLine) {
	var buf = this._join(aryLine);
	this._printWriter.write(buf);
};
/**
 * 配列データを定義に基づいて結合し、バイナリバッファを作成する内部関数。
 * @param {Array} aryLine - 必須。1行分のデータ配列。
 * @returns {java.lang.reflect.Array} バイナリデータ（バイト配列）。
 * @private
 */
BinaryWriter.prototype._join = function (aryLine) {
	var bufs = [];
	for (var i = 0; i < this._aryFieldsDef.length; i++) {
		if (this._aryEncoding[i] == "Cp939WithoutShiftInOut") {
			bufs[i] = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i] + 2);
			for (var j = 0; j < bufs[i].length; j++) { bufs[i][j] = 32 }
			bufs[i][0] = 14;//shift in 
			bufs[i][this._aryFieldsDef[i] + 2 - 1] = 15;//shift out
			var buf4item = new java.lang.String("" + aryLine[i]).getBytes("Cp939");
			var copyLength = Math.min(buf4item.length, this._aryFieldsDef[i]);
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 1, copyLength);

		} else if (this._aryEncoding[i] == "S9") {
			bufs[i] = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			for (var j = 0; j < bufs[i].length; j++) { bufs[i][j] = 32 }
			var buf4item = new java.lang.String("" + aryLine[i]).getBytes("Cp930");
			var copyLength = Math.min(buf4item.length, this._aryFieldsDef[i]);
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 0, copyLength);

		} else {
			bufs[i] = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			for (var j = 0; j < bufs[i].length; j++) { bufs[i][j] = 32 }
			var buf4item = new java.lang.String("" + aryLine[i]).getBytes(this._aryEncoding[i]);
			var copyLength = Math.min(buf4item.length, this._aryFieldsDef[i]);
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 0, copyLength);
		}
	}
	var fromP = 0;
	var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize);//行データ用バッファ
	for (var i = 0; i < this._aryFieldsDef.length; i++) {
		if (this._aryEncoding[i] == "Cp939WithoutShiftInOut") {
			java.lang.System.arraycopy(bufs[i], 1, buf, fromP, this._aryFieldsDef[i]);
		} else {
			java.lang.System.arraycopy(bufs[i], 0, buf, fromP, this._aryFieldsDef[i]);
		}
		fromP += this._aryFieldsDef[i];
	}
	return buf;
};