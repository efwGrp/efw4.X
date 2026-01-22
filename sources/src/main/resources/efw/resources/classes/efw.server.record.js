"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * 配列データを操作するためのクラス。
 * @param {Array} [array=[]] - 任意。基となるオブジェクト配列。
 * @author Chang Kejun
 * @constructor
 */
function Record(array) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Record"); }
	if (array == null) {
		this.values = [];
		this.length = 0;
	} else {
		this.values = array;
		this.length = array.length;
	}
};

/**
 * レコードの件数。
 * @type {Number}
 */
Record.prototype.length = 0;

/**
 * 保持しているレコード配列。
 * @type {Array}
 */
Record.prototype.values = null;

/**
 * レコードを検索（フィルタリング）します。
 * @param {String} field - 必須。検索対象のフィールド名。
 * @param {String} action - 必須。比較演算子 [ eq | gt | lt | like | !eq | !gt | !lt | !like ]。
 * @param {String|Number|Date|Boolean} value - 必須。比較する値。likeの場合は "%値%" 形式が使用可能。
 * @returns {Record} 検索結果を保持する新しいRecordインスタンス。
 */
Record.prototype.seek = function (field, action, value) {
	if (field == "" || field == undefined || field == null)
		return new Record();
	if (action != "eq" && action != "gt" && action != "lt" && action != "like"
		&& action != "!eq" && action != "!gt" && action != "!lt"
		&& action != "!like")
		return new Record();

	var ret = [];
	var likeFirst = false;
	var likeLast = false;
	if (action == "like" || action == "!like") {
		value = "" + value;
		if (value.substring(0, 1) == "%")
			likeFirst = true;
		if (value.substring(value.length - 1, value.length) == "%")
			likeLast = true;
		if (likeFirst)
			value = value.substring(1);
		if (likeLast)
			value = value.substring(0, value.length - 1);
	}
	for (var i = 0; i < this.values.length; i++) {
		var rd = this.values[i];
		switch (action) {
			case "eq":
				if (rd[field] == value)
					ret.push(rd);
				break;
			case "gt":
				if (rd[field] > value)
					ret.push(rd);
				break;
			case "lt":
				if (rd[field] < value)
					ret.push(rd);
				break;
			case "like": {
				var data = ("" + rd[field]);
				var idx = data.indexOf(value);
				if (((!likeFirst && idx == 0) || (likeFirst && idx > -1))
					&& ((!likeLast && idx == data.length - value.length) || (likeLast && idx > -1)))
					ret.push(rd);
				break;
			}
			case "!eq":
				if (rd[field] != value)
					ret.push(rd);
				break;
			case "!gt":
				if (rd[field] <= value)
					ret.push(rd);
				break;
			case "!lt":
				if (rd[field] >= value)
					ret.push(rd);
				break;
			case "!like": {
				var data = ("" + rd[field]);
				var idx = data.indexOf(value);
				if (!(((!likeFirst && idx == 0) || (likeFirst && idx > -1)) && ((!likeLast && idx == data.length
					- value.length) || (likeLast && idx > -1))))
					ret.push(rd);
				break;
			}
		}
	}
	return new Record(ret);
};

/**
 * レコードをソートします。
 * @param {String} field - 必須。ソート対象のフィールド名。
 * @param {String} action - 必須。ソート順 [ asc | desc ]。
 * @returns {Record} ソート後のRecordインスタンス。
 */
Record.prototype.sort = function (field, action) {
	if (field == "" || field == undefined || field == null)
		return new Record();
	if (action != "asc" && action != "desc" && action != "ASC"
		&& action != "DESC")
		return new Record();
	var ret = this.values.sort(function (a, b) {
		if (action == "desc" || action == "DESC") {
			if (a[field] < b[field])
				return 1;
			if (a[field] > b[field])
				return -1;
		} else {
			if (a[field] < b[field])
				return -1;
			if (a[field] > b[field])
				return 1;
		}
	});
	return new Record(ret);
};

/**
 * すべてのキー名を大文字に変換します。
 * @returns {Record} 変換後のRecordインスタンス。
 */
Record.prototype.makeAllKeysUpperCase = function () {
	var array = [];
	for (var i = 0; i < this.values.length; i++) {
		var rsdata = this.values[i];
		var item = {};
		for (var key in rsdata) {
			item[key.toUpperCase()] = rsdata[key];
		}
		array.push(item);
	}
	return new Record(array);
}

/**
 * すべてのキー名を小文字に変換します。
 * @returns {Record} 変換後のRecordインスタンス。
 */
Record.prototype.makeAllKeysLowerCase = function () {
	var array = [];
	for (var i = 0; i < this.values.length; i++) {
		var rsdata = this.values[i];
		var item = {};
		for (var key in rsdata) {
			item[key.toLowerCase()] = rsdata[key];
		}
		array.push(item);
	}
	return new Record(array);
}

/**
 * 指定されたマッピングルールに従ってレコードの形式を変換します。
 * @param {Object} mapping - 必須。マッピング定義。{新フィールド: 旧フィールド | 関数 | [フィールド, フォーマット, 丸め]}。
 * @returns {Record} 変換後のRecordインスタンス。
 */
Record.prototype.map = function (mapping) {
	if (mapping == null)
		return new Record();

	var array = [];
	for (var i = 0; i < this.values.length; i++) {
		var rsdata = this.values[i];

		var itemfix = null;
		var item = {};
		for (var key in mapping) {
			var mp = mapping[key];
			if (typeof mp == "string") {
				var vl = rsdata[mp];
				item[key] = vl;
			} else if (typeof mp == "function") {
				var vl = mp(rsdata, itemfix);
				item[key] = vl;
			} else if (typeof mp == "object" && mp instanceof Array) {
				var vl = rsdata[mp[0]];
				var ft = mp[1];
				if (vl != null && ft != null) {
					if (ft.indexOf("{") == 0 && ft.lastIndexOf("}") == ft.length - 1) {
						vl = EfwServerFormat.prototype.formatEnum(vl, ft);
					} else if (vl.toFixed) {// if vl is number #,##0.00
						var round = "" + mp[2];
						vl = EfwServerFormat.prototype.formatNumber(vl, ft, round);
					} else if (vl.getTime) {// if vl is date yyyyMMdd
						vl = EfwServerFormat.prototype.formatDate(vl, ft);
					}
				}
				item[key] = vl;
			}
		}
		array.push(item);
	}
	return new Record(array);
};

/**
 * 最初のレコードを取得します（ディープコピー）。
 * @returns {Object} 最初のデータアイテム。空の場合は空オブジェクト。
 */
Record.prototype.getSingle = function () {
	if (this.values.length == 0) return {};
	return JSON.clone(this.values[0]);
};

/**
 * レコード全体を配列として取得します（ディープコピー）。
 * @returns {Array} オブジェクト配列。
 */
Record.prototype.getArray = function () {
	return JSON.clone(this.values);
};

/**
 * 最初のレコードから指定したフィールドの値を取得します。
 * @param {String} field - 必須。フィールド名。
 * @returns {String|Number|Date|Boolean} フィールドの値。
 */
Record.prototype.getValue = function (field) {
	if (this.values.length == 0) return null;
	return this.values[0][field];
};

/**
 * 指定されたフィールドでレコードをグルーピング（階層化）します。
 * @param {...String} fields - 必須。グルーピングのキーとする1つ以上のフィールド名。
 * @returns {Object|null} 階層化されたオブジェクト。
 */
Record.prototype.group = function (/*field1,field2,field3...*/) {
	if (arguments.length == 0) return null;
	var root = {};
	//to create the tree
	for (var i = 0; i < this.values.length; i++) {
		var item = JSON.clone(this.values[i]);
		var current = root;
		for (var j = 0; j < arguments.length; j++) {
			var key = arguments[j];
			if (current[item[key]] == null) {
				if (j == arguments.length - 1) {
					current[item[key]] = [];
				} else {
					current[item[key]] = {};
				}
			}
			current = current[item[key]];
			delete item[key];
		}
		current.push(item);
	}
	return root;
};

/**
 * コンソールにデバッグ情報を出力します。
 * @param {String} [label=""] - 任意。出力ラベル。
 * @returns {Record}
 */
Record.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Record class.");
	java.lang.System.out.println("records:" + JSON.stringify(this.values));
	return this;
};