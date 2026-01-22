"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * CSVファイルを読み込むためのクラス。
 * @param {String} path - 必須。ストレージ内の相対パス。
 * @param {String} [separator=","] - 任意。項目区切り文字。
 * @param {String} [delimiter="\""] - 任意。囲み文字。
 * @param {String} [encoding="UTF-8"] - 任意。文字エンコーディング。
 * @param {Number} [skipRows] - 任意。読み込み開始前にスキップする行数。
 * @param {Number} [rowsToRead] - 任意。読み込む最大行数。
 * @param {Number} [offsetBytes] - 任意。読み込み開始位置のバイトオフセット。
 * @param {Number} [offsetRows] - 任意。読み込み開始位置の行オフセット。
 * @author Chang Kejun
 * @constructor
 */
function CSVReader(path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("CSVReader"); }
	this._path = path;
	if (separator != null) { this._separator = separator; }
	if (delimiter != null) { this._delimiter = delimiter; }
	if (encoding != null) { this._encoding = encoding; }
	if (skipRows != null) { this._skipRows = skipRows; }
	if (rowsToRead != null) { this._rowsToRead = rowsToRead; }
	if (offsetBytes != null) { this._offsetBytes = offsetBytes; }
	if (offsetRows != null) { this._offsetRows = offsetRows; }
	// カスタムの区切り文字・囲み文字を使用して正規表現文字列をコンパイル
	// 正規表現の特殊制御文字をエスケープ処理
	this._match = new RegExp("(D|S|\n|\r|[^DS\r\n]+)"
		.replace(/S/g, this._separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
		.replace(/D/g, this._delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
		, "gm");
};
/**
 * CSVリーダーオープン時の排他制御用ロッカー。
 * @type {Packages.efw.script.Locker}
 * @private
 */
CSVReader.prototype._locker = Packages.efw.script.ScriptManager.getLocker();
/**
 * ファイルパスを保持する内部プロパティ。
 * @type {String}
 * @private
 */
CSVReader.prototype._path = null;
/**
 * 項目区切り文字。
 * @type {String}
 * @private
 */
CSVReader.prototype._separator = ",";
/**
 * 項目囲み文字。
 * @type {String}
 * @private
 */
CSVReader.prototype._delimiter = "\"";
/**
 * 文字エンコーディング。
 * @type {String}
 * @private
 */
CSVReader.prototype._encoding = "UTF-8";
/**
 * 分割処理用の正規表現オブジェクト。
 * @type {RegExp}
 * @private
 */
CSVReader.prototype._match = null;
/**
 * 現在のバイトオフセット位置。
 * @type {Number}
 * @private
 */
CSVReader.prototype._offsetBytes = -1;
/**
 * 現在の行オフセット位置。
 * @type {Number}
 * @private
 */
CSVReader.prototype._offsetRows = -1;
/**
 * スキップする行数。
 * @type {Number}
 * @private
 */
CSVReader.prototype._skipRows = -1;
/**
 * 読み込む最大行数。
 * @type {Number}
 * @private
 */
CSVReader.prototype._rowsToRead = -1;
/**
 * 改行コード（デフォルト "\r\n"）。
 * @type {String}
 * @private
 */
CSVReader.prototype._CRLFCode = "\r\n";
/**
 * すべての行を読み込み、配列のマトリックス（2次元配列）として返します。
 * @param {String} [CRLFCode] - 任意。改行コードを指定。
 * @returns {Array}
 */
CSVReader.prototype.readAllLines = function (CRLFCode) {
	if (CRLFCode != null && CRLFCode != "") {
		this._CRLFCode = CRLFCode;
	}
	var aryLinesTemp = file.readAllLines(this._path, this._encoding).split(this._CRLFCode);
	var aryLines = [];

	for (var i = 0; i < aryLinesTemp.length; i++) {
		aryLines.push(this._split(aryLinesTemp[i]));
	}

	return aryLines;
};
/**
 * すべての行をループし、各行に対してコールバック関数を実行します。
 * 大容量ファイルの処理に適しています。
 * @param {Function} callback - 必須。実行する関数 function(aryField, index)。
 * @param {String} [CRLFCode] - 任意。改行コードを指定。
 */
CSVReader.prototype.loopAllLines = function (callback, CRLFCode) {
	var br = null;
	if (callback == null) { return; }
	if (CRLFCode != null && CRLFCode != "") {
		this._CRLFCode = CRLFCode;
	}
	try {
		try {
			this._locker.lock();
			br = new Packages.efw.csv.CSVReader(
				new java.io.FileInputStream(Packages.efw.file.FileManager.get(this._path)),
				this._encoding, this._CRLFCode);
		} finally {
			this._locker.unlock();
		}
		var strLine;
		var intNum = 0;

		if (this._offsetBytes != -1) {
			br.skip(this._offsetBytes, this._offsetRows);
		}
		if (this._skipRows != -1) {
			for (var i = 0; i < this._skipRows; i++) {
				br.readLine();
			}
		}
		while (true) {
			if (this._rowsToRead != -1 && intNum >= this._rowsToRead) break;
			var strLine = br.readLine(); if (strLine == null) break;
			var aryField = this._split(strLine, intNum + (this._skipRows != -1 ? this._skipRows : 0) + (this._offsetRows != -1 ? this._offsetRows : 0));
			callback(aryField, intNum + (this._skipRows != -1 ? this._skipRows : 0) + (this._offsetRows != -1 ? this._offsetRows : 0));
			intNum++;
		}
		this._offsetBytes = 0 + br.getCurrentOffsetBytes();
		this._offsetRows = 0 + br.getCurrentOffsetRows();
	} finally {
		try {
			br.close();
		} catch (e) { }
	}
};
/**
 * 1行の文字列を、区切り文字と囲み文字に従って配列に分割する内部関数。
 * @param {String} rowdata - 必須。分割対象の文字列。
 * @param {Number} index - 行インデックス（エラー表示用）。
 * @returns {Array}
 * @private
 */
CSVReader.prototype._split = function (rowdata, index) {
	var entry = [];
	// ステート管理: 0:開始, 1:囲み開始, 2:囲み内の囲み文字検出, 3:非囲みの文字検出
	var state = 0;
	var value = "";

	var separator = this._separator;
	var delimiter = this._delimiter;

	rowdata.replace(this._match, function (m0) {
		switch (state) {
			case 0:
				if (m0 === separator) {
					value += "";
					entry.push(value); value = ""; state = 0;
					break;
				}
				if (m0 === delimiter) {
					state = 1;
					break;
				}
				if (m0 === "\n" || m0 === "\r") {
					break;
				}
				value += m0;
				state = 3;
				break;
			case 1:
				if (m0 === delimiter) {
					state = 2;
					break;
				}
				value += m0;
				state = 1;
				break;
			case 2:
				if (m0 === delimiter) {
					value += m0;
					state = 1;
					break;
				}
				if (m0 === separator) {
					entry.push(value); value = ""; state = 0;
					break;
				}
				if (m0 === '\n' || m0 === '\r') {
					break;
				}
				throw new Packages.efw.CsvTxtDataException("Illegal state", index, rowdata);
			case 3:
				if (m0 === separator) {
					entry.push(value); value = ""; state = 0;
					break;
				}
				if (m0 === '\n' || m0 === '\r') {
					break;
				}
				if (m0 === delimiter) {
					throw new Packages.efw.CsvTxtDataException("Illegal quote", index, rowdata);
				}
				throw new Packages.efw.CsvTxtDataException("Illegal data", index, rowdata);
			default:
				throw new Packages.efw.CsvTxtDataException("Unknown state", index, rowdata);
		}
	});

	entry.push(value); value = ""; state = 0;
	return entry;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * CSVファイルを書き出すためのクラス。
 * @param {String} path - 必須。出力先の相対パス。
 * @param {String} [separator=","] - 任意。項目区切り文字。
 * @param {String} [delimiter="\""] - 任意。項目囲み文字。
 * @param {String} encoding - 必須。文字エンコーディング。
 * @author Chang Kejun
 * @constructor
 */
function CSVWriter(path, separator, delimiter, encoding) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("CSVWriter"); }
	this._path = path;
	if (separator != null) { this._separator = separator; }
	if (delimiter != null) { this._delimiter = delimiter; }
	if (encoding != null) { this._encoding = encoding; }
	this._printWriter = Packages.efw.csv.CSVManager.open(path, this._encoding);
};
/**
 * ファイルパスを保持する内部プロパティ。
 * @type {String}
 * @private
 */
CSVWriter.prototype._path = null;
/**
 * 項目区切り文字。
 * @type {String}
 * @private
 */
CSVWriter.prototype._separator = ",";
/**
 * 項目囲み文字。
 * @type {String}
 * @private
 */
CSVWriter.prototype._delimiter = "\"";
/**
 * 文字エンコーディング。
 * @type {String}
 * @private
 */
CSVWriter.prototype._encoding = "UTF-8";
/**
 * Java側のPrintWriterインスタンス。
 * @type {java.io.PrintWriter}
 * @private
 */
CSVWriter.prototype._printWriter = null;
/**
 * Java側のライターを閉じ、リソースを解放します。
 */
CSVWriter.prototype.close = function () {
	Packages.efw.csv.CSVManager.close(this._path);
};
/**
 * 全てのCSVライターを一括で閉じます。
 * @private
 */
CSVWriter.prototype._closeAll = function () {
	Packages.efw.csv.CSVManager.closeAll();
};
/**
 * 指定された配列データをすべてファイルに書き出します。
 * @param {Array} aryLines - 必須。書き出すデータの配列（2次元）。
 */
CSVWriter.prototype.writeAllLines = function (aryLines) {
	var aryTemp = [];

	for (var i = 0; i < aryLines.length; i++) {
		aryTemp.push(this._join(aryLines[i]));
	}

	file.writeAllLines(this._path, aryTemp.join("\r\n"), this._encoding);
};
/**
 * 配列データを1行としてファイルに書き出します。
 * @param {Array} aryLine - 必須。書き出すデータの配列。
 */
CSVWriter.prototype.writeLine = function (aryLine) {
	var strLine = this._join(aryLine);
	this._printWriter.println(strLine);
};
/**
 * 配列を区切り文字と囲み文字に従って1本の文字列に結合する内部関数。
 * @param {Array} aryLine - 必須。結合対象の配列。
 * @returns {String}
 * @private
 */
CSVWriter.prototype._join = function (aryLine) {
	var lineValues = [];

	for (var i = 0; i < aryLine.length; i++) {
		var strValue = (aryLine[i] === undefined || aryLine[i] === null) ? '' : aryLine[i].toString();

		strValue = strValue.replace(/\r/g, "");

		if (strValue.indexOf(this._delimiter) > -1) {
			strValue = strValue.replace(new RegExp(this._delimiter, 'g'), this._delimiter + this._delimiter);
		}

		if (strValue.indexOf(this._delimiter) > -1 || strValue.indexOf(this._separator) > -1 || strValue.indexOf("\n") > -1) {
			strValue = this._delimiter + strValue + this._delimiter;
		}

		lineValues.push(strValue);
	}

	return lineValues.join(this._separator);
};