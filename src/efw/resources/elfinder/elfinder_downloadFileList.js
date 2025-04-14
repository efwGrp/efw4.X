"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
var elfinder_downloadFileList = {};
elfinder_downloadFileList.name = "elfinder_downloadFileList";
elfinder_downloadFileList.paramsFormat = {
	"cmd":null,
	"home":null,
	"isAbs":null,
	"readonly":null,
	"id":null,
	"target":null
};//
elfinder_downloadFileList.fire = function(params) {
	params.debug("params");
	var risk=elfinder_checkRisk(params);if(risk)return risk;
	var file=params.file;
	var volumeId="EFW_";
	var target=params["target"];
	var cwdFile=target.substring(volumeId.length).base64Decode();
	
	function loopFilder(root){
		var ret="";
		var ary=file.list(root);
		for(var i=0;i<ary.length;i++){
			var item=ary[i];
			if (file.isFolder(root+"/"+item.name)){
				ret+=loopFilder(root+"/"+item.name);
			}else{
				var lastModified=item.lastModified==null?"":item.lastModified.format("yyyy/MM/dd HH:mm:ss");
				ret+=item.name+"\t"+item.length+"\t"+lastModified+"\t"+root+"\r\n";
			}
		}
		return ret;
	}
	var txt="name\tlength\tlastModified\tabsolutePath\r\n";
	txt+=loopFilder(cwdFile);
	
	var filename=absfile.getTempFileName();
	absfile.writeAllLines(absfile.getStorageFolder()+"/"+filename,txt);
	
	return new Result()
	.attach(filename)
	.saveas("list.txt")
	.deleteAfterDownload();
};
