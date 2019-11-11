/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_put = {};
elfinder_put.name = "elfinder_put";
elfinder_put.paramsFormat = {};//
elfinder_put.fire = function(params) {
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var target=params["target"];
	var encoding=params["encoding"];
	var content=params["content"];
	var cwdFile=target.substring(volumeId.length).base64Decode();
	file.writeAllLines(cwdFile, content, encoding);

	var cwdParentFolder=cwdFile.substring(0,cwdFile.lastIndexOf("/"));
	var files=new Record([file.get(cwdFile,true)])
	.map({
         "mime":"mineType",//function(){return "directory";},
         "ts":function(data){return data.lastModified.getTime();},
         "size":"length",
         "hash":function(data){return volumeId+(cwdFile).base64EncodeURI();},
         "name":"name",
         "phash":function(){return volumeId+(cwdParentFolder).base64EncodeURI();},
         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
         "read":function(){return 1;},
         "write":function(){if (readonly){return 0;}else{return 1;}},
         "locked":function(){if (readonly){return 1;}else{return 0;}},
	})
	.getArray();
	return {"changed":files};
};
