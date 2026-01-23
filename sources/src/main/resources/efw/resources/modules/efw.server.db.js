"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * データベース操作を行うためのクラス。
 * @author Chang Kejun
 * @constructor
 */
function EfwServerDb() { };

/**
 * データの登録・更新・削除（INSERT/UPDATE/DELETE）を実行します。
 * * @example
 * db.change(groupId, sqlId, params);
 * db.change(groupId, sqlId, params, jdbcResourceName);
 * db.change(sql);
 * db.change(sql, jdbcResourceName);
 * * @param {String} groupId - SQLグループID。
 * @param {String} sqlId - SQL ID。
 * @param {Object} params - SQLパラメータ {key: value, ...}。
 * @param {String} [jdbcResourceName] - 使用するJDBCリソース名。
 * @returns {Number} 影響を受けた行数。
 */
EfwServerDb.prototype.change = function (groupId, sqlId, params, jdbcResourceName) {
	var count = 0;
	if (params == undefined) {
		var innerSql = groupId;//first param
		var innerJdbcResourceName = sqlId;//second param
		count = this._executeUpdate({
			"jdbcResourceName": innerJdbcResourceName,
			"sql": innerSql
		});
	} else {
		count = this._executeUpdate({
			"jdbcResourceName": jdbcResourceName,
			"groupId": groupId,
			"sqlId": sqlId,
			"params": params
		});
	}
	return count;
};

/**
 * マスタ操作用の排他制御用ロッカー。
 * @private
 */
EfwServerDb.prototype._locker = Packages.efw.script.ScriptManager.getLocker();

/**
 * メモリ内にキャッシュされたマスタデータ。
 * @private
 */
EfwServerDb.prototype._masters = {};

/**
 * メモリ上のマスタデータを操作します。
 * 指定されたテーブルの内容を全件取得し、メモリにキャッシュします。
 * * @param {String} masterId - マスタ（テーブル）名。
 * @param {Boolean} [reload=false] - 強制的に再読み込みするかどうか。
 * @param {String} [jdbcResourceName] - JDBCリソース名。
 * @returns {Record} マスタデータのRecordオブジェクト。
 */
EfwServerDb.prototype.master = function (masterId, reload, jdbcResourceName) {
	this._locker.lock();
	var values;
	if (jdbcResourceName == undefined && reload == undefined) {
		jdbcResourceName = "";
		reload = false;
	}
	if (jdbcResourceName == undefined && typeof (reload) == "string") {
		jdbcResourceName = reload;
		reload = false;
	}
	if (jdbcResourceName == undefined) {
		jdbcResourceName = "";
	}

	try {
		if (reload == true) {
			this._masters[jdbcResourceName + ":" + masterId] = this._executeQuery({
				"sql": "select * from " + masterId,
				"jdbcResourceName": jdbcResourceName,
			});
		} else if (EfwServerDb.prototype._masters[masterId] == null) {
			this._masters[jdbcResourceName + ":" + masterId] = this._executeQuery({
				"sql": "select * from " + masterId,
				"jdbcResourceName": jdbcResourceName,
			});
		}
		values = this._masters[jdbcResourceName + ":" + masterId];
	} finally {
		this._locker.unlock();
	}
	return new Record(values);
};

/**
 * データの検索（SELECT）を実行します。
 * * @example
 * db.select(groupId, sqlId, params);
 * db.select(groupId, sqlId, params, jdbcResourceName);
 * db.select(sql);
 * db.select(sql, jdbcResourceName);
 * * @param {String} groupId - SQLグループID。
 * @param {String} sqlId - SQL ID、またはJDBCリソース名。
 * @param {Object} params - SQLパラメータ。
 * @param {String} [jdbcResourceName] - JDBCリソース名。
 * @returns {Record} 検索結果を保持するRecordオブジェクト。
 */
EfwServerDb.prototype.select = function (groupId, sqlId, params, jdbcResourceName) {
	var values;
	if (params == undefined) {
		var innerSql = groupId;//first param
		var innerJdbcResourceName = sqlId;//second param
		values = this._executeQuery({
			"jdbcResourceName": innerJdbcResourceName,
			"sql": innerSql
		});
	} else {
		values = this._executeQuery({
			"jdbcResourceName": jdbcResourceName,
			"groupId": groupId,
			"sqlId": sqlId,
			"params": params
		});
	}
	return new Record(values);
};

///////////////////////////////////////////////////////////////////////////////

/**
 * 検索クエリをJavaレイヤーで実行し、JavaScriptの配列に変換します。
 * @private
 */
EfwServerDb.prototype._executeQuery = function (executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for (var key in aryParam) {
		var vl = aryParam[key];
		if (null == vl || (typeof (vl) == "string" && vl == "")) {
			vl = null;
		} else if (vl.getTime) {
			vl = new java.sql.Timestamp(vl.getTime());
		}
		params.put(key, vl);
	}
	var db = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db == null) {
		Packages.efw.db.DatabaseManager.open(jdbcResourceName);
		db = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	}
	var rs;
	if (sqlId != null) {
		rs = db.executeQuery(groupId, sqlId, params);
	} else if (sql != null) {
		rs = db.executeQuerySql(sql);
	} else {
		return null;
	}
	var ret = [];
	var meta = rs.getMetaData();
	var parseValue = function (vl) {
		var value = vl;
		if (value == null) {
			//値がnullの場合処理を飛ばす
		} else {
			var valueType = typeof value;
			if ((valueType == "object" || valueType == "function") && value.getClass) {
				var clsName = value.getClass().getName();
				if (clsName == "java.lang.Long"
					|| clsName == "java.math.BigDecimal") {
					value = 0 + new Number(value);
				} else if (clsName == "java.sql.Date"
					|| clsName == "java.sql.Time"
					|| clsName == "java.sql.Timestamp"
					|| clsName == "java.util.Date") {
					var dt = new Date();
					dt.setTime(value.getTime());
					value = dt;
				} else if (clsName == "oracle.sql.TIMESTAMP") {
					var dt = new Date();
					dt.setTime(value.timestampValue().getTime());
					value = dt;
				} else if (clsName == "java.time.LocalDateTime") {
					var dt = new Date();
					dt.setTime(java.sql.Timestamp.valueOf(value).getTime());
					value = dt;
				} else {
					var sValue = "" + value;
					if (sValue.length > 50) {
						sValue = sValue.substr(0, 50) + "...";
					}
					Packages.efw.framework.runtimeWLog("[" + sValue + "] is an instance of " + value.getClass().getName()
						+ " which is treated as a string in efw.");
					value = "" + value;
				}
			}
		}
		return value;
	};

	while (rs.next()) {
		var rsdata = {};
		var maxColumnCount = meta.getColumnCount();
		for (var j = 1; j <= maxColumnCount; j++) {
			var key = ("" + meta.getColumnName(j)).toLowerCase();
			rsdata[key] = parseValue(rs.getObject(key));
		}
		ret.push(rsdata);
	}
	rs.close();
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).closeQuery();
	return ret;
};

/**
 * 更新クエリ（INSERT/UPDATE/DELETE）をJavaレイヤーで実行します。
 * @private
 */
EfwServerDb.prototype._executeUpdate = function (executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for (var key in aryParam) {
		var vl = aryParam[key];
		if (null == vl || (typeof (vl) == "string" && vl == "")) {
			vl = null;
		} else if (vl.getTime) {
			vl = new java.sql.Timestamp(vl.getTime());
		}
		params.put(key, vl);
	}
	var db = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db == null) {
		Packages.efw.db.DatabaseManager.open(jdbcResourceName);
		db = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	}
	if (sqlId != null)
		return db.executeUpdate(groupId, sqlId, params);
	if (sql != null)
		return db.executeUpdateSql(sql);
	return 0;
};

/**
 * 指定したJDBCリソースに対してコミットを実行します。
 * @param {String} [jdbcResourceName]
 * @private
 */
EfwServerDb.prototype._commit = function (jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).commit();
};

/**
 * 指定したJDBCリソースに対してロールバックを実行します。
 * @param {String} [jdbcResourceName]
 * @private
 */
EfwServerDb.prototype._rollback = function (jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).rollback();
};

/**
 * すべてのデータベース接続に対して一括コミットを実行します。
 * @private
 */
EfwServerDb.prototype._commitAll = function () {
	Packages.efw.db.DatabaseManager.commitAll();
};

/**
 * すべてのデータベース接続に対して一括ロールバックを実行します。
 * @private
 */
EfwServerDb.prototype._rollbackAll = function () {
	Packages.efw.db.DatabaseManager.rollbackAll();
};

/**
 * すべてのデータベース接続を閉じます。
 * @private
 */
EfwServerDb.prototype._closeAll = function () {
	Packages.efw.db.DatabaseManager.closeAll();
};

///////////////////////////////////////////////////////////////////////////////
/**
 * データベース操作用グローバルインスタンス。
 * @global
 */
var db = new EfwServerDb();