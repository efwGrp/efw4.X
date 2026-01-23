"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * サーバーサイドで日付や数値、列挙型のフォーマット変換を行うためのクラス。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerFormat() {
};

/**
 * 数値をフォーマットされた文字列に変換します。
 * 全角文字（０＃，．％）を含むフォーマッタが指定された場合、出力結果も全角に変換されます。
 * @param {Number} value - 必須。フォーマット対象の数値。
 * @param {String} formatter - 必須。フォーマット形式（例: "#,###", "０．００"）。
 * @param {String} [rounder="HALF_EVEN"] - 任意。丸め方式。
 * (UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN)
 * @returns {String} フォーマット済み文字列。数値でない場合は空文字を返します。
 */
EfwServerFormat.prototype.formatNumber = function (value, formatter, rounder) {
	var isFullWidth = false;
	if (formatter.indexOf("０") > -1 || formatter.indexOf("＃") > -1) {
		isFullWidth = true;
		formatter = formatter
			.replace(/０/g, "0")
			.replace(/＃/g, "#")
			.replace(/，/, ",")
			.replace(/．/, ".")
			.replace(/％/, "%");

	}
	value = Number(value);
	if (isNaN(value))
		return "";// 数値でない場合は空文字を返す
	var ret = "" + Packages.efw.format.FormatManager.formatNumber(value, formatter,
		rounder);
	if (isFullWidth) {
		ret = ret
			.replace(/0/g, "０")
			.replace(/1/g, "１")
			.replace(/2/g, "２")
			.replace(/3/g, "３")
			.replace(/4/g, "４")
			.replace(/5/g, "５")
			.replace(/6/g, "６")
			.replace(/7/g, "７")
			.replace(/8/g, "８")
			.replace(/9/g, "９")
			.replace(/[\,]/g, "，")
			.replace(/[\.]/g, "．")
			.replace(/[\-]/g, "－")
			.replace(/[\%]/g, "％")
			;
	}
	return ret;
};

/**
 * 文字列を解析して数値に変換します。
 * @param {String|Number} value - 必須。解析対象の文字列。
 * @param {String} formatter - 必須。フォーマット形式。
 * @returns {Number|null} 変換後の数値。空の場合は null を返します。
 */
EfwServerFormat.prototype.parseNumber = function (value, formatter) {
	value += ""; // 数値が渡された場合も文字列に変換
	if (!value)
		return null;
	return 0 + new Number(Packages.efw.format.FormatManager.parseNumber(value,
		formatter));
};

/**
 * 日付をフォーマットされた文字列に変換します。
 * 全角文字（ＧｙＭｄＨｍｓＳ）を含むフォーマッタが指定された場合、出力結果も全角に変換されます。
 * @param {Date} value - 必須。フォーマット対象の日付。
 * @param {String} formatter - 必須。フォーマット形式（例: "yyyy/MM/dd", "JSON_DATE"）。
 * @returns {String} フォーマット済み文字列。
 */
EfwServerFormat.prototype.formatDate = function (value, formatter) {
	if (value == null)
		return "";
	if (!value.getTime)
		return "";

	if (formatter == "JSON_DATE") {
		return JSON.stringify(value).replace(/"/g, "");
	}
	var isFullWidth = false;
	if (formatter.indexOf("Ｇ") > -1 || formatter.indexOf("ｙ") > -1
		|| formatter.indexOf("Ｍ") > -1 || formatter.indexOf("ｄ") > -1
		|| formatter.indexOf("Ｈ") > -1 || formatter.indexOf("ｍ") > -1
		|| formatter.indexOf("ｓ") > -1 || formatter.indexOf("Ｓ") > -1) {
		isFullWidth = true;
		formatter = formatter
			.replace(/Ｇ/g, "G")
			.replace(/ｙ/g, "y")
			.replace(/Ｍ/g, "M")
			.replace(/ｄ/g, "d")
			.replace(/Ｈ/g, "H")
			.replace(/ｍ/g, "m")
			.replace(/ｓ/g, "s")
			.replace(/Ｓ/g, "S")
			;
	}

	var ret = "" + Packages.efw.format.FormatManager.formatDate(value.getTime(),
		formatter);
	if (isFullWidth) {
		ret = ret
			.replace(/0/g, "０")
			.replace(/1/g, "１")
			.replace(/2/g, "２")
			.replace(/3/g, "３")
			.replace(/4/g, "４")
			.replace(/5/g, "５")
			.replace(/6/g, "６")
			.replace(/7/g, "７")
			.replace(/8/g, "８")
			.replace(/9/g, "９")
			.replace(/M/g, "Ｍ")
			.replace(/T/g, "Ｔ")
			.replace(/S/g, "Ｓ")
			.replace(/H/g, "Ｈ")
			;
	}
	return ret;

};

/**
 * 文字列を解析して日付オブジェクトに変換します。
 * @param {String} value - 必須。解析対象の文字列。
 * @param {String} formatter - 必須。フォーマット形式（例: "yyyyMMdd", "JSON_DATE"）。
 * @returns {Date|null} 変換後のDateオブジェクト。
 */
EfwServerFormat.prototype.parseDate = function (value, formatter) {
	value += "";
	if (!value)
		return null;
	var dt = new Date();
	if (formatter == "JSON_DATE") {
		return new Date(value);
	}
	dt.setTime(Packages.efw.format.FormatManager.parseDate(value, formatter)
		.getTime());
	return dt;
};

/**
 * 値を列挙型（Enum）の定義に従ってラベル文字列に変換します。
 * @param {Any} value - 必須。変換元のコード値。
 * @param {String} formatter - 必須。"{ラベル1=コード1, ラベル2=コード2}" 形式の文字列。
 * @returns {String} 対応するラベル。見つからない場合は空文字を返します。
 */
EfwServerFormat.prototype.formatEnum = function (value, formatter) {
	var _value = "" + value;
	if (formatter == null) return _value;
	if (formatter.indexOf("{") != 0) return _value;
	if (formatter.lastIndexOf("}") != formatter.length - 1) return _value;
	formatter = formatter.substring(1, formatter.length - 1);
	var ary = formatter.split(",");
	for (var i = 0; i < ary.length; i++) {
		var item = ary[i].split("=");
		if (item.length != 2) return _value;
		var nm = item[0];
		var cd = item[1];
		if (cd.indexOf("'") == 0 && cd.lastIndexOf("'") == cd.length - 1) {
			cd = cd.substring(1, cd.length - 1);
		}
		if (_value == cd) return item[0];
		if (!isNaN(cd)) cd = "" + new Number(cd);
		if (_value == cd) return item[0];
		if (!isNaN(new Date(cd))) cd = "" + new Date(cd);
		if (_value == cd) return item[0];
	}
	return "";
};

/**
 * 列挙型のラベル文字列から元の値（Boolean/Number/Date等）を復元します。
 * @param {String} value - 必須。変換対象のラベル。
 * @param {String} formatter - 必須。"{ラベル1=コード1, ラベル2=コード2}" 形式の文字列。
 * @returns {Any|null} 復元されたコード値。
 */
EfwServerFormat.prototype.parseEnum = function (value, formatter) {
	var _value = "" + value;
	if (formatter == null) return _value;
	if (formatter.indexOf("{") != 0) return _value;
	if (formatter.lastIndexOf("}") != formatter.length - 1) return _value;
	formatter = formatter.substring(1, formatter.length - 1);
	var ary = formatter.split(",");
	for (var i = 0; i < ary.length; i++) {
		var item = ary[i].split("=");
		if (item.length != 2) return _value;
		var nm = item[0];
		var cd = item[1];
		if (_value == nm) {
			if ((cd.indexOf("'") == 0 && cd.lastIndexOf("'") == cd.length - 1) ||
				(cd.indexOf("\"") == 0 && cd.lastIndexOf("\"") == cd.length - 1)) {
				return cd.substring(1, cd.length - 1);
			} else {
				if (cd == "true") return true;
				if (cd == "false") return false;
				if (!isNaN(cd)) return 0 + new Number(cd);
				if (!isNaN(new Date(cd))) return new Date(cd);
				return cd;
			}
		}
	}
	return null;
};