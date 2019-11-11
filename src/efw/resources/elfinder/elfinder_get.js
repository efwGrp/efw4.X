/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_get = {};
elfinder_get.name = "elfinder_get";
elfinder_get.paramsFormat = {};//
elfinder_get.fire = function(params) {
	var volumeId="EFW_";
	var target=params["target"];
	var cwdFile=target.substring(volumeId.length).base64Decode();
	var content=file.readAllLines(cwdFile);
	return {"content":content};
};
