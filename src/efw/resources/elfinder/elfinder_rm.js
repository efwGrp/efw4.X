/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_rm = {};
elfinder_rm.name = "elfinder_rm";
elfinder_rm.paramsFormat = {};//
elfinder_rm.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var targets=params["targets"];
	for(var i=0;i<targets.length;i++){
		var target=targets[i];
		var cwdFolder=target.substring(volumeId.length).base64Decode();
		file.remove(cwdFolder);
	}
	return {"removed":targets};
};
