"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
var elfinder_preview = {};
elfinder_preview.name = "elfinder_preview";
elfinder_preview.paramsFormat = {
	"cmd":null,
	"home":null,
	"isAbs":null,
	"readonly":null,
	"id":null,
	"target":null
};//
elfinder_preview.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var target=params["target"];
	var ret=new Result();
	var cwdFile=target.substring(volumeId.length).base64Decode();
	if (params["isAbs"]){
		//絶対パス設定された場合
		ret.preview(cwdFile,true);
	}else{
		ret.preview(cwdFile);
	}
	return ret;
};
