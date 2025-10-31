"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class as event result.
 * 
 * @author Chang Kejun
 */
function Result(withoutI18nTranslation) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("Result");}
	this.actions = {};
	this.values = [];
	this.withoutI18nTranslation=withoutI18nTranslation;
};

/**
 * The array to keep action values.
 */
Result.prototype.actions = null;
/**
 * The array to keep return values.
 */
Result.prototype.values = null;
/**
 * The array to keep threadLogs.
 */
Result.prototype.threadLogs = null;
/**
 * The flag to stop i18n translation
 */
Result.prototype.withoutI18nTranslation = false;
/**
 * The function to add one return value in the result.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector: optional<br>
 * @returns {Result}
 */
Result.prototype.runat = function(selector) {
	var ret = {};
	ret.runat = selector;
	this.values.push(ret);
	return this;
};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.remove = function(selector) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.remove==null) ret.remove = selector;
	}
	return this;
};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask: required<br>
 * @returns {Result}
 */
Result.prototype.append = function(mask) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.append==null) ret.append = mask;
	}
	return this;
};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data: required<br>
 * @returns {Result}
 */
Result.prototype.withdata = function(data) {
	if (this.values.length > 0) {
		var ret = this.values[this.values.length - 1];
		if (ret.withdata==null) ret.withdata = data;
	}
	return this;
};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result} result: required<br>
 * @returns {Result}
 */
Result.prototype.concat = function(result) {
	if(result){
		if(result.values){
			this.values = this.values.concat(result.values);
		}
		if(result.actions){
			if (result.actions.show)this.show(result.actions.show);
			if (result.actions.hide)this.hide(result.actions.hide);
			if (result.actions.disable)this.disable(result.actions.disable);
			if (result.actions.enable)this.enable(result.actions.enable);
			if (result.actions.navigate)this.navigate(result.actions.navigate.url, result.actions.navigate.params);
			if (result.actions.download){
				if (result.actions.download.zip)this.attach(result.actions.download.zip,result.actions.download.zipBasePath);
				if (result.actions.download.file)this.attach(result.actions.download.file,result.actions.download.zipBasePath);
				if (result.actions.download.saveas)this.saveas(result.actions.download.saveas,result.actions.download.password);
				if (result.actions.download.deleteafterdownload)this.deleteAfterDownload();
			}
			if (result.actions.alert)this.alert(result.actions.alert,result.actions.alertTitle);
			if (result.actions.highlight)this.highlight(result.actions.highlight);
			if (result.actions.focus)this.focus(result.actions.focus);
			if (result.actions.error)this.error(result.actions.error.clientMessageId,result.actions.error.params);
			if (result.actions.confirm)this.confirm(result.actions.confirm.message, result.actions.confirm.buttons, result.actions.confirmTitle);
			if (result.actions.eval)this.eval(result.actions.eval);
			if (result.actions.preview)this.preview(result.actions.preview.file,result.actions.preview.isAbs);
			if (result.data)this.provide(result.data);
			if (result.actions.progress)this.progress(result.actions.progress.message,result.actions.progress.percent,result.actions.progress.closeFlag);
		}
	}
	return this;
};


/**
 * The function to show elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.show = function(selector) {
	if (this.actions.show==null){
		this.actions.show=selector;
	}else{
		this.actions.show+=","+selector;
	}
	return this;
};
/**
 * The function to hide elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.hide = function(selector) {
	if (this.actions.hide==null){
		this.actions.hide=selector;
	}else{
		this.actions.hide+=","+selector;
	}
	return this;
};
/**
 * The function to disable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.disable = function(selector) {
	if (this.actions.disable==null){
		this.actions.disable=selector;
	}else{
		this.actions.disable+=","+selector;
	}
	return this;
};
/**
 * The function to enable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.enable = function(selector) {
	if (this.actions.enable==null){
		this.actions.enable=selector;
	}else{
		this.actions.enable+=","+selector;
	}
	return this;
};
/**
 * The function to navigate to another page in client.
 * 
 * @param {String}
 *            url: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.navigate = function(url,params) {
	if(!this.actions.navigate){
		this.actions.navigate={};
		this.actions.navigate.url=url;
		this.actions.navigate.params=params;
	}
	return this;
};
/**
 * The function to set download file or folder path.
 * 
 * @param {String |
 *            Array} path: required<br>
 * @param {String} zipBasePath: optional<br>
 * @param {boolean} isAbs: optional<br>
 * @returns {Result}
 */
Result.prototype.attach = function(path,zipBasePath,isAbs) {
	if (!this.actions.download)this.actions.download={};
	if (zipBasePath!=null){
		this.actions.download.zipBasePath=zipBasePath;
	}
	if (isAbs){
		this.actions.download.isAbs=isAbs;
	}
	if (this.actions.download.zip != null) {
		if (path instanceof Array) {
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.zip.push(path);
		}
	} else if (this.actions.download.file != null) {
		this.actions.download.zip = [];
		this.actions.download.zip.push(this.actions.download.file);
		if (path instanceof Array) {
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.zip.push(path);
		}
		delete this.actions.download.file;
	} else {
		if (path instanceof Array) {
			this.actions.download.zip = [];
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else if (isAbs?absfile.isFolder(path):file.isFolder(path)) {
			this.actions.download.zip = [];
			this.actions.download.zip = this.actions.download.zip.concat(path);
		} else {
			this.actions.download.file = path;
		}
	}
	return this;
};
/**
 * The function to set the file name for saving .
 * 
 * @param {String} filename: required<br>
 * @param {String} password: optional<br>
 * @returns {Result}
 */
Result.prototype.saveas = function(filename,password) {
	if (!this.actions.download)this.actions.download={};
	this.actions.download.saveas=filename;
	this.actions.download.password=password;
	return this;
};

/**
 * The function to set a flag to delete original files after download.
 * 
 * @returns {Result}
 */
Result.prototype.deleteAfterDownload = function() {
	if (this.actions.download)	this.actions.download.deleteafterdownload = true;
	return this;
};
/**
 * The function to show alert in client.
 * 
 * @param {String |
 *            Array} message: required<br>
 * @param {String} title: optional<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.alert = function(message, title, params) {
	if (!this.actions.alert)
		this.actions.alert = [];
	
	if (typeof(title)=="object"){
		params=title;
		title=null;
	}
	
	if (!this.actions.alertTitle)
		this.actions.alertTitle = title;
	
	if (message instanceof Array) {
		this.actions.alert = this.actions.alert.concat(message);
	} else {
		for(var key in params){
			message=message.replace(new RegExp("{"+key+"}", "g"), params[key]);
		}
		this.actions.alert.push(message);
	}
	return this;
};
/**
 * The function to highlight error elements.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.highlight = function(selector) {
	if (this.actions.highlight==null){
		this.actions.highlight=selector;
	}else{
		this.actions.highlight+=","+selector;
	}
	return this;
};
/**
 * The function to set focus to an element.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.focus = function(selector) {
	if (!this.actions.focus)this.actions.focus=selector;
	return this;
};
/**
 * The function to error.
 * 
 * @param {String}
 *            clientMessageId: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.error = function(clientMessageId,params) {
	if (!this.actions.error)
		this.actions.error = {"clientMessageId":clientMessageId,"params":params};
	return this;
};
/**
 * The function to confirm.
 * 
 * @param {String}
 *            message: required<br>
 * @param {Object}
 *            buttons: required<br>
 * @param {String} 
 *            title: optional<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.confirm = function(message, buttons, title, params) {
	if (typeof(title)=="object"){
		params=title;
		title=null;
	}
	if (!this.actions.confirm) {
		for ( var key in params) {
			message = message.replace(new RegExp("{" + key + "}", "g"),
					params[key]);
		}
		this.actions.confirm = {
			"message" : message,
			"buttons" : buttons
		};
	}
	if (!this.actions.confirmTitle)
		this.actions.confirmTitle = title;
	
	return this;
};
/**
 * The function to execute script.
 * @param {String} script: required<br>
 * @returns {Result}
 */
Result.prototype.eval = function(script){
	if (!this.actions.eval) this.actions.eval=[];
	if (script instanceof Array) {
		this.actions.eval = this.actions.eval.concat(script);
	}else{
		this.actions.eval.push(script);
	}
	return this;
};
/**
 * The function to show the debug info about the Result.
 * @param {String} label: optional<br>
 * @returns {Result}
 */
Result.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Result class.");
	java.lang.System.out.println("result values:"+JSON.stringify(this.values));
	java.lang.System.out.println("result actions:"+JSON.stringify(this.actions));
	return this;
};
/**
 * The function to set preview a file.
 * 
 * @param {String |
 *            Array} filePath: required<br>
 * @param {boolean} isAbs: optional<br>
 * @returns {Result}
 */
Result.prototype.preview = function(filePath,isAbs) {
	if (!this.actions.preview)this.actions.preview={};
	this.actions.preview.file = filePath;
	this.actions.preview.isAbs=isAbs;
	return this;
};
/**
 * The function to set data as return value for client Efw function.
 * 
 * @param {Object} data: required<br>
 * @returns {Result}
 */
Result.prototype.provide = function(data) {
	this.data=data;
	return this;
};
/**
 * The function to set progress a background event.
 * 
 * @param {String} message: required<br>
 * @param {Number} percent: required<br>
 * @param {Boolean} closeFlag: optional<br>
 * @returns {Result}
 */
Result.prototype.progress = function(message,percent,closeFlag) {
	if (!this.actions.progress)this.actions.progress={};
	this.actions.progress.message = message;
	this.actions.progress.percent=percent;
	this.actions.progress.closeFlag=closeFlag;
	return this;
};

