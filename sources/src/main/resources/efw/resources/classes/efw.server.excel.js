"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * Excelファイルを操作するためのクラス。<br>
 * 同一イベント内で同じファイルを複数回オープンしないでください。
 * 新規ファイルを作成する場合も、テンプレートファイルから作成する必要があります。
 * @param {String} path - 必須。ファイルパス。
 * @param {Boolean} [isLarge=false] - 任意。大量データ(SXSSF)モードを使用するかどうか。
 * @author Chang Kejun
 * @constructor
 */
function Excel(path, isLarge) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Excel"); }
	if (isLarge) {
		isLarge = true;
	} else {
		isLarge = false;
	}
	this._workbook = Packages.efw.excel.ExcelManager.open(path, isLarge);
};
/**
 * ワークブックをファイルに保存します。
 * @param {String} path - 必須。保存先の相対パス（ストレージフォルダ基準）。
 * @param {String} [password=""] - 任意。設定するパスワード。
 * @returns {Excel} メソッドチェーン用の自分自身のインスタンス。
 */
Excel.prototype.save = function (path, password) {
	if (password == null) password = "";
	this._workbook.save(path, password);
	return this;
};
/**
 * Excelファイルのハンドルを閉じ、リソースを解放します。
 */
Excel.prototype.close = function () {
	Packages.efw.excel.ExcelManager.close(this._workbook.getKey());
};
/**
 * すべてのExcelハンドルを一括で閉じ、リソースを解放します。
 * @private
 */
Excel.prototype._closeAll = function () {
	Packages.efw.excel.ExcelManager.closeAll();
};
/**
 * 操作中のワークブックインスタンスを保持する内部プロパティ。
 * @type {Object}
 * @private
 */
Excel.prototype._workbook = null;
/**
 * 指定したシートの最終行番号を取得します。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Number} 1から始まる行番号。
 */
Excel.prototype.getMaxRow = function (sheetName) {
	return 1 + this._workbook.getMaxRow(sheetName);
};
/**
 * 指定したシートの最終列番号を取得します。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Number} 1から始まる列番号。
 */
Excel.prototype.getMaxCol = function (sheetName) {
	return 1 + this._workbook.getMaxCol(sheetName);
};
/**
 * シートから複数の行データを配列として取得します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。開始行（1から開始）。
 * @param {Number|Function} endCondition - 必須。終了行番号、または終了判定関数。
 * @param {Object|Array} positionRowMaps - 必須。データ取得位置のマッピング定義。
 * @returns {Array} 取得したデータのオブジェクト配列。
 */
Excel.prototype.getArray = function (sheetName, startRow, endCondition, positionRowMaps) {
	var ary = [];
	function createPositionMap(row, positionRowMaps) {
		var ret = {};
		if (positionRowMaps instanceof Array) {
			for (var i = 0; i < positionRowMaps.length; i++) {
				var mp = positionRowMaps[i];
				for (var key in mp) {
					var v = mp[key];
					if (v instanceof Array) {
						ret[key] = [v[0] + (row + i), v[1], v[2]];//["A0",formatter,rounder]
					} else if (typeof v == "function") {
						ret[key] = v;
					} else {
						ret[key] = v + (row + i);
					}
				}
			}
		} else {
			for (var key in positionRowMaps) {
				var v = positionRowMaps[key];
				if (v instanceof Array) {
					ret[key] = [v[0] + row, v[1], v[2]];//["A0",formatter,rounder]
				} else if (typeof v == "function") {
					ret[key] = v;
				} else {
					ret[key] = v + row;
				}
			}
		}
		return ret;
	}
	if (typeof endCondition == "function") {
		var row = startRow;
		while (!endCondition(row)) {
			ary.push(this._getSingle(sheetName, createPositionMap(row, positionRowMaps), row));
			if (positionRowMaps instanceof Array) {
				row = row + positionRowMaps.length;
			} else {
				row++;
			}
		};
	} else if (typeof endCondition == "number") {
		for (var row = startRow; row <= endCondition;) {
			ary.push(this._getSingle(sheetName, createPositionMap(row, positionRowMaps), row));
			if (positionRowMaps instanceof Array) {
				row = row + positionRowMaps.length;
			} else {
				row++;
			}
		};
	}
	return ary;
};

/**
 * シートから定義に基づき、単一のデータオブジェクトを取得します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Object} positionMap - 必須。{"data1": "A1", "data2": ["B1", "#,##0"]} 形式のマッピング。
 * @returns {Object} 取得したデータのオブジェクト。
 */
Excel.prototype.getSingle = function (sheetName, positionMap) {
	return this._getSingle(sheetName, positionMap);
};
/** @private */
Excel.prototype._getSingle = function (sheetName, positionMap, currentRow) {
	var obj = {};
	for (var key in positionMap) {
		var pos = positionMap[key];
		if (pos instanceof Array) {
			obj[key] = this.getValue(sheetName, pos[0], pos[1], pos[2]);
		} else if (typeof pos == "function") {
			obj[key] = pos(currentRow);
		} else {
			obj[key] = this.getValue(sheetName, pos);
		}
	}
	return obj;
};
/**
 * セルから値を取得します。フォーマッタを使用して文字列として取得することも可能です。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} position - 必須。"A1"形式などのセル位置。
 * @param {String} [formatter] - 任意。数値や日付の書式（"#,##0"、"yyyy/MM/dd"など）。
 * @param {String} [rounder="HALF_EVEN"] - 任意。丸め処理の方法（UP, DOWN, HALF_UP等）。
 * @returns {String|Number|Date|Boolean} セルの値。
 */
Excel.prototype.getValue = function (sheetName, position, formatter, rounder) {
	var value = this._workbook.get(sheetName, position);
	if (value == null) {
		//値がnullの場合処理を飛ばす
	} else {
		var valueType = typeof value;
		if (valueType == "number") {
			if (formatter != null) {
				rounder = "" + rounder;
				value = value.format(formatter, rounder);
			}
		} else if (valueType == "object" && value.getClass) {
			var clsName = value.getClass().getName();
			if (clsName == "java.util.Date") {
				var dt = new Date();
				dt.setTime(value.getTime());
				value = dt;
				if (formatter != null) {
					value = value.format(formatter);
				}
			}
		}
	}
	return value;
};
/**
 * ワークブック内の全シート名の配列を取得します。
 * @returns {Array} シート名の配列。
 */
Excel.prototype.getSheetNames = function () {
	var ret = [];
	var ary = this._workbook.getSheetNames();
	for (var i = 0; i < ary.size(); i++) {
		ret.push("" + ary.get(i));
	}
	return ret;
};

/**
 * 新しいシートを作成するか、既存のシートをコピー（クローン）します。
 * @param {String} sheetName - 必須。作成する新しいシートの名前。
 * @param {String} [copyFrom] - 任意。コピー元となる既存のシート名。
 * @returns {Excel}
 */
Excel.prototype.createSheet = function (sheetName, copyFrom) {
	if (copyFrom == null) {
		this._workbook.createSheet(sheetName, null);
	} else {
		this._workbook.createSheet(sheetName, copyFrom);
	}
	return this;
};
/**
 * シートの印刷範囲を設定します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。開始行（0ベース）。
 * @param {Number} endRow - 必須。終了行（0ベース）。
 * @param {Number} startCol - 必須。開始列（0ベース）。
 * @param {Number} endCol - 必須。終了列（0ベース）。
 * @returns {Excel}
 */
Excel.prototype.setPrintArea = function (sheetName, startRow, endRow, startCol, endCol) {
	this._workbook.setPrintArea(sheetName, startRow, endRow, startCol, endCol);
	return this;
};
/**
 * 指定したシートを削除します。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Excel}
 */
Excel.prototype.removeSheet = function (sheetName) {
	this._workbook.removeSheet(sheetName);
	return this;
};
/**
 * セルにハイパーリンクを設定します。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} position - 必須。セル位置（"A1"など）。
 * @param {String} linkUrl - 必須。リンク先のURL。
 * @returns {Excel}
 */
Excel.prototype.setLink = function (sheetName, position, linkUrl) {
	this._workbook.setLink(sheetName, position, linkUrl);
	return this;
};
/**
 * シートの順序（タブの位置）を移動します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} order - 必須。並び順（1から開始）。
 * @returns {Excel}
 */
Excel.prototype.setSheetOrder = function (sheetName, order) {
	order = order - 1;
	if (order < 0) order = 0;
	this._workbook.setSheetOrder(sheetName, order);
	return this;
};
/**
 * 指定したシートをアクティブ状態に設定します。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Excel}
 */
Excel.prototype.setActiveSheet = function (sheetName) {
	this._workbook.setActiveSheet(sheetName);
	return this;
};
/**
 * セルに値を設定します。テンプレートを指定することで書式や数式、結合状態もコピー可能です。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} position - 必須。セル位置（"A1"など）。
 * @param {String|Number|Date|Boolean|null} value - 必須。設定する値。nullの場合は数式設定を試みます。
 * @param {String} [templateSheetName] - 任意。書式コピー元のシート名。
 * @param {String} [templatePosition] - 任意。書式コピー元のセル位置。
 * @returns {Excel}
 */
Excel.prototype.setCell = function (sheetName, position, value, templateSheetName, templatePosition) {
	if (value == undefined || value == Infinity || value == -Infinity || value == NaN || value == null) {
		if (templateSheetName != null && templatePosition != null) {
			this._workbook.setCellFormula(sheetName, position, templateSheetName, templatePosition);
		} else {
			this._workbook.setCellStringValue(sheetName, position, new java.lang.String(""));
		}
	} else if (typeof value == "string") {
		this._workbook.setCellStringValue(sheetName, position, new java.lang.String(value));
	} else if (typeof value == "number") {
		this._workbook.setCellDoubleValue(sheetName, position, new java.lang.Double(value));
	} else if (typeof value == "boolean") {
		this._workbook.setCellBooleanValue(sheetName, position, new java.lang.Boolean(value));
	} else if (typeof value == "object" && value.getTime) {
		this._workbook.setCellDateValue(sheetName, position, new java.util.Date(value.getTime()));
	}
	if (sheetName == templateSheetName && position == templatePosition) {
	} else {
		if (templateSheetName != null && templatePosition != null) {
			this._workbook.setMergedRegion(sheetName, position, templateSheetName, templatePosition);
			this._workbook.setCellStyle(sheetName, position, templateSheetName, templatePosition);
		}
	}
	return this;
};

/**
 * 指定したセル位置が、図形（Shape）によって囲まれているかどうかを判定します。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} position - 必須。セル位置。
 * @param {Number} [checkpointXRate=0.5] - 任意。セル内のチェックポイントX座標割合(0-1)。
 * @param {Number} [checkpointYRate=0.5] - 任意。セル内のチェックポイントY座標割合(0-1)。
 * @returns {Boolean} 囲まれている場合はtrue。
 */
Excel.prototype.isEncircled = function (sheetName, position, checkpointXRate, checkpointYRate) {
	if (checkpointXRate == null) checkpointXRate = 0.5;
	if (checkpointYRate == null) checkpointYRate = 0.5;
	return true && this._workbook.isEncircled(sheetName, position, checkpointXRate, checkpointYRate);
};

/**
 * テンプレート図形をコピーして、指定したセルを囲むように配置します（印影など）。
 * @param {String} sheetName - 必須。出力先シート名。
 * @param {String} position - 必須。配置位置（"A1"など）。
 * @param {String} templateSheetName - 必須。コピー元図形があるシート名。
 * @param {String} templateShapeName - 必須。コピー元図形の名前。
 * @param {Number} [shapeCenterXRate=0.5] - 任意。セル幅に対する図形中心のX座標割合。
 * @param {Number} [shapeCenterYRate=0.5] - 任意。セル高さに対する図形中心のY座標割合。
 * @param {Number} [shapeWidthRate=0.5] - 任意。セル幅に対する図形の幅の割合。
 * @param {Number} [shapeHeightRate=0.5] - 任意。セル高さに対する図形の高さの割合。
 * @returns {Excel}
 */
Excel.prototype.encircle = function (sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate) {
	if (shapeCenterXRate == null) shapeCenterXRate = 0.5;
	if (shapeCenterYRate == null) shapeCenterYRate = 0.5;
	if (shapeWidthRate == null) shapeWidthRate = 0.5;
	if (shapeHeightRate == null) shapeHeightRate = 0.5;
	this._workbook.encircle(sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate);
	return this;
};
/**
 * セル内に図形（Shape）を追加します。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} position - 必須。セル位置。
 * @param {String} templateSheetName - 必須。コピー元図形があるシート名。
 * @param {String} templateShapeName - 必須。コピー元図形の名前。
 * @param {String} [text=""] - 任意。図形に設定するテキスト。
 * @param {Number} [x=0] - 任意。セル内のX座標オフセット。
 * @param {Number} [y=0] - 任意。セル内のY座標オフセット。
 * @param {Number} [width=0] - 任意。図形の幅。
 * @param {Number} [height=0] - 任意。図形の高さ。
 * @returns {Excel}
 */
Excel.prototype.addShape = function (sheetName, position, templateSheetName, templateShapeName, text, x, y, width, height) {
	if (text == null) text = "";
	if (x == null) x = 0;
	if (y == null) y = 0;
	if (width == null) width = 0;
	if (height == null) height = 0;
	this._workbook.addShapeInCell(sheetName, position, templateSheetName, templateShapeName, text, x, y, width, height);
	return this;
};
/**
 * セル範囲を覆うように図形（Shape）を追加します。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} firstCellPosition - 必須。範囲の開始セル。
 * @param {String} lastCellPosition - 必須。範囲の終了セル。
 * @param {String} templateSheetName - 必須。テンプレート図形があるシート名。
 * @param {String} templateShapeName - 必須。テンプレート図形の名前。
 * @param {String} [text=""] - 任意。設定するテキスト。
 * @param {Number} [x1=0] - 任意。開始セル内の開始X座標。
 * @param {Number} [y1=0] - 任意。開始セル内の開始Y座標。
 * @param {Number} [x2=0] - 任意。終了セル内の終了X座標。
 * @param {Number} [y2=0] - 任意。終了セル内の終了Y座標。
 * @returns {Excel}
 */
Excel.prototype.addShapeInRange = function (sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text, x1, y1, x2, y2) {
	if (text == null) text = "";
	if (x1 == null) x1 = 0;
	if (y1 == null) y1 = 0;
	if (x2 == null) x2 = 0;
	if (y2 == null) y2 = 0;
	this._workbook.addShapeInRange(sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text, x1, y1, x2, y2);
	return this;
};

/**
 * 既存の図形（Shape）内の画像を新しい画像に差し替えます。
 * @param {String} sheetName - 必須。シート名。
 * @param {String} shapeName - 必須。図形の名前。
 * @param {String} newPicturePath - 必須。新しい画像のパス。
 * @returns {Excel}
 */
Excel.prototype.replacePicture = function (sheetName, shapeName, newPicturePath) {
	this._workbook.replacePicture(sheetName, shapeName, newPicturePath);
	return this;
};

/**
 * 行を挿入します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。挿入位置（0ベース）。
 * @param {Number} [n=1] - 任意。挿入する行数。
 * @returns {Excel}
 */
Excel.prototype.addRow = function (sheetName, startRow, n) {
	if (startRow < 0) return this;
	if (n == null) n = 1;
	this._workbook.addRow(sheetName, startRow, n);
	return this;
};

/**
 * 行を削除します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。削除開始位置（0ベース）。
 * @param {Number} [n=1] - 任意。削除する行数。
 * @returns {Excel}
 */
Excel.prototype.delRow = function (sheetName, startRow, n) {
	if (startRow < 0) return this;
	if (n == null) n = 1;
	this._workbook.delRow(sheetName, startRow, n);
	return this;
};

/**
 * 指定した範囲の行を表示します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。開始行（0ベース）。
 * @param {Number} [endRow] - 任意。終了行（デフォルトはstartRow）。
 * @returns {Excel}
 */
Excel.prototype.showRow = function (sheetName, startRow, endRow) {
	if (endRow == null) endRow = startRow;
	if (startRow > endRow) { var c = endRow; endRow = startRow; startRow = c; }
	if (startRow < 0) return this;
	this._workbook.showRow(sheetName, startRow, endRow);
	return this;
};

/**
 * 指定した範囲の行を非表示にします。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startRow - 必須。開始行（0ベース）。
 * @param {Number} [endRow] - 任意。終了行（デフォルトはstartRow）。
 * @returns {Excel}
 */
Excel.prototype.hideRow = function (sheetName, startRow, endRow) {
	if (endRow == null) endRow = startRow;
	if (startRow > endRow) { var c = endRow; endRow = startRow; startRow = c; }
	if (startRow < 0) return this;
	this._workbook.hideRow(sheetName, startRow, endRow);
	return this;
};
/**
 * 指定した範囲の列を表示します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startCol - 必須。開始列（0ベース）。
 * @param {Number} [endCol] - 任意。終了列（デフォルトはstartCol）。
 * @returns {Excel}
 */
Excel.prototype.showCol = function (sheetName, startCol, endCol) {
	if (endCol == null) endCol = startCol;
	if (startCol > endCol) { var c = endCol; endCol = startCol; startCol = c; }
	if (startCol < 0) return this;
	this._workbook.showCol(sheetName, startCol, endCol);
	return this;
};

/**
 * 指定した範囲の列を非表示にします。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} startCol - 必須。開始列（0ベース）。
 * @param {Number} [endCol] - 任意。終了列（デフォルトはstartCol）。
 * @returns {Excel}
 */
Excel.prototype.hideCol = function (sheetName, startCol, endCol) {
	if (endCol == null) endCol = startCol;
	if (startCol > endCol) { var c = endCol; endCol = startCol; startCol = c; }
	if (startCol < 0) return this;
	this._workbook.hideCol(sheetName, startCol, endCol);
	return this;
};
/**
 * 指定したシートを表示状態にします。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Excel}
 */
Excel.prototype.showSheet = function (sheetName) {
	this._workbook.showSheet(sheetName);
	return this;
};
/**
 * 指定したシートを非表示状態にします。
 * @param {String} sheetName - 必須。シート名。
 * @returns {Excel}
 */
Excel.prototype.hideSheet = function (sheetName) {
	this._workbook.hideSheet(sheetName);
	return this;
};
/**
 * シートの表示倍率（ズーム）を設定します。
 * @param {String} sheetName - 必須。シート名。
 * @param {Number} percent - 必須。倍率（100で100%）。
 * @returns {Excel}
 */
Excel.prototype.zoomSheet = function (sheetName, percent) {
	this._workbook.zoomSheet(sheetName, percent);
	return this;
};
/**
 * コンソールにデバッグ情報を出力します。
 * @param {String} [label=""] - 任意。デバッグ出力のラベル。
 * @returns {Excel}
 */
Excel.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Excel class.");
	return this;
};