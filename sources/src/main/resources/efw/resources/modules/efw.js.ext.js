"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
/**
 * JSONオブジェクトを拡張し、ディープコピー（深層複製）機能を提供します。
 * @param {Object} obj - コピー元のオブジェクト。
 * @param {Boolean} execFuncFlag - 任意。値が関数の場合、実行した結果をコピーするかどうか。
 * @returns {Object|Array|any} コピーされた新しいオブジェクト。
 */
JSON.clone = function (obj, execFuncFlag) {//TODO
	if (obj === null || obj === undefined) { // null copy
		return obj;
	} else if (typeof obj == "function") { // function executed value
		if (execFuncFlag) {
			return obj();
		} else {
			return obj;
		}
	} else if (typeof obj !== "object") { // simple value copy
		return obj;
	}
	var oClone;
	switch (obj.constructor) {
		case RegExp:
			oClone = new RegExp(obj.source, "g".substr(0, Number(obj.global)) + "i".substr(0, Number(obj.ignoreCase)) + "m".substr(0, Number(obj.multiline)));
			break;
		case Date:
			oClone = new Date(obj.getTime());
			break;
		case String:
			oClone = "" + obj;
			break;
		case Boolean:
			oClone = false && obj;
			break;
		case Number:
			oClone = 0 + obj;
			break;
		case Array:
			oClone = [];
			for (var sProp in obj) {
				oClone[sProp] = JSON.clone(obj[sProp], execFuncFlag);
			}
			break;
		// etc.
		default:
			oClone = {};
			for (var sProp in obj) {
				oClone[sProp] = JSON.clone(obj[sProp], execFuncFlag);
			}
	}
	return oClone;
};
///////////////////////////////////////////////////////////////////////////////
/**
 * 文字列の内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {String} 自身の文字列。
 */
String.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return "" + this;
};
Object.defineProperty(String.prototype, "debug", { enumerable: false });

/**
 * 数値の内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {Number} 自身の数値。
 */
Number.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return 0 + this;
};
Object.defineProperty(Number.prototype, "debug", { enumerable: false });

/**
 * 真偽値の内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {Boolean} 自身の真偽値。
 */
Boolean.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return this && true;
};
Object.defineProperty(Boolean.prototype, "debug", { enumerable: false });

/**
 * 日付の内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {Date} 自身の日付。
 */
Date.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return new Date(this.getTime());
};
Object.defineProperty(Date.prototype, "debug", { enumerable: false });

/**
 * 配列の内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {Array} 自身の配列。
 */
Array.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an array.");
	java.lang.System.out.println(JSON.stringify(this));
	return this;
};
Object.defineProperty(Array.prototype, "debug", { enumerable: false });

/**
 * 関数の情報を標準出力に出力します。
 * @param {String} [label] - ラベル。
 * @returns {Function} 自身の関数。
 */
Function.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is a function.");
	return this;
};
Object.defineProperty(Function.prototype, "debug", { enumerable: false });

/**
 * オブジェクトの内容を標準出力にダンプします。
 * @param {String} [label] - ラベル。
 * @returns {Object} 自身のオブジェクト。
 */
Object.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an object.");
	try {
		java.lang.System.out.println(JSON.stringify(this));
	} catch (e) {
		if (e instanceof Error) e = "" + e;
		java.lang.System.out.println("" + Packages.efw.framework.getUsefulInfoFromException(e));
	}
	return this;
};
Object.defineProperty(Object.prototype, "debug", { enumerable: false });
///////////////////////////////////////////////////////////////////////////////
/**
 * 文字列をBase64でエンコードします。
 * @returns {String} Base64文字列。
 */
String.prototype.base64Encode = function () {
	return "" + new java.lang.String(
		java.util.Base64.getUrlEncoder().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype, "base64Encode", { enumerable: false });

/**
 * 文字列をURIセーフなBase64（パディングなし）でエンコードします。
 * @returns {String} URIセーフBase64文字列。
 */
String.prototype.base64EncodeURI = function () {
	return "" + new java.lang.String(
		java.util.Base64.getUrlEncoder().withoutPadding().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype, "base64EncodeURI", { enumerable: false });

/**
 * Base64でエンコードされた文字列をデコードします。
 * @returns {String} デコード後の文字列。
 */
String.prototype.base64Decode = function () {
	return "" + new java.lang.String(
		java.util.Base64.getUrlDecoder().decode(
			new java.lang.String(this).getBytes()
		)
	);
};
Object.defineProperty(String.prototype, "base64Decode", { enumerable: false });
///////////////////////////////////////////////////////////////////////////////
/**
 * 数値をフォーマットまたは列挙型（enum）に従って文字列に変換します。
 * @param {String} formatter - フォーマット形式または {enum}。
 * @param {String} [rounder] - 任意。丸め方式（HALF_EVEN 等）。
 * @returns {String}
 */
Number.prototype.format = function (formatter, rounder) {
	if (formatter.indexOf("{") == 0 && formatter.lastIndexOf("}") == formatter.length - 1) {
		return EfwServerFormat.prototype.formatEnum(this, formatter);
	} else {
		return EfwServerFormat.prototype.formatNumber(this, formatter, rounder);
	}
};
Object.defineProperty(Number.prototype, "format", { enumerable: false });

/**
 * 値を数値に変換します。
 * @param {String} value - 対象の値。
 * @param {String} [formatter] - 任意。解析フォーマット。
 * @returns {Number}
 */
Number.parse = function (value, formatter) {
	if (formatter == null) {
		return 0 + new Number(value);
	} else if (formatter.indexOf("{") == 0 && formatter.lastIndexOf("}") == formatter.length - 1) {
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	} else {
		return EfwServerFormat.prototype.parseNumber(value, formatter);
	}
};
Object.defineProperty(Number, "parse", { enumerable: false });

/**
 * 日付をフォーマットまたは列挙型（enum）に従って文字列に変換します。
 * @param {String} formatter - 日付フォーマットまたは {enum}。
 * @returns {String}
 */
Date.prototype.format = function (formatter) {
	if (formatter.indexOf("{") == 0 && formatter.lastIndexOf("}") == formatter.length - 1) {
		return EfwServerFormat.prototype.formatEnum(this, formatter);
	} else {
		return EfwServerFormat.prototype.formatDate(this, formatter);
	}
};
Object.defineProperty(Date.prototype, "format", { enumerable: false });

/**
 * 値を日付（ミリ秒）に変換します。
 * @param {String} value - 対象の値。
 * @param {String} [formatter] - 任意。解析フォーマット。
 * @returns {Number|Date}
 */
Date.parse = function (value, formatter) {
	if (formatter == null) {
		return (new Date(value)).getTime();
	} else if (formatter.indexOf("{") == 0 && formatter.lastIndexOf("}") == formatter.length - 1) {
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	} else {
		return EfwServerFormat.prototype.parseDate(value, formatter);
	}
};
Object.defineProperty(Date, "parse", { enumerable: false });

/**
 * 現在（または指定日）までの経過年数を取得します。
 * @param {Date} [current] - 任意。基準日。
 * @returns {Number}
 */
Date.prototype.getYears = function (current) {
	if (current == null) current = new Date();
	var diff = Number.parse(current.format("yyyyMMdd"), "0") - Number.parse(this.format("yyyyMMdd"), "0");
	return Math.floor(diff / 10000);
};
Object.defineProperty(Date.prototype, "getYears", { enumerable: false });

/**
 * 真偽値を列挙型フォーマットに従って文字列に変換します。
 * @param {String} formatter - {enum} 形式の文字列。
 * @returns {String}
 */
Boolean.prototype.format = function (formatter) {
	return EfwServerFormat.prototype.formatEnum(this, formatter);
};
Object.defineProperty(Boolean.prototype, "format", { enumerable: false });

/**
 * 値を真偽値に変換します。
 * @param {String} value - 対象の値。
 * @param {String} [formatter] - 任意。解析フォーマット。
 * @returns {Boolean}
 */
Boolean.parse = function (value, formatter) {
	if (formatter == null) {
		return true && new Boolean(value);
	} else {
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	}
};
Object.defineProperty(Boolean, "parse", { enumerable: false });

/**
 * 文字列を列挙型フォーマットに従って変換します。
 * @param {String} formatter - {enum} 形式の文字列。
 * @returns {String}
 */
String.prototype.format = function (formatter) {
	return EfwServerFormat.prototype.formatEnum(this, formatter);
};
Object.defineProperty(String.prototype, "format", { enumerable: false });

/**
 * 値を文字列として解析・変換します。
 * @param {String} value - 対象の値。
 * @param {String} [formatter] - 任意。
 * @returns {String}
 */
String.parse = function (value, formatter) {
	if (formatter == null) {
		return value;
	} else {
		return EfwServerFormat.prototype.parseEnum(value, formatter);
	}
};
Object.defineProperty(String, "parse", { enumerable: false });

///////////////////////////////////////////////////////////////////////////////
/**
 * 四捨五入を行います。
 * @param {Number} num - 数値。
 * @param {Number} digit - 小数点以下の桁数。
 * @returns {Number}
 */
Math.ROUND = function (num, digit) {
	var sign = num < 0 ? -1 : 1;
	var digitVal = Math.pow(10, digit);
	return Math.round(num * sign * digitVal) * sign / digitVal;
};

/**
 * 切り上げを行います。
 * @param {Number} num - 数値。
 * @param {Number} digit - 小数点以下の桁数。
 * @returns {Number}
 */
Math.ROUNDUP = function (num, digit) {
	var sign = num < 0 ? -1 : 1;
	var digitVal = Math.pow(10, digit);
	return Math.ceil(num * sign * digitVal) * sign / digitVal;
};

/**
 * 切り捨てを行います。
 * @param {Number} num - 数値。
 * @param {Number} digit - 小数点以下の桁数。
 * @returns {Number}
 */
Math.ROUNDDOWN = function (num, digit) {
	var sign = num < 0 ? -1 : 1;
	var digitVal = Math.pow(10, digit);
	return Math.floor(num * sign * digitVal) * sign / digitVal;
};