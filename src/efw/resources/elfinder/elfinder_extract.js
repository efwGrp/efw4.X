"use strict";
/**** efw4.X Copyright 2024 efwGrp ****/
var elfinder_extract = {};
elfinder_extract.name = "elfinder_archive";
elfinder_extract.paramsFormat = {};//
elfinder_extract.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var file=params.file;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var isAbs=params["isAbs"];
	var makedir=params["makedir"];
	var fromZipPath=params["target"].substring(volumeId.length).base64Decode();
	var parentPath=fromZipPath.substring(0,fromZipPath.lastIndexOf("/"));
	var currentPath=parentPath;
	var zipNameWithoutExt=fromZipPath.substring(fromZipPath.lastIndexOf("/")+1,fromZipPath.lastIndexOf("."));
	//解凍する前のファイル配列情報
	var before=(new Record(file.list(currentPath,true)))
	.map({
		 "mime":"mineType",//function(){return "directory";},
		 "ts":function(data){return parseInt(data.lastModified.getTime()/1000);},
		 "size":"length",
		 "hash":function(data){return volumeId+(currentPath+"/"+data.name).base64EncodeURI();},
		 "name":"name",
		 "phash":function(){return volumeId+(currentPath).base64EncodeURI();},
		 "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
		 "read":function(){return 1;},
		 "write":function(){if (readonly){return 0;}else{return 1;}},
		 "locked":function(){if (readonly){return 1;}else{return 0;}},
	}).getArray();
	//必要の場合解凍先フォルダを作成する
	if (makedir=="1"){
		parentPath=parentPath+"/"+zipNameWithoutExt;
		if (!file.exists(parentPath)){
			file.makeDir(parentPath);
		}
	}
	//解凍する
	Packages.efw.file.FileManager.unZip(fromZipPath,isAbs, parentPath,isAbs);
	//解凍後のファイル配列情報
	var after=(new Record(file.list(currentPath,true)))
	.map({
		 "mime":"mineType",//function(){return "directory";},
		 "ts":function(data){return parseInt(data.lastModified.getTime()/1000);},
		 "size":"length",
		 "hash":function(data){return volumeId+(currentPath+"/"+data.name).base64EncodeURI();},
		 "name":"name",
		 "phash":function(){return volumeId+(currentPath).base64EncodeURI();},
		 "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
		 "read":function(){return 1;},
		 "write":function(){if (readonly){return 0;}else{return 1;}},
		 "locked":function(){if (readonly){return 1;}else{return 0;}},
	}).getArray();
	//差分を取る
	var targets=[];
	for(var i=0;i<after.length;i++){
		var created=true;
		for(var j=0;j<before.length;j++){
			if (after[i].name==before[j].name){
				created=false;
				break;
			}
		}
		if (created){
			targets.push(after[i]);
		}
	}
	//差分情報を戻す
	return {"added":targets};

};
