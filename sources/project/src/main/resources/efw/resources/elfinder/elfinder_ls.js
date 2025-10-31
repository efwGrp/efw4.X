"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
var elfinder_ls = {};
elfinder_ls.name = "elfinder_ls";
elfinder_ls.paramsFormat = {};//
elfinder_ls.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var file=params.file;
	var volumeId="EFW_";
	var target=params["target"];
	var intersect=params["intersect"];
	var cwdFolder=target.substring(volumeId.length).base64Decode();
	var files=new Record(file.list(cwdFolder,true)).seek("isHidden","eq",false);
	var list=[];
	for(var i=0;i<intersect.length;i++){
		if (files.seek("name", "eq", intersect[i]).length>0){
			list.push(intersect[i]);
		}
	}
	return {"list":list};
};
