/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_paste = {};
elfinder_paste.name = "elfinder_paste";
elfinder_paste.paramsFormat = {};//
elfinder_paste.fire = function(params) {
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var volumeId="EFW_";
	var readonly=params["readonly"];//参照のみかどうか,true,false
	//var src=params["src"];//コピーファイルの場所
	var targets=params["targets"];//コピーファイル（複数可）
	var dst=params["dst"];//貼付け場所
	var cut=params["cut"];//0,1 cut or not
	var hashes=params["hashes"];//重複したキー
	var files=[];
	var dstParentPath=dst.substring(volumeId.length).base64Decode();
	for (var i=0;i<targets.length;i++){
		var target=targets[i];
		var srcFile=target.substring(volumeId.length).base64Decode();
		var fileName=srcFile.substring(srcFile.lastIndexOf("/")+1);
		var dstFile=dstParentPath+"/"+fileName;
		file.duplicate(srcFile,dstFile);
		if (cut==1){
			file.remove(srcFile);
		}
		var newItem=(new Record([file.get(dstFile,true)]))
			.map({
		         "mime":"mineType",//function(){return "directory";},
		         "ts":function(data){return parseInt(data.lastModified.getTime()/1000);},
		         "size":"length",
		         "hash":function(data){return volumeId+(dstFile).base64EncodeURI();},
		         "name":"name",
		         "phash":function(){return volumeId+(dstParentPath).base64EncodeURI();},
		         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
		         "read":function(){return 1;},
		         "write":function(){if (readonly){return 0;}else{return 1;}},
		         "locked":function(){if (readonly){return 1;}else{return 0;}},
			}).getSingle();

		if (hashes!=null){
			if (hashes[target]==null){
				files.push(newItem);
			}
		}else{
			files.push(newItem);
		}
	}
	var ret={"added":files};
	if (cut==1){
		ret["removed"]=targets;
	}
	return ret;
};
