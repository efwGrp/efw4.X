/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_duplicate = {};
elfinder_duplicate.name = "elfinder_duplicate";
elfinder_duplicate.paramsFormat = {};//
elfinder_duplicate.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var targets=params["targets"];
	var files=[];
	for (var i=0;i<targets.length;i++){
		var target=targets[i];
		var cwdFile=target.substring(volumeId.length).base64Decode();
		var parentPath=cwdFile.substring(0,cwdFile.lastIndexOf("/"));
		var lastIndex=cwdFile.lastIndexOf(".");
		var pre="",ext="";
		if (lastIndex==-1){
			pre=cwdFile;
		}else if (lastIndex<parentPath.length){//フォルダ名に.がある場合
			pre=cwdFile;
		}else{
			pre=cwdFile.substring(0,lastIndex);
			ext="."+cwdFile.substring(lastIndex);
		}
		
		var newFile="";
		if (file.exists(pre+"_copy"+ext)){
			var j=1;
			while(file.exists(pre+"_copy"+j+ext)){j++;}
			newFile=pre+"_copy"+j+ext;
		}else{
			newFile=pre+"_copy"+ext;
		}
		
		file.duplicate(cwdFile,newFile);

		files.push((new Record([file.get(newFile,true)]))
		.map({
	         "mime":"mineType",//function(){return "directory";},
	         "ts":function(data){return data.lastModified.getTime();},
	         "size":"length",
	         "hash":function(data){return volumeId+(newFile).base64EncodeURI();},
	         "name":"name",
	         "phash":function(){return volumeId+(parentPath).base64EncodeURI();},
	         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
	         "read":function(){return 1;},
	         "write":function(){if (readonly){return 0;}else{return 1;}},
	         "locked":function(){if (readonly){return 1;}else{return 0;}},
		}).getSingle());
	}
	return {"added":files};
};
