/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_file = {};
elfinder_file.name = "elfinder_file";
//This event is called from Efw function, so the paramsFormat must be defined.
elfinder_file.paramsFormat = {
	"cmd":null,
	"home":null,
	"readonly":null,
	"id":null,
	"target":null
};//
elfinder_file.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var target=params["target"];
	var cwdFile=target.substring(volumeId.length).base64Decode();
	return (new Result())
	.attach(cwdFile);
};
