"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to operate Database.
 * 
 * @author Chang Kejun
 */
function EfwServerDb() {};
/**
 * The class to execute insert update delete sql in database.
 * <br>
 * db.change(groupId,sqlId,params)<br>
 * db.change(groupId,sqlId,params,jdbcResourceName)<br>
 * db.change(sql)<br>
 * db.change(sql,jdbcResourceName)<br>
 * <br>
 * @param {String}
 *            groupId<br>
 * @param {String}
 *            sqlId<br>
 * @param {Object}
 *            params<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {String}
 *            jdbcResourceName<br>
 * @param {String}
 *            sql<br>
 * @returns {Number}
 */
EfwServerDb.prototype.change = function(groupId, sqlId, params, jdbcResourceName) {
	var count=0;
	if (params==undefined){
		var innerSql=groupId;//first param
		var innerJdbcResourceName=sqlId;//second param
		count = this._executeUpdate({
			"jdbcResourceName" : innerJdbcResourceName,
			"sql" : innerSql
		});
	}else{
		count = this._executeUpdate({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
	return count;
};
/**
 * The locker for master operating.
 */
EfwServerDb.prototype._locker = new java.util.concurrent.locks.ReentrantLock();
EfwServerDb.prototype._masters={};
/**
 * The function to operate master data in memory.
 * 
 * @param {String}
 *            masterId: required<br>
 * @param {Boolean}
 *            reload<br>
 * @param {String}
 *            jdbcResourceName<br>
 * @returns {Record}
 */
EfwServerDb.prototype.master=function(masterId, reload, jdbcResourceName) {
	this._locker.lock();
	var values;
	if (jdbcResourceName==undefined && reload==undefined){
		jdbcResourceName="";
		reload=false;
	}
	if (jdbcResourceName==undefined && typeof(reload) == "string"){
		jdbcResourceName=reload;
		reload=false;
	}
	if (jdbcResourceName==undefined){
		jdbcResourceName="";
	}
		
	try {
		if (reload == true) {
			this._masters[jdbcResourceName+":"+masterId] = this._executeQuery({
						"sql" : "select * from " + masterId,
						"jdbcResourceName":jdbcResourceName,
					});
		} else if (EfwServerDb.prototype._masters[masterId] == null) {
			this._masters[jdbcResourceName+":"+masterId] = this._executeQuery({
						"sql" : "select * from " + masterId,
						"jdbcResourceName":jdbcResourceName,
					});
		}
		values = this._masters[jdbcResourceName+":"+masterId];
	} finally {
		this._locker.unlock();
	}
	return new Record(values);
};
/**
 * The function to execute select sql in database.<br>
 * <br>
 * select(groupId,sqlId,params)<br>
 * select(groupId,sqlId,params,jdbcResourceName)<br>
 * select(sql)<br>
 * select(sql,jdbcResourceName)<br>
 * <br>
 * @param {String}
 *            groupId<br>
 * @param {String}
 *            sqlId<br>
 * @param {Object}
 *            params<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {String}
 *            jdbcResourceName<br>
 * @param {String}
 *            sql<br>
 * @returns {Record}
 */
EfwServerDb.prototype.select =function(groupId, sqlId, params, jdbcResourceName) {
	var values;
	if (params==undefined){
		var innerSql=groupId;//first param
		var innerJdbcResourceName=sqlId;//second param
		values = this._executeQuery({
			"jdbcResourceName" : innerJdbcResourceName,
			"sql" : innerSql
		});
	}else{
		values = this._executeQuery({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
	return new Record(values);
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to execute select sql.
 * 
 * @param executionParams
 *            <br>{ <br>
 *            groupId:String,//required<br>
 *            sqlId:String,//optional<br>
 *            sql:String,//optional<br>
 *            params:{param1:value1,param2:value2,...}//required<br>
 *            jdbcResourceName:String,//optional<br> }<br>
 * @returns {null | Array}
 */
EfwServerDb.prototype._executeQuery = function(executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = aryParam[key];
		if (null == vl ||(typeof(vl) == "string" && vl == "")){
			vl = null;
		}else if (vl.getTime){
			vl = new java.sql.Timestamp(vl.getTime());
		}
		params.put(key, vl);
	}
	var db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db==null){
		Packages.efw.db.DatabaseManager.open(jdbcResourceName);
		db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
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
	var parseValue = function(vl) {
		var value = vl;
		if (value == null) {
			//値がnullの場合処理を飛ばす
		}else{
			var valueType=typeof value;
			//if (valueType == "string") {
				//以下タイプは自動的に文字と見なす
				//java.lang.String
			//}else if (valueType == "number") {
				//以下タイプは自動的に数字と見なす
				//java.lang.Byte
				//java.lang.Double
				//java.lang.Float
				//java.lang.Integer
				//java.lang.Short
			//}else if (valueType == "boolean") {
				//以下タイプは自動的にブールと見なす
				//java.lang.Boolean
			if (valueType == "object" && value.getClass) {
				var clsName=value.getClass().getName();
				if(clsName=="java.lang.Long"
						|| clsName=="java.math.BigDecimal"){
					value = 0 + new Number(value);//new Numberはdebug関数を付けていないため+0にする
				} else if (clsName == "java.sql.Date"
						|| clsName == "java.sql.Time"
						|| clsName == "java.sql.Timestamp"
						|| clsName == "java.util.Date") {
					var dt = new Date();
					dt.setTime(value.getTime());
					value = dt;
				} else if (clsName == "oracle.sql.TIMESTAMP"){
					var dt = new Date();
					dt.setTime(value.timestampValue().getTime());
					value = dt;
				} else {
					var sValue=""+value;
					if (sValue.length>50){
						sValue=sValue.substr(0,50)+"...";
					}
					// you should do something if the comment is printed out.
					Packages.efw.framework.runtimeWLog("[" + sValue + "] is an instance of " + value.getClass().getName()
							+ " which is treated as a string in efw.");
					value=""+value;//change unknown type to string.
				}
			//}else{//javascript objectの場合//db処理の場合存在しない
			}
		}
		return value;
	};

	while (rs.next()) {// change recordset to javascript array
		var rsdata = {};
		var maxColumnCount = meta.getColumnCount();
		for (var j = 1; j <= maxColumnCount; j++) {
			var key = (""+meta.getColumnName(j)).toLowerCase();
			rsdata[key] = parseValue(rs.getObject(key));
		}
		ret.push(rsdata);
	}
	rs.close();
	// close query to free handle
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).closeQuery();
	return ret;
};
/**
 * The function to execute insert update delete sql.
 * @param executionParams
 *            <br>{ <br>
 *            groupId:String,//required<br>
 *            sqlId:String,//optional<br>
 *            sql:String,//optional<br>
 *            params:{param1:value1,param2:value2,...}//required<br>
 *            jdbcResourceName:String,//optional<br> }<br>
 * @returns {Number}
 */
EfwServerDb.prototype._executeUpdate = function(executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = aryParam[key];
		if (null == vl ||(typeof(vl) == "string" && vl == "")){
			vl = null;
		}else if (vl.getTime){
			vl = new java.sql.Timestamp(vl.getTime());
		}
		params.put(key, vl);
	}
	var db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db==null){
		Packages.efw.db.DatabaseManager.open(jdbcResourceName);
		db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	}
	if (sqlId != null)
		return db.executeUpdate(groupId, sqlId, params);
	if (sql != null)
		return db.executeUpdateSql(sql);
	return 0;
};
/**
 * The function to commit.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype._commit = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).commit();
};
/**
 * The function to rollback.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype._rollback = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).rollback();
};

/**
 * The function to commit all database.
 */
EfwServerDb.prototype._commitAll = function() {
	Packages.efw.db.DatabaseManager.commitAll();
};

/**
 * The function to rollback all database.
 */
EfwServerDb.prototype._rollbackAll = function() {
	Packages.efw.db.DatabaseManager.rollbackAll();
};


/**
 * The function to close all database.
 */
EfwServerDb.prototype._closeAll = function() {
	Packages.efw.db.DatabaseManager.closeAll();
};