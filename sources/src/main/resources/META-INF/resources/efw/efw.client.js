/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate event at client.
 * 
 * @author Chang Kejun
 */
var EfwClient = function() {
};
/**
 * The object to keep the ajax options for retry.
 */
EfwClient.prototype._options = null;
/**
 * The function to fire event.
 * 
 * @param {Object}
 *			eventParams: required<br> {<br>
 *			eventId:String,required<br>
 *			manualParams:{},optional<br> }
 */
EfwClient.prototype.fire = async function(eventParams) {
	var eventId = eventParams.eventId;
	var manualParams = eventParams.manualParams;
	$(".efw_input_error").removeClass("efw_input_error");// clear input error
	var servletUrl = "efwServlet";
	if (eventParams.server) {
		servletUrl = eventParams.server + "/" + servletUrl;
	} else {
		servletUrl = efw.baseurl + "/" + servletUrl;
	}
	var uploadUrl = "uploadServlet";
	if (eventParams.server) {
		uploadUrl = eventParams.server + "/" + uploadUrl;
	} else {
		uploadUrl = efw.baseurl + "/" + uploadUrl;
	}
	var downloadUrl = "downloadServlet";
	if (eventParams.server) {
		downloadUrl = eventParams.server + "/" + downloadUrl;
	} else {
		downloadUrl = efw.baseurl + "/" + downloadUrl;
	}
	var previewUrl = "previewServlet";
	if (eventParams.server) {
		previewUrl = eventParams.server + "/" + previewUrl;
	} else {
		previewUrl = efw.baseurl + "/" + previewUrl;
	}
	var webSocketUrl = "efwWebSocket";
	if (eventParams.server) {
		webSocketUrl = eventParams.server + "/" + webSocketUrl;
	} else {
		webSocketUrl = efw.baseurl + "/" + webSocketUrl;
	}
	try {
		//first calling
		this._consoleLog("First calling parameters", eventParams);
		var paramsFormat = await this._callFirstAjax(servletUrl, eventId);
		this._consoleLog("First calling result", paramsFormat);
		// auto collect params
		// the first calling return data is paramsformat,use it to get params
		var params = this._pickupParams(eventId, paramsFormat, null, manualParams);
		// upload files
		if (this._pickupParams_uploadformdata != null) {
			await this._callUploadAjax(uploadUrl);
			this._pickupParams_uploadformdata = null;// reset it for next ajax.
		}
		if (!eventParams.wsMode){
			// second calling
			this._consoleLog("Second calling parameters", params);
			var result = await this._callSecondAjax(servletUrl, eventId, params);
			this._consoleLog("Second calling result", result, true);
			//auto show values
			if (result.values) this._showValues(eventId, result.values);
			//auto do actions
			if (result.actions) this._showActions(eventId, result.actions, downloadUrl, previewUrl);
			//it will return result.data
			return result.data;
		}else{//in WebSocket Mode
			this._callSecondAjaxInWsMode(webSocketUrl, eventId, params, downloadUrl, previewUrl);
		}
	} catch (e) {
		if (e.errorTitle) {
			this._consoleLog(e.errorTitle, e.errorData);
		}
	}
};

/**
 * The internal function for calling the first ajax to get paramsFormat
 */
EfwClient.prototype._callFirstAjax = function(servletUrl, eventId) {
	var self = this;
	return new Promise(function(resolve, reject) {
		$.ajax(self._options = {
			url: servletUrl,
			xhrFields: { withCredentials: true },
			type: "POST",// post method
			cache: false,// don't use cache
			async: true,// don't use async
			dataType: "json",// send or get data by json type
			contentType: "application/json;charset=UTF-8",
			// first calling only send groupid and eventid
			data: JSON.stringify({
				"eventId": eventId,
				"lang": efw.lang
			}),
			success: function(result) {
				if (result.actions != null) {
					self._showActions(eventId, result.actions);
					if (result.actions.error == null) {
						reject({});//because actions are not expected, so it needs not to call the second ajax
					}else{
						reject({
							errorTitle: result.actions.error.clientMessageId,
							errorData: result.actions.error.params,
						});
					}
				} else {
					resolve(result);
				}
			},
			error: function(errorResponse, errorType, errorMessage) {
				efw.dialog.alert(efw.messages.CommunicationErrorException, {
					"OK": function() { $.ajax(self._options); },
					"Cancel": function() {
						reject({
							errorTitle: "First calling error",
							errorData: {
								errorResponse: errorResponse,
								errorType: errorType,
								errorMessage: errorMessage
							}
						});
					}
				});
			}
		});
	});
}

/**
 * The internal function for calling the upload ajax to send files to server
 */
EfwClient.prototype._callUploadAjax = function(uploadUrl) {
	var self = this;
	return new Promise(function(resolve, reject) {
		$.ajax(self._options = {
			url: uploadUrl,
			xhrFields: { withCredentials: true },
			type: "POST",// post method
			dataType: "json",// send or get data by json type
			cache: false,// don't use cache true
			async: true,// don't use async false
			processData: false,
			contentType: false,
			data: self._pickupParams_uploadformdata,// upload
			// files
			success: function(data) {
				resolve();
			},
			error: function(errorResponse, errorType, errorMessage) {
				efw.dialog.alert(efw.messages.CommunicationErrorException, {
					"OK": function() { $.ajax(self._options); },
					"Cancel": function() {
						reject({
							errorTitle: "Uploading error",
							errorData: {
								errorResponse: errorResponse,
								errorType: errorType,
								errorMessage: errorMessage
							}
						});
					}
				});
			}
		});
	});
}
/**
 * The internal function for calling the second ajax to get the event result
 */
EfwClient.prototype._callSecondAjax = function(servletUrl, eventId, params) {
	var self = this;
	//this function is for tomcat11 URL integrity check
	function beSureDecodable(str){
		for(var i=0;i<10;i++){
			str=str.substring(0,str.length-1);
			try{
				decodeURIComponent(str);
				return str;
			}catch(e){}
		}
		return str;
	}
	return new Promise(function(resolve, reject) {
		$.ajax(self._options = {
			url: servletUrl + "?eventId=" + eventId + "&lang=" + efw.lang + "&params=" + beSureDecodable(encodeURIComponent(JSON.stringify(params)).substring(0, 1024)),//to save info for access log  
			xhrFields: { withCredentials: true },
			type: "POST",// post method
			cache: false,// don't use cache true
			async: true,// don't use async false
			dataType: "json",// send or get data by json type
			contentType: "application/json;charset=UTF-8",
			// first calling only send groupid and eventid
			data: JSON.stringify({
				"eventId": eventId,
				"lang": efw.lang,
				"params": params
			}),
			success: function(result) {
				//retry when busy
				if (result.actions.error != null && result.actions.error.clientMessageId == "EventIsBusyException") {
					var service = result.actions.error.params;
					if (service != null) {
						var message = service.message ? service.message : efw.messages.EventIsBusyException;
						if (service.retriable) {
							var countdown = service.interval ? service.interval : 30;
							if (service.interval) countdown = service.interval;
							efw.dialog.wait(message, countdown, null, function() { $.ajax(self._options); });
						} else {
							efw.dialog.alert(message);
							reject({
								errorTitle:result.actions.error.clientMessageId,
								errorData:result.actions.error.params,
							});
						}
					}
				}
				resolve(result);
			},
			error: function(errorResponse, errorType, errorMessage) {
				efw.dialog.alert(efw.messages.CommunicationErrorException, {
					"OK": function() { $.ajax(self._options); },
					"Cancel": function() {
						reject({
							errorTitle: "Second calling error",
							errorData: {
								errorResponse: errorResponse,
								errorType: errorType,
								errorMessage: errorMessage
							}
						});
					}
				});
			}
		});
	});
}
/**
 * The internal function for calling the second ajax to get the event result in websocket mode
 */
EfwClient.prototype._callSecondAjaxInWsMode = function(webSocketUrl, eventId, params, downloadUrl, previewUrl) {
	var self = this;
	//this function is for tomcat11 URL integrity check
	function beSureDecodable(str){
		for(var i=0;i<10;i++){
			str=str.substring(0,str.length-1);
			try{
				decodeURIComponent(str);
				return str;
			}catch(e){}
		}
		return str;
	}
	var ws=$.simpleWebSocket({ 
		url: webSocketUrl + "?eventId=" + eventId + "&lang=" + efw.lang + "&referer=" + encodeURIComponent(window.location.href) + "&params=" + beSureDecodable(encodeURIComponent(JSON.stringify(params)).substring(0, 1024)),//to save info for access log
		timeout: 20000,
		attempts: 10,
		dataType: "json",
		onOpen: function(event) {},
		onClose: function(event) {},
		onError: function(event) {
			this._consoleLog("Second calling error", e);
			efw.dialog.alert(efw.messages.CommunicationErrorException);
		},
	}).listen(function(result){
		try{
			self._consoleLog("Second calling result", result, true);
			//retry when busy
			if (result.actions.error != null && result.actions.error.clientMessageId == "EventIsBusyException") {
				var service = result.actions.error.params;
				if (service != null) {
					var message = service.message ? service.message : efw.messages.EventIsBusyException;
					if (service.retriable) {
						var countdown = service.interval ? service.interval : 30;
						if (service.interval) countdown = service.interval;
						efw.dialog.wait(message, countdown, null, function() { ws.send(self._options); });
					} else {
						efw.dialog.alert(message);
					}
				}
			}else{
				//auto show values
				if (result.values) self._showValues(eventId, result.values);
				//auto do actions
				if (result.actions) self._showActions(eventId, result.actions, downloadUrl, previewUrl);
			}
		}catch(e){
			self._consoleLog("Second calling error", e);
		}
	}).send(self._options={
		"eventId": eventId,
		"lang": efw.lang,
		"params": params
	});
}
/**
 * The internal object to keep upload form data.
 */
EfwClient.prototype._pickupParams_uploadformdata = null;
/**
 * The internal function to pickup params from web.
 * @param paramsFormat
 * @param context
 * @param manualParams
 * @returns {Object}
 */
EfwClient.prototype._pickupParams = function(eventId, paramsFormat, context,
	manualParams) {
	try {
		var data = {};
		for (var key in paramsFormat) {
			var format = paramsFormat[key];
			var element;
			if (context == null) {
				element = $(key);
			} else {
				element = $(key, $(context));
			}
			var vl = null;
			// if format is null, it means the value should be a string.
			// if format is string exp 'yyyy/MM/dd',
			// it means the value should be parsed by the format in server.
			if (format == null || $.type(format) == "string") {
				if (element.length == 1) {
					var tgNm = element[0].tagName;
					if (tgNm == "INPUT" || tgNm == "SELECT" || tgNm == "TEXTAREA" || tgNm == "PROGRESS") {
						vl = element.val();
						if (element[0].type == "checkbox") {
							if (!element[0].checked) {
								vl = null;
							}
						} else if (element[0].type == "file") {
							if (vl != null && vl != "") {
								if (this._pickupParams_uploadformdata == null)
									this._pickupParams_uploadformdata = new FormData();
								//multi files
								var files=$(element[0]).prop("files");
								var vls=[];
								for(var i=0;i<files.length;i++){
									this._pickupParams_uploadformdata.append("filename", files[i]);
									vls.push(files[i].name);
								}
								vl=vls.join("|");//to support multi-files in one file tag
							}
						}
					} else if (tgNm == "IMG") {
						vl=element.attr("src");
					} else if (tgNm == "HTML") {
						// the next puzzle code is only for firefox
						$("input,button").each(function() {
							this.setAttribute('value', this.value);
						});
						$("textarea").each(function() {
							$(this).text(this.value);
						});
						$("input:radio,input:checkbox").each(function() {
							if (this.checked)
								this.setAttribute('checked', 'checked');
							else
								this.removeAttribute('checked');
						});
						$("option").each(function() {
							if (this.selected)
								this.setAttribute('selected', 'selected');
							else
								this.removeAttribute('selected');
						});
						vl = element.html();
					} else {
						vl = element.text();
					}
				} else if (element.length == 0) {
					var isMatched = false;
					if (manualParams != null) {
						vl = manualParams[key];
						if (vl != null) {
							isMatched = true;
						}
					}
					if (!isMatched) {
						throw "'" + key + "' is not matched to any element.";
					}
				} else {
					throw "'" + key + "' can not be matched to multiple elements.";
				}
				//if format string contains secure
				if ( format!=null && format.indexOf("secure:true")>-1){
					if (vl!=null)vl=btoa(encodeURIComponent(vl));
				}
			} else if ($.type(format) == "array") {
				if ($.type(format[0]) == "object") {
					var ary = [];
					var self = this;
					$(element).each(
						function(idx, dom) {
							ary.push(self._pickupParams(
								eventId, format[0], dom, manualParams));
						});
					vl = ary;
				} else {
					throw "'" + key + "' in params format should be an object.";
				}
			} else if ($.type(format) == "object") {
				vl = this._pickupParams(eventId, format, element,
					manualParams);
			} else {
				throw "'" + key + "' in params format can not be a simple data.";
			}
			data[key] = vl;
		}
		return data;
	} catch (e) {
		if (e.errorTitle){
			throw e;
		}else{
			this._showActions(eventId, { "error": { "clientMessageId": "ParamsFormatErrorException", "params": { "eventId": eventId } } });
			throw { errorTitle: "Params format error", errorData: e };
		}
	}
};
/**
 * The internal function to show values to web.
 * @param values
 */
EfwClient.prototype._showValues = function(eventId, values) {
	try {
		if ((values instanceof Array) == false) throw "The return values must be an array.";
		// return value to html
		// ---------------------------------------------------------------------
		// values is array of running data sample
		for (var running_idx = 0; running_idx < values.length; running_idx++) {
			var running = values[running_idx];
			// "runat" must match only one html object.
			var attr_runat = running["runat"];
			if (attr_runat == null || attr_runat == "")
				attr_runat = "body";
			var runat = $(attr_runat);

			var attr_removeeach = running["remove"];
			if (attr_removeeach != "" && attr_removeeach != null) {
				$(attr_removeeach, $(runat)).remove();
			}

			var withdata = running["withdata"];
			var attr_appendmask = running["append"];

			// if appendmask is nothing the withdata must be object
			// -----------------------------------------------------------------
			if (attr_appendmask == "" || attr_appendmask == null) {
				// if withdata is nothing, then do nothing
				if (withdata == null) {
					//continue;
					// if withdata is not object, then error
				} else if ($.type(withdata) != "object") {
					throw "If without appendmask,the withdata for [runat="
					+ attr_runat + "] should be an object.";
				} else {
					// try to show the data in withdata by the key.
					for (var withdata_key in withdata) {
						var data = withdata[withdata_key];
						if (data == null)
							data = "";// if data isnull then change it to blank
						if ($.type(data) != "string" && $.type(data) != "number"
							&& $.type(data) != "date"
							&& $.type(data) != "boolean") {
							throw "The data " + data
							+ " in withdata of [runat=" + attr_runat
							+ "] should be a simple type.";
						}
						// you can only set data to the html range of runat
						// you can not set data both in and out of runat
						$(withdata_key, $(runat)).each(function() {
							// set data with checked attribute
							if ((this.tagName == "INPUT" && this.type == "checkbox") || (this.tagName == "INPUT" && this.type == "radio")) {
								if (withdata[withdata_key] == $(
									this).val()) {
									$(this).prop("checked", true);
								} else {
									$(this).prop("checked", false);
								}
								// set data to value attribute
							} else if (this.tagName == "INPUT" || this.tagName == "TEXTAREA" || this.tagName == "PROGRESS") {
								$(this).val(data);
							} else if (this.tagName == "IMG") {
								$(this).attr("src",data);
								// set data with selected attribute
							} else if (this.tagName == "SELECT") {
								var dataAry = ("" + data)
									.split(",");
								$("option", $(this)).removeAttr(
									"selected");
								for (var dataAry_idx = 0; dataAry_idx < dataAry.length; dataAry_idx++) {
									$("option", $(this))
										.each(
											function() {
												if (this.value == dataAry[dataAry_idx]) {
													this.selected = true;
												}
											});
								}
							} else {// set data to text
								$(this).text(data);
							}
						});
					}
				}
				// -----------------------------------------------------------------
			} else {
				if ($.type(attr_appendmask) != "string") {
					throw "Appendmask should be a string.";
				}
				// if return data is nothing, then do nothing
				if (withdata == null) {
					//continue;
					// if return data is not array, then error
				} else if ($.type(withdata) != "array") {
					throw "If with appendmask,the withdata for [runat="
					+ attr_runat + "] should be an array of object.";
				} else {
					$(runat).each(function() {
						for (var withdata_idx = 0; withdata_idx < withdata.length; withdata_idx++) {
							var dataRow = withdata[withdata_idx];
							if ($.type(dataRow) != "object") {
								throw "The withdata for [runat="
								+ attr_runat
								+ "] should be an array of object.";
							}
							var temp_appendmask = attr_appendmask;
							for (var dataRow_key in dataRow) {
								var data = dataRow[dataRow_key];
								if (data == null) {
									data = "";
								} else {
									data = "" + data;
								}// if data isnull then change it
								// to blank
								temp_appendmask = temp_appendmask
									.split(
										"{{" + dataRow_key
										+ "}}")
									.join(data);
								data = data.replace(/&/g, '&amp;')
									.replace(/>/g, '&gt;')
									.replace(/</g, '&lt;')
									.replace(/"/g, '&quot;')
									.replace(/'/g, '&#39;');
								temp_appendmask = temp_appendmask
									.split(
										"{" + dataRow_key
										+ "}")
									.join(data);
							}
							$(this).append(temp_appendmask);
						}
					});
				}
			}
		}
	} catch (e) {
		if (e.errorTitle){
			throw e;
		}else{
			this._showActions(eventId, { "error": { "clientMessageId": "ResultValuesErrorException", "params": { "eventId": eventId } } });
			throw { errorTitle: "Result values error", errorData: e };
		}
	}
};
/**
 * The internal function to show actions to web.
 * @param eventId
 * @param actions
 * @param downloadUrl
 * @param previewUrl
 */
EfwClient.prototype._showActions = function(eventId, actions, downloadUrl, previewUrl) {
	try {
		if ((actions instanceof Array)) throw "The return actions must be an object.";
		//-------------------------------------------------------------------------
		if (actions.error) {
			var message = efw.messages[actions.error.clientMessageId];
			if (message == null) throw "No client message is defined for [error=" + actions.error.clientMessageId + "].";
			var params = actions.error.params;
			if (params) {
				for (var key in params) {
					message = message.replace(new RegExp("{" + key + "}", "g"), params[key]);
				}
			}
			var callback = function() {
				if (actions.navigate) {
					var url = actions.navigate.url;
					if (actions.navigate.params != null) {
						url += (url.indexOf("?") > -1 ? "&" : "?") + $.param(actions.navigate.params);
					}
					window.open(url, "_self");
				}
			};
			efw.dialog.alert(message, null, null, callback);
			return;
		}
		//-------------------------------------------------------------------------
		if (actions.show) $(actions.show).show();
		if (actions.hide) $(actions.hide).hide();
		if (actions.enable) $(actions.enable).prop("disabled", false);
		if (actions.disable) $(actions.disable).prop("disabled", true);
		if (actions.highlight) $(actions.highlight).addClass("efw_input_error");
		if (actions.preview) efw.dialog.preview(previewUrl+"?lang="+efw.lang+"&fl="+actions.preview.file,actions.preview.file);
		if (actions.progress) efw.dialog.progress(actions.progress.message,actions.progress.percent,actions.progress.closeFlag);
		//-------------------------------------------------------------------------
		function continueAfterDownloaded() {
			function continueAfterConfirmAlert() {
				if (actions.eval) { window.eval(actions.eval.join(";")); }
				try { if (actions.focus) $(actions.focus).focus(); } catch (e) { }
				if (actions.navigate) {
					var url = actions.navigate.url;
					if (actions.navigate.params != null) {
						url += (url.indexOf("?") > -1 ? "&" : "?") + $.param(actions.navigate.params);
					}
					window.open(url, "_self");
				}
			}
			//---------------------------------------------------------------------
			if (actions.confirm) {
				var message = actions.confirm.message;
				if (actions.alert) message = actions.alert.join("\n") + "\n" + message;
				efw.dialog.alert(message, actions.confirm.buttons, actions.confirmTitle, continueAfterConfirmAlert);
			} else if (actions.alert) {
				efw.dialog.alert(actions.alert.join("\n"), null, actions.alertTitle, continueAfterConfirmAlert);
			} else {
				continueAfterConfirmAlert();
			}
		}
		//-------------------------------------------------------------------------
		if (actions.download) {
			efw.isDownloading = true;
			window.location = downloadUrl;
			function waitUntilDownloaded() {
				window.setTimeout(function() {
					if (Cookies.get("efw_Downloaded")) {
						efw.isDownloading = false;
						Cookies.remove("efw_Downloaded", { path: "/" });
						continueAfterDownloaded();
					} else {
						waitUntilDownloaded();
					}
				}, 1000);
			}
			waitUntilDownloaded();
			return;
		} else {
			continueAfterDownloaded();
		}
	} catch (e) {
		if (e.errorTitle){
			throw e;
		}else{
			this._showActions(eventId, { "error": { "clientMessageId": "ResultActionsErrorException", "params": { "eventId": eventId } } });
			throw { errorTitle: "Result actions error", errorData: e };
		}
	}
};
/**
 * The internal function to show log to console.
 * @param msg
 * @param data
 */
EfwClient.prototype._consoleLog = function(msg, data, showThreadLogs) {
	if (window.console) {
		var date = new Date();
		var format = 'YYYY-MM-DD hh:mm:ss.SSS';
		format = format.replace(/YYYY/g, date.getFullYear());
		format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
		format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
		format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
		format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
		format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
		if (format.match(/S/g)) {
			var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
			var length = format.match(/S/g).length;
			for (var i = 0; i < length; i++)
				format = format.replace(/S/, milliSeconds.substring(i, i + 1));
		}
		if (showThreadLogs) {
			var threadLogs = data.threadLogs;
			delete data.threadLogs;
			if (threadLogs != null) {
				if (threadLogs.length == 100) {
					console.log("...");
				}
				for (var i = 0; i < threadLogs.length; i++) {
					console.log(threadLogs[i]);
				}
			}
			console.log(format + " " + msg + " = " + JSON.stringify(data));
		} else {
			console.log(format + " " + msg + " = " + JSON.stringify(data));
		}
	}
};