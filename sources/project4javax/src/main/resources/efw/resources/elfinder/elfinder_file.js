"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
var elfinder_file = {};
elfinder_file.name = "elfinder_file";
//This event is called from Efw function, so the paramsFormat must be defined.
elfinder_file.paramsFormat = {
	"cmd":null,
	"home":null,
	"isAbs":null,
	"readonly":null,
	"id":null,
	"target":null
};//
elfinder_file.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var target=params["target"];
	var cwdFile=target.substring(volumeId.length).base64Decode();
	if (params["isAbs"]){
		//絶対パス設定された場合
		return (new Result()).attach(cwdFile,null,true);
	}else{
		return (new Result()).attach(cwdFile);
	}
};
