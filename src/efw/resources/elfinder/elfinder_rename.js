/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_rename = {};
elfinder_rename.name = "elfinder_rename";
elfinder_rename.paramsFormat = {};//
elfinder_rename.fire = function(params) {
	var volumeId="EFW_";
	var target=params["target"];
	var name=params["name"];
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var cwdFile=target.substring(volumeId.length).base64Decode();
	var cwdParentFolder=cwdFile.substring(0,cwdFile.lastIndexOf("/"));
	var newFilePath=cwdParentFolder+"/"+name;
	file.rename(cwdFile, name);

	var files=new Record([file.get(newFilePath,true)])
	.map({
         "mime":"mineType",//function(){return "directory";},
         "ts":function(data){return data.lastModified.getTime();},
         "size":"length",
         "hash":function(data){return volumeId+(newFilePath).base64EncodeURI();},
         "name":"name",
         "phash":function(){return volumeId+(cwdParentFolder).base64EncodeURI();},
         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
         "read":function(){return 1;},
         "write":function(){if (readonly){return 0;}else{return 1;}},
         "locked":function(){if (readonly){return 1;}else{return 0;}},
	})
	.getArray();
	return {"added":files,"removed":[target]};
};
