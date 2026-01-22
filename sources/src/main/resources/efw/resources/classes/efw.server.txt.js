"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * テキストファイル（TXT）を読み込むためのクラス。
 * 正規表現による分割、または固定長での読み込みに対応しています。
 * @param {String} path - 必須。ファイルパス。
 * @param {String} regFieldsDef - 必須。フィールドを抽出するための正規表現文字列。
 * @param {String} [encoding="UTF-8"] - 任意。ファイルの文字エンコーディング。
 * @param {Number} [rowSize=-1] - 任意。1行のバイトサイズ（固定長読み込みの場合に指定）。
 * @param {Number} [skipRows=-1] - 任意。読み飛ばす行数（rowSize指定時のみ有効）。
 * @param {Number} [rowsToRead=-1] - 任意。読み込む最大行数（rowSize指定時のみ有効）。
 * @author Liu Xinyu
 * @constructor
 */
function TXTReader(path, regFieldsDef, encoding, rowSize, skipRows, rowsToRead) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("TXTReader"); }
	this._path = path;
	this._regFieldsDef = regFieldsDef;
	this._regFieldsDefRegExp = new RegExp(this._regFieldsDef);
	if (encoding != null) { this._encoding = encoding; }
	if (rowSize != null) { this._rowSize = rowSize; }
	if (skipRows != null) { this._skipRows = skipRows; }
	if (rowsToRead != null) { this._rowsToRead = rowsToRead; }
};

/**
 * リーダーオープン時の排他制御用ロッカー。
 * @private
 */
TXTReader.prototype._locker = Packages.efw.script.ScriptManager.getLocker();

/** @private @type {String} */
TXTReader.prototype._path = null;
/** @private @type {String} */
TXTReader.prototype._regFieldsDef = null;
/** @private @type {RegExp} */
TXTReader.prototype._regFieldsDefRegExp = null;
/** @private @type {String} */
TXTReader.prototype._encoding = "UTF-8";
/** @private @type {Number} */
TXTReader.prototype._rowSize = -1;
/** @private @type {Number} */
TXTReader.prototype._skipRows = -1;
/** @private @type {Number} */
TXTReader.prototype._rowsToRead = -1;

/**
 * すべての行を読み込み、配列の行列（マトリックス）として取得します。
 * @returns {Array<Array<String>>} フィールド値の配列を格納した二次元配列。
 */
TXTReader.prototype.readAllLines = function () {
	var aryLines = [];
	this.loopAllLines(callback);
	function callback(aryField, intNum) {
		aryLines.push(aryField);
	}
	return aryLines;
};

/**
 * すべての行をループし、各行の内容をコールバック関数に渡します。
 * @param {Function} callback - 必須。 `function(aryField, intNum)` 形式の関数。
 */
TXTReader.prototype.loopAllLines = function (callback) {
	var br = null;
	if (callback == null) { return; }
	try {
		var strLine;
		var intNum = 0;
		if (this._rowSize == -1) {
			try {
				this._locker.lock();
				br = new java.io.BufferedReader(
					new java.io.InputStreamReader(
						new java.io.FileInputStream(
							Packages.efw.file.FileManager.get(this._path)),
						this._encoding));
			} finally {
				this._locker.unlock();
			}
			while ((strLine = br.readLine()) != null) {
				var aryField = this._split(strLine, intNum);
				callback(aryField, intNum);
				intNum++;
			}
		} else {
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
			var bufs = [];//IBMCp930Cp939用サブバファー
			var c;
			while ((c = br.read(buf)) != -1) {
				strLine = "";
				if (this._encoding == "IBMCp930Cp939") {
					var fromP = 0;
					for (var i = 0; i < c; i++) {
						if (buf[i] == 14) {//Shift In
							if (fromP < i) {
								if (bufs[fromP] == null) {
									bufs[fromP] = [];
								}
								if (bufs[fromP][i] == null) {
									var temp = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, i - fromP);
									bufs[fromP][i] = temp;
								}
								java.lang.System.arraycopy(buf, fromP, bufs[fromP][i], 0, i - fromP);
								strLine += new java.lang.String(bufs[fromP][i], "Cp930");//英数字と半角カナ
								fromP = i;

							}
						} else if (buf[i] == 15) {//Shift Out
							if (bufs[fromP] == null) {
								bufs[fromP] = [];
							}
							if (bufs[fromP][i] == null) {
								var temp = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, i - fromP + 1);
								bufs[fromP][i] = temp;
							}
							java.lang.System.arraycopy(buf, fromP, bufs[fromP][i], 0, i - fromP + 1);
							strLine += new java.lang.String(bufs[fromP][i], "Cp939");//２byte漢字
							fromP = i + 1;
						}
					}
					if (fromP < c) {
						if (bufs[fromP] == null) {
							bufs[fromP] = [];
						}
						if (bufs[fromP][c] == null) {
							var temp = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, c - fromP);
							bufs[fromP][c] = temp;
						}
						java.lang.System.arraycopy(buf, fromP, bufs[fromP][c], 0, c - fromP);
						strLine += new java.lang.String(bufs[fromP][c], "Cp930");//英数字と半角カナ

					}
				} else {
					strLine = "" + new java.lang.String(buf, this._encoding);
				}

				if (this._rowsToRead != -1 && intNum >= this._rowsToRead) {
					break;
				} else {
					var aryField = this._split(strLine, intNum + (this._skipRows != -1 ? this._skipRows : 0));
					callback(aryField, intNum + (this._skipRows != -1 ? this._skipRows : 0));
					intNum++;
				}
			}

		}
	} finally {
		try {
			br.close();
		} catch (e) {
		}
	}
};

/**
 * 行文字列を定義済みの正規表現に従って分割し、フィールド配列を作成します。
 * @param {String} rowdata - 必須。行の生データ。
 * @param {Number} index - 必須。現在の行番号。
 * @returns {Array<String>} 分割後のフィールド配列。
 * @throws {Packages.efw.CsvTxtDataException} 正規表現にマッチしなかった場合。
 * @private
 */
TXTReader.prototype._split = function (rowdata, index) {
	var aryField = rowdata.match(this._regFieldsDefRegExp);

	if (aryField == null) {
		throw new Packages.efw.CsvTxtDataException("Illegal data", index, rowdata);
	}

	for (var i = 1; i < aryField.length; i++) {
		aryField[i] = aryField[i].trim();
	}

	aryField.shift(); // マッチ全体（0番目）を削除

	return aryField;
};