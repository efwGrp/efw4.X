/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_mkfile = {};
elfinder_mkfile.name = "elfinder_mkfile";
elfinder_mkfile.paramsFormat = {};//
elfinder_mkfile.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var file=params.file;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var target=params["target"];//初回以降はcwdのhashになる。
	var cwdFolder=target.substring(volumeId.length).base64Decode();
	var name=params["name"];
	file.makeFile(cwdFolder+"/"+name);
	var files=new Record([file.get(cwdFolder+"/"+name,true)])
	.map({
         "mime":"mineType",//function(){return "directory";},
         "ts":function(data){return parseInt(data.lastModified.getTime()/1000);},
         "size":"length",
         "hash":function(data){return volumeId+(cwdFolder+"/"+data.name).base64EncodeURI();},
         "name":"name",
         "phash":function(){return target;},
         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
         "read":function(){return 1;},
         "write":function(){if (readonly){return 0;}else{return 1;}},
         "locked":function(){if (readonly){return 1;}else{return 0;}},
	})
	.getArray();

	return {"added":files};
};
