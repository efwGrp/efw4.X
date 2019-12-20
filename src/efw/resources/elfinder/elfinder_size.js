/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_size = {};
elfinder_size.name = "elfinder_size";
elfinder_size.paramsFormat = {};//
elfinder_size.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var targets=params["targets"];
	var size=0;
	for(var i=0;i<targets.length;i++){
		var target=targets[i];
		var cwdFolder=target.substring(volumeId.length).base64Decode();
		var info=file.get(cwdFolder);//ここだけサイズを取る
		size+=info.length;
	}
	return {"size":size};
};
