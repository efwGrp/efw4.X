"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_download = {};
elfinder_download.name = "elfinder_download";
elfinder_download.paramsFormat = {
	"cmd":null,
	"home":null,
	"isAbs":null,
	"readonly":null,
	"id":null,
	"targets":null
};//
elfinder_download.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var targets=params["targets"];
	var ret=new Result();
	for (var i=0;i<targets.length;i++){
		var target=targets[i];
		var cwdFile=target.substring(volumeId.length).base64Decode();
		var zipBasePath="";
		if (cwdFile.indexOf("/")>-1){
			zipBasePath=cwdFile.substring(0,cwdFile.lastIndexOf("/"));
		}
		if (params["isAbs"]){
			//絶対パス設定された場合
			ret.attach(cwdFile,zipBasePath,true);
		}else{
			ret.attach(cwdFile,zipBasePath);
		}
	}
	return ret;
};
