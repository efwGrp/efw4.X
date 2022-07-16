/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to check or fire event.
 * 
 * @author Chang Kejun
 */
function EfwServer() {
};
/**
 * The function to check login or not.
 * @param eventId: Event Id.
 * @returns {null | Result}<br>
 */
EfwServer.prototype.checkLogin = function(eventId, lang){
	var currentAuthBean=Packages.efw.efwCorsFilter.getCurrentAuthBean();
	var needLoginCheck = currentAuthBean.loginCheck;
	var outOfLoginEventIdPattern = ""+currentAuthBean.outOfloginEventIdPatternString;
	var loginkey = ""+currentAuthBean.loginKey;
	if (needLoginCheck && outOfLoginEventIdPattern!="" && eventId.search(new RegExp(outOfLoginEventIdPattern))==-1) { // the login check
		var vl = session.get(loginkey);
		if (vl == null ||(typeof(vl) == "string" && vl == "")) {
			var result=(new Result())
			.alert(messages.get("SessionTimeoutException",lang));
			var loginUrl = ""+currentAuthBean.systemErrorUrl;
			result.navigate(loginUrl);
			return result;
		}
	}
	return null;
};
/**
 * The function to check auth.
 * @param eventId: Event Id.
 * @returns {null | Result}<br>
 */
EfwServer.prototype.checkAuth = function(eventId){
	var currentAuthBean=Packages.efw.efwCorsFilter.getCurrentAuthBean();
	var outOfLoginEventIdPattern =""+currentAuthBean.outOfloginEventIdPatternString;
	if (eventId.search(new RegExp(outOfLoginEventIdPattern)) == -1) {
		var needAuthCheck = currentAuthBean.authCheck;
		var authKey = ""+currentAuthBean.authKey;
		var authCases = ""+currentAuthBean.authCases;
		var authValue = session.get(authKey);
		if (needAuthCheck && authValue != null && authValue != ""  && authCases != "") {
			var hasAuth=false;
			var authCaseAry  = authCases.split(",");
			for (var i = 0; i < authCaseAry.length; i++) {
				var itm=currentAuthBean.authCasesMap.get(authCaseAry[i]);
				var authPattern = ""+itm.get(Packages.efw.properties.PropertiesManager.EFW_AUTH_AUTHPATTERN);
				var eventidPattern = ""+itm.get(Packages.efw.properties.PropertiesManager.EFW_AUTH_EVENTIDPATTERN);
				if (authPattern != "" && eventidPattern != "" && authValue.search(new RegExp(authPattern)) > -1  && eventId.search(new RegExp(eventidPattern)) > -1){
						hasAuth=true;
						break;
				}
			}
			if (hasAuth == false) {
				var result=new Result();
				var systemErrorUrl=""+currentAuthBean.systemErrorUrl;
				result.navigate(systemErrorUrl);
				return result;
			}
		}
	}
	return null;
};
/**
 * The function to check request params by params format
 * 
 * @param event:
 *            event object defined in your program.
 * @param requestParams:
 *            params from client.
 * @returns {null | Result}<br>
 */
EfwServer.prototype.checkStyle = function(event, requestParams, lang) {
	function _check(pms, fts, parentkey) { // required,format,display-name,max-length,min,max,
		var result = new Result();
		if (parentkey != null && parentkey != "")
			parentkey += " ";// in order for the space, parentkey+" "+sonkey"
		for ( var key in fts) { // check requestParams by every format define
			if (key=="debug") continue;// debug function is skipped
			var paramdef = fts[key];
			var param = pms[key];

			if (paramdef == null) { // if format define is null do nothing
			} else if (paramdef instanceof Array) { // if format define is array
				if (param != null) {
					// loop it to validate items in the array
					for (var i = 0; i < param.length; i++) {
						result = result.concat(_check(param[i], paramdef[0],
								parentkey + key + ":eq(" + i + ")"));
					}
				}
			} else if (typeof paramdef === "object") {
				// if format define is object check it
				if (param != null) { // validate attributes in the object
					result = result.concat(_check(param, paramdef, parentkey + key));
				}
			} else if (typeof paramdef == "string") {
				// if paramdef is string ,it means validators
				var validators = {};
				// split with [;] then split with fist [:] to get
				var tempAry = paramdef.split(";");
				for (var i = 0; i < tempAry.length; i++) {
					var vdtr = tempAry[i];
					var point = vdtr.indexOf(":");
					if (point > 0)
						validators[vdtr.substring(0, point)] = vdtr
								.substring(point + 1);
				}
				// must be inputed
				var required = validators["required"];
				// input format for date or number
				var format = validators["format"];
				// display name in error message
				var displayName = validators["display-name"];
				// input length for string
				var maxLength = validators["max-length"];
				var min = validators["min"]; // min value in format define
				var max = validators["max"]; // max value in format define
				var accept = validators["accept"]; // file ext name
				var minv = null; // min value
				var maxv = null; // max value
				var value = null; // the value of param
				// pay attention to the space, parentkey+" "+sonkey"
				var errorElementKey = parentkey + key;
				if ((param == null || param == "") && required == "true") {
					// if data is not inputed check required
					var message = messages.get("IsRequiredMessage",lang);
					result.alert(message,{"display-name":displayName})
					.highlight(errorElementKey)
					.focus(errorElementKey);
					continue;
				} else if (param != null && param != "" && format != null
						&& format != "") {
					// check format and convert data type
					var parser = null;
					var requriedMessage = null;
					// number #,##0.0
					if (format.indexOf("#") > -1 || format.indexOf("0") > -1) {
						parser = EfwServerFormat.prototype.parseNumber;
						requriedMessage = messages.get("NumberIsReuqiredMessage",lang);
					} else { // date yyyy/MM/dd
						parser = EfwServerFormat.prototype.parseDate;
						requriedMessage = messages.get("DateIsReuqiredMessage",lang);
					}
					try { // check it is number or not
						value = parser(param, format);
						pms[key] = value;
						try {
							minv = parser(min, format);
						} catch (e) {
						}
						try {
							maxv = parser(max, format);
						} catch (e) {
						}
					} catch (e) {
						var message = requriedMessage;
						result.alert(message,{"display-name":displayName})
						.highlight(errorElementKey)
						.focus(errorElementKey);
						continue;
					}
				} else if (param != null && param != "") {
					// if no format, the data is regraded as string,check maxlength
					var maxLengthv = new Number(maxLength);
					if (isNaN(maxLengthv))
						maxLengthv = null;
					// check max length
					if (maxLengthv != null && param.length > maxLengthv) {
						var message = messages.get("MaxLengthOverMessage",lang);
						result.alert(message,{"display-name":displayName,"max-length":maxLength})
						.highlight(errorElementKey)
						.focus(errorElementKey);
						continue;
					}
					if (accept != null) { // check file ext
						var exts = accept.split(",");
						var isAccepted = false;
						for (var i = 0; i < exts.length; i++) {
							if (param.substr(param.length - exts[i].length)
									.toLowerCase() == exts[i].toLowerCase()) {
								isAccepted = true;
								break;
							}
						}
						if (!isAccepted) {
							var message = messages.get("NotAcceptMessage",lang);
							result.alert(message,{"display-name":displayName})
							.highlight(errorElementKey)
							.focus(errorElementKey);
							continue;
						}
					}
					if (min == null || min == undefined)
						minv = null;
					else
						minv = min;
					if (max == null || max == undefined)
						maxv = null;
					else
						maxv = max;
					value = param;
				}

				if (value != null && value != "") {// check min max
					var message = null;
					if (minv != null && maxv != null) {
						if (value < minv || value > maxv)
						message = messages.get("MinOrMaxOverMessage",lang);
					} else if (minv != null) {
						if (value < minv)
						message = messages.get("MinOverMessage",lang);
					} else if (maxv != null) {
						if (value > maxv)
						message = messages.get("MaxOverMessage",lang);
					}
					if (message != null) {
						var dataType="";
						if (value.toFixed){
							dataType=messages.get("NumberType",lang);
						}else if (value.getTime){
							dataType=messages.get("DateType",lang);
						}else{
							dataType=messages.get("StringType",lang);
						}
						result.alert(message,{
							"display-name":displayName,
							"min":min,
							"max":max,
							"data-type":dataType,
						})
						.highlight(errorElementKey)
						.focus(errorElementKey);
						continue;
					}
				}
			}
		}
		return result;
	}

	// clone the paramsFormat, if function exists, it will be run.
	var paramsFormat = JSON.clone(event.paramsFormat,true);
	var result= _check(requestParams, paramsFormat, "");
	if (result.actions.alert){
		return result;
	}else{
		return null;
	}
};
/**
 * The function to fire event.
 * 
 * @param event:
 *            event object defined in your program.
 * @param requestParams:
 *            params from client.
 * @returns {null | Result | Event}
 */
EfwServer.prototype.fire = function(event, requestParams) {
	try {
		var result = event.fire(requestParams);
		if (result != null && result["actions"] != null
				&& result["actions"]["download"] != null) {// save download
			// info to session
			var download = result["actions"]["download"];
			var tmpfile = download.file;
			if (tmpfile == null)
				tmpfile = "";
			var tmpzip = download.zip;
			if (tmpzip == null)
				tmpzip = "";
			else
				tmpzip = tmpzip.join("|");
			var tmpdeleteafterdownload = download.deleteafterdownload;
			if (tmpdeleteafterdownload == null)
				tmpdeleteafterdownload = "";
			else
				tmpdeleteafterdownload = "" + tmpdeleteafterdownload;
			var tmpsaveas = download.saveas;
			if (tmpsaveas == null)
				tmpsaveas = "";
			var tmpzipBasePath =download.zipBasePath;
			if (tmpzipBasePath == null)
				tmpzipBasePath = "";
			var tmpisAbs = download.isAbs;
			if (tmpisAbs == null)
				tmpisAbs ="";
			else
				tmpisAbs =""+tmpisAbs;
				
			session.set("efw.download.file", tmpfile);
			session.set("efw.download.zip", tmpzip);
			session.set("efw.download.deleteafterdownload",
					tmpdeleteafterdownload);
			session.set("efw.download.saveas", tmpsaveas);
			session.set("efw.download.zipBasePath", tmpzipBasePath);
			session.set("efw.download.isAbs", tmpisAbs);
		}
		db._commitAll();
		return result;
	} catch (e) {
		db._rollbackAll();
		throw e;
	} finally {
		db._closeAll();
		Excel.prototype._closeAll();
		CSVWriter.prototype._closeAll();
	}
};

/**
 * The function to check a single value.
 * @param param:
 * 			The value.
 * @param paramdef
 * 			The input check style.
 * @return error message
 */
EfwServer.prototype._checkSingleStyle =function(param,paramdef,lang){
	function createReturnInfo(param,message,params){
		if (message!=null){
			for(var key in params){
				if (key=="debug") continue;// debug function is skipped
				message=message.replace(new RegExp("{"+key+"}", "g"), params[key]);
			}
			return {
				value:param,
				message:message
			};
		}else{
			return {
				value:param
			};
		}
	}

	// if paramdef is string ,it means validators
	var validators = {};
	// split with [;] then split with fist [:] to get
	var tempAry = paramdef.split(";");
	for (var i = 0; i < tempAry.length; i++) {
		var vdtr = tempAry[i];
		var point = vdtr.indexOf(":");
		if (point > 0)
			validators[vdtr.substring(0, point)] = vdtr
					.substring(point + 1);
	}
	// must be inputed
	var required = validators["required"];
	// input format for date or number
	var format = validators["format"];
	// display name in error message
	var displayName = validators["display-name"];
	// input length for string
	var maxLength = validators["max-length"];
	var min = validators["min"]; // min value in format define
	var max = validators["max"]; // max value in format define
	var accept = validators["accept"]; // file ext name
	var minv = null; // min value
	var maxv = null; // max value
	var value = null; // the value of param
	if ((param == null || param == "") && required == "true") {
		// if data is not inputed check required
		var message = messages.get("IsRequiredMessage",lang);
		return createReturnInfo(param,message,{"display-name":displayName});
	} else if (param != null && param != "" && format != null
			&& format != "") {
		// check format and convert data type
		var parser = null;
		var requriedMessage = null;
		// number #,##0.0
		if (format.indexOf("#") > -1 || format.indexOf("0") > -1) {
			parser = EfwServerFormat.prototype.parseNumber;
			requriedMessage = messages.get("NumberIsReuqiredMessage",lang);
		} else { // date yyyy/MM/dd
			parser = EfwServerFormat.prototype.parseDate;
			requriedMessage = messages.get("DateIsReuqiredMessage",lang);
		}
		try { // check it is number or not
			value = parser(param, format);
			param = value;
			try {
				minv = parser(min, format);
			} catch (e) {
			}
			try {
				maxv = parser(max, format);
			} catch (e) {
			}
		} catch (e) {
			var message = requriedMessage;
			return createReturnInfo(param,message,{"display-name":displayName});
		}
	} else if (param != null && param != "") {
		// if no format, the data is regraded as string,check maxlength
		var maxLengthv = new Number(maxLength);
		if (isNaN(maxLengthv))
			maxLengthv = null;
		// check max length
		if (maxLengthv != null && param.length > maxLengthv) {
			var message = messages.get("MaxLengthOverMessage",lang);
			return createReturnInfo(param,message,{"display-name":displayName,"max-length":maxLength});
		}
		if (accept != null) { // check file ext
			var exts = accept.split(",");
			var isAccepted = false;
			for (var i = 0; i < exts.length; i++) {
				if (param.substr(param.length - exts[i].length)
						.toLowerCase() == exts[i].toLowerCase()) {
					isAccepted = true;
					break;
				}
			}
			if (!isAccepted) {
				var message = messages.get("NotAcceptMessage",lang);
				return createReturnInfo(param,message,{"display-name":displayName});
			}
		}
		if (min == null || min == undefined)
			minv = null;
		else
			minv = min;
		if (max == null || max == undefined)
			maxv = null;
		else
			maxv = max;
		value = param;
	}

	if (value != null && value != "") {// check min max
		var message = null;
		if (minv != null && maxv != null) {
			if (value < minv || value > maxv)
			message = messages.get("MinOrMaxOverMessage",lang);
		} else if (minv != null) {
			if (value < minv)
			message = messages.get("MinOverMessage",lang);
		} else if (maxv != null) {
			if (value > maxv)
			message = messages.get("MaxOverMessage",lang);
		}
		if (message != null) {
			var dataType="";
			if (value.toFixed){
				dataType=messages.get("NumberType",lang);
			}else if (value.getTime){
				dataType=messages.get("DateType",lang);
			}else{
				dataType=messages.get("StringType",lang);
			}
			return createReturnInfo(param,message,{"display-name":displayName,"min":min,"max":max,"data-type":dataType});
		}
	}
	return createReturnInfo(param);
};