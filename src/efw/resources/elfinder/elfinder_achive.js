"use strict";
/**** efw4.X Copyright 2024 efwGrp ****/
var elfinder_archive = {};
elfinder_archive.name = "elfinder_archive";
elfinder_archive.paramsFormat = {};//
elfinder_archive.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var file=params.file;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var targets=params["targets"];
	var zipName=params["name"];
	var parentPath=params["target"].substring(volumeId.length).base64Decode();
	var newFile=parentPath+"/"+zipName;
	var isAbs=params["isAbs"];
	//圧縮対象の配列を作成する
	var files=[];
	for (var i=0;i<targets.length;i++){
		var target=targets[i];
		var cwdFile=target.substring(volumeId.length).base64Decode();
		files.push(cwdFile);
	}
	//圧縮する
	Packages.efw.file.FileManager.zip(newFile,isAbs, files, parentPath,isAbs, null);
	//圧縮ファイル情報を取得する
	var target=(new Record([file.get(newFile,true)]))
	.map({
         "mime":"mineType",//function(){return "directory";},
         "ts":function(data){return parseInt(data.lastModified.getTime()/1000);},
         "size":"length",
         "hash":function(){return volumeId+(newFile).base64EncodeURI();},
         "name":"name",
         "phash":function(){return volumeId+(parentPath).base64EncodeURI();},
         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
         "read":function(){return 1;},
         "write":function(){if (readonly){return 0;}else{return 1;}},
         "locked":function(){if (readonly){return 1;}else{return 0;}},
	}).getSingle();
	//圧縮ファイル情報を戻す
	return {"added":[target]};
};
