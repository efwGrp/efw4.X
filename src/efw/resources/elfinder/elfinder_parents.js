/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_parents = {};
elfinder_parents.name = "elfinder_parents";
elfinder_parents.paramsFormat = {};//
elfinder_parents.fire = function(params) {
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var volumeId="EFW_";
	var target=params["target"];
	var targetFolder=""+target.substring(volumeId.length).base64Decode();

	var folders=[];
	while(true){
		folders=folders.concat(new Record(file.list(targetFolder,true))
		.seek("mineType","eq","directory")
		.map({
	         "mime":"mineType",//function(){return "directory";},
	         "ts":function(data){return data.lastModified.getTime();},
	         "size":"length",
	         "hash":function(data){return volumeId+(targetFolder+"/"+data.name).base64EncodeURI();},
	         "name":"name",
	         "phash":function(data){return volumeId+(targetFolder).base64EncodeURI();},
	         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
	         "read":function(){return 1;},
	         "write":function(){if (readonly){return 0;}else{return 1;}},
	         "locked":function(){if (readonly){return 1;}else{return 0;}},
		}).getArray());
		
		if (targetFolder.lastIndexOf("/")==-1){
			folders.push(new Record([file.get(targetFolder,true)])
			.map({
		         "mime":"mineType",//function(){return "directory";},
		         "ts":function(data){return data.lastModified.getTime();},
		         "size":"length",
		         "hash":function(data){return volumeId+(targetFolder).base64EncodeURI();},
		         "name":function(){return "home";},
		         "phash":function(data){return "";},
		         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
		         "read":function(){return 1;},
		         "write":function(){if (readonly){return 0;}else{return 1;}},
		         "locked":function(){if (readonly){return 1;}else{return 0;}},
		         
			}).getSingle());
			break;
		}else{
			targetFolder=targetFolder.substring(0,targetFolder.lastIndexOf("/"));
		}
	}
	return {"tree":folders};
};
