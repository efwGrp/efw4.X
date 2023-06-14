"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to operate file in storage.
 * 
 * @author Chang Kejun
 */
function EfwServerFile(isAbsolutePath) {
	this.isAbsolutePath=isAbsolutePath;
};

/**
 * The function to judge whether a path exists or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.exists=function(path){
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	if (fl.exists()) {
		return true;
	}else{
		return false;
	}
};
/**
 * The function to judge whether a path is File or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.isFile=function(path){
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	if (fl.isFile()) {
		return true;
	}else{
		return false;
	}
};
/**
 * The function to judge whether a path is Folder or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.isFolder=function(path){
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	if (fl.isDirectory()) {
		return true;
	}else{
		return false;
	}
};

/**
 * The function to get all folders and files infomation in the relative folder path to the
 * storage folder.
 * 
 * @param {String}
 *            path: required<br>
 * @param {Boolean}
 *            withoutFolderLength: optional<br>
 * @returns {Array}
 * {name:String,<br>
 * 		length:Number,<br>
 * 		lastModified:Date,<br>
 * 		absolutePath:String,<br>
 * 		mineType:String,<br>
 * 		isBlank:Boolean,<br>
 * }<br>
 */
EfwServerFile.prototype.list = function(path,withoutFolderLength) {
	var lst = this.isAbsolutePath
			?Packages.efw.file.FileManager.getListByAbsolutePath(path)
			:Packages.efw.file.FileManager.getList(path);
	var ret = [];
	for (var i = 0; i < lst.length; i++) {
		var fl = lst[i];
		var lastModified = new Date();
		lastModified.setTime(fl.lastModified());
		var data = {
			"name" : "" + fl.getName(),
			"lastModified" : lastModified,
			"absolutePath" : "" + fl.getAbsolutePath(),
			"isHidden" : true && fl.isHidden(),
			"mineType" : "" + Packages.efw.file.FileManager.getMimeType(fl.getAbsolutePath()),
		};
		if (data.mineType=="directory"){
			if (withoutFolderLength==true){
				data["length"]= 0;
			}else{
				data["length"]= 0 + Packages.efw.file.FileManager.getFolderSize(fl);
			}
			if (fl.listFiles().length==0){
				data["isBlank"]=true;
			}else{
				data["isBlank"]=false;
			}
		}else{
			data["length"]= 0 + fl.length();
			if (data["length"]==0){
				data["isBlank"]=true;
			}else{
				data["isBlank"]=false;
			}
		}
		ret.push(data);
	}
	return ret;
};
/**
 * The function to get the information of the relative path to the
 * storage folder.
 * 
 * @param {String}
 *            path: required<br>
 * @param {Boolean}
 *            withoutFolderLength: optional<br>
 * @returns {null | Object}
 * {name:String,<br>
 * 		length:Number,<br>
 * 		lastModified:Date,<br>
 * 		absolutePath:String,<br>
 * 		mineType:String,<br>
 * 		isBlank:Boolean,<br>
 * }<br>
 */
EfwServerFile.prototype.get = function(path,withoutFolderLength) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	var lastModified = new Date();
	lastModified.setTime(fl.lastModified());
	var data = {
		"name" : "" + fl.getName(),
		"lastModified" : lastModified,
		"absolutePath" : "" + fl.getAbsolutePath(),
		"mineType" : "" + Packages.efw.file.FileManager.getMimeType(fl.getAbsolutePath()),
	};
	if (data.mineType=="directory"){
		if (withoutFolderLength==true){
			data["length"]= 0;
		}else{
			data["length"]= 0 + Packages.efw.file.FileManager.getFolderSize(fl);
		}
		if (fl.listFiles().length==0){
			data["isBlank"]=true;
		}else{
			data["isBlank"]=false;
		}
	}else{
		data["length"]= 0 + fl.length();
		if (data["length"]==0){
			data["isBlank"]=true;
		}else{
			data["isBlank"]=false;
		}
	}
	return data;
};
/**
 * The function to remove a file or a folder by the relative path to the storage
 * folder.
 * 
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.remove = function(path) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.remove(fl);
};
/**
 * The function to get the absolute path of the storage folder.
 * 
 * @returns {String}
 */
EfwServerFile.prototype.getStorageFolder = function() {
	return "" + Packages.efw.framework.getStorageFolder();
};
/**
 * The function to save a single upload file to the relative path to the storage folder.
 * 
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.saveSingleUploadFile = function(path) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.saveSingleUploadFile(fl);
};
/**
 * The function to save upload files in the relative path to the storage folder.
 * 
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.saveUploadFiles = function(path) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.saveUploadFiles(fl);
};
/**
 * The function to make dirs by the relative path to the storage folder.
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.makeDir = function(path) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.makeDir(fl);
};
/**
 * The function to read all from a text file with auto charset checking.
 * @param {String}
 *            path: required<br>
 * @param {String}
 *            encoding: optional<br>
 * @returns {String}
 */
EfwServerFile.prototype.readAllLines = function(path, encoding){
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	if (encoding==null||encoding=="")encoding="UTF-8";
	return ""+Packages.efw.file.FileManager.readAllLines(fl,encoding);
};
/**
 * The function to rename a file by relative paths to the storage folder.
 * @param {String}
 *            orgPath: required<br>
 * @param {String}
 *            newName: required<br>
 * @returns {String}
 */
EfwServerFile.prototype.rename = function(orgPath,newName){
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(orgPath)
			:Packages.efw.file.FileManager.get(orgPath);
	Packages.efw.file.FileManager.rename(fl,newName);
};
/**
 * The function to move a file by relative paths to the storage folder.
 * @param {String}
 *            orgPath: required<br>
 * @param {String}
 *            newPath: required<br>
 * @returns {String}
 */
EfwServerFile.prototype.move = function(orgPath,newPath){
	var orgfile = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(orgPath)
			:Packages.efw.file.FileManager.get(orgPath);
	var newfile = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(newPath)
			:Packages.efw.file.FileManager.get(newPath);
	Packages.efw.file.FileManager.move(orgfile,newfile);
};
/**
 * The function to make an empty file by the relative path to the storage folder.
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.makeFile = function(path) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	Packages.efw.file.FileManager.makeFile(fl);
};
/**
 * The function to write a text file by the relative path to the storage folder.
 * @param {String}
 *            path: required<br>
 * @param {String}
 *            content: required<br>
 * @param {String}
 *            encoding: optional<br>
 */
EfwServerFile.prototype.writeAllLines=function(path,content,encoding) {
	var fl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(path)
			:Packages.efw.file.FileManager.get(path);
	if(encoding==null)encoding="UTF-8";
	Packages.efw.file.FileManager.writeAllLines(fl,content,encoding);
};
/**
 * The function to duplicate a file by  relative paths to the storage folder.
 * @param {String}
 *            srcPath: required<br>
 * @param {String}
 *            destPath: required<br>
 */
EfwServerFile.prototype.duplicate=function(srcPath,destPath) {
	var srcfl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(srcPath)
			:Packages.efw.file.FileManager.get(srcPath);
	var destfl = this.isAbsolutePath
			?Packages.efw.file.FileManager.getByAbsolutePath(destPath)
			:Packages.efw.file.FileManager.get(destPath);
	Packages.efw.file.FileManager.duplicate(srcfl,destfl);
};
/**
 * The function to get a tempfile name in a folder.
 * @returns {String}
 *            the tempfile name
 */
EfwServerFile.prototype.getTempFileName=function() {
	return ""+Packages.efw.file.FileManager.getTempFileName();
};

///////////////////////////////////////////////////////////////////////////////

/**
 * The function to encode the string by base64.
 * @returns {String}
 */
String.prototype.base64Encode=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlEncoder().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
/**
 * The function to encode the string by base64 for URI.
 * @returns {String}
 */
String.prototype.base64EncodeURI=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlEncoder().withoutPadding().encode(
			new java.lang.String(this).getBytes()
		)
	);
};
/**
 * The function to decode a encoded String by base64.
 * @returns {String}
 */
String.prototype.base64Decode=function(){
	return ""+new java.lang.String(
		java.util.Base64.getUrlDecoder().decode(
			new java.lang.String(this).getBytes()
		)
	);
};
