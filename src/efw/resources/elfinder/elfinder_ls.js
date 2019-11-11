/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_ls = {};
elfinder_ls.name = "elfinder_ls";
elfinder_ls.paramsFormat = {};//
elfinder_ls.fire = function(params) {
	var volumeId="EFW_";
	var target=params["target"];
	var intersect=params["intersect"];
	var cwdFolder=target.substring(volumeId.length).base64Decode();
	var files=file.list(cwdFolder,true);
	var list=[];
	for(var i=0;i<intersect.length;i++){
		if ((new Record(files)).seek("name", "eq", intersect[i]).length>0){
			list.push(intersect[i]);
		}
	}
	return {"list":list};
};
