/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_mkdir = {};
elfinder_mkdir.name = "elfinder_mkdir";
elfinder_mkdir.paramsFormat = {};//
elfinder_mkdir.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var target=params["target"];//初回以降はcwdのhashになる。
	var cwdFolder=target.substring(volumeId.length).base64Decode();
	var name=params["name"];
	var dirs=params["dirs"];
	
	function mkdr(name){
		file.makeDir(cwdFolder+"/"+name);
		return new Record([file.get(cwdFolder+"/"+name,true)])
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
		}).getArray();
	}
	
	if (name!=null){
		return {"added":mkdr(name)};
	}else{
		var ret=[];
		for(var i=0;i<dirs.length;i++){
			name=dirs[i];
			ret.concat(mkdr(name));
		}
		return {"added":ret};
	}
};
