"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_cmds = {};
elfinder_cmds.name = "elfinderの各イベント";
elfinder_cmds.paramsFormat = {};//
elfinder_cmds.fire = function(params) {
	try{
		var cmd=params["cmd"];
			 if(cmd=="open"){return event.fire("elfinder_open", params);}//open directory and initializes data when no directory is defined (first iteration)
		else if(cmd=="parents"){return event.fire("elfinder_parents", params);}//return parent directories and its subdirectory childs
		else if(cmd=="tree"){return event.fire("elfinder_tree", params);}//return child directories
		else if(cmd=="mkdir"){return event.fire("elfinder_mkdir", params);}//create directory
		else if(cmd=="rm"){return event.fire("elfinder_rm", params);}//delete files/directories
		else if(cmd=="size"){return event.fire("elfinder_size", params);}//return size for selected files or total folder(s) size
		else if(cmd=="rename"){return event.fire("elfinder_rename", params);}//rename file
		else if(cmd=="mkfile"){return event.fire("elfinder_mkfile", params);}//create text file
		else if(cmd=="put"){return event.fire("elfinder_put", params);}//save text file content
		else if(cmd=="ls"){return event.fire("elfinder_ls", params);}//list files in directory
		else if(cmd=="duplicate"){return event.fire("elfinder_duplicate", params);}//create copy of file
		else if(cmd=="upload"){return event.fire("elfinder_upload", params);}//upload file
		else if(cmd=="paste"){return event.fire("elfinder_paste", params);}//copy or move files
		else if(cmd=="archive"){return event.fire("elfinder_archive", params);}//zip files
		else if(cmd=="extract"){return event.fire("elfinder_extract", params);}//unzip a file
		//これらのコマンドは直接Efw関数で実行される。 
		//else if(cmd=="file"){return event.fire("elfinder_file", params);}//output file contents to the browser (download/preview)
		//else if(cmd=="download"){return event.fire("elfinder_download", params);}//download multiple items by archive
		return {};
		
	}catch(e){
		if (e instanceof Error)e=""+e;
		var errorMsg=""+Packages.efw.framework.getUsefulInfoFromException(e);
		//event id を明確に表すため、エラーをcatchしている。
		return (new Result()).error("RuntimeErrorException", {"eventId":"elfinder_"+params["cmd"],"message":errorMsg+""});
	}
};
