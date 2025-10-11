"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
//ここだけfunctionにする。
var elfinder_upload = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return "UploadRiskException";
	var volumeId="EFW_";
	var target=params["target"];
	var targetFolder=""+target.substring(volumeId.length).base64Decode();
	file.saveUploadFiles(targetFolder);
	return "";//成功の場合なにも戻さない。
};
