/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_download = {};
elfinder_download.name = "elfinder_download";
elfinder_download.paramsFormat = {"cmd":null,"targets":null};//
elfinder_download.fire = function(params) {
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
		ret.attach(cwdFile,zipBasePath);
	}
	return ret;
};
