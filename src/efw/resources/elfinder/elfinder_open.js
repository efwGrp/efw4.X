/**** efw4.X Copyright 2019 efwGrp ****/
var elfinder_open = {};
elfinder_open.name = "elfinder_open";
elfinder_open.paramsFormat = {};//
elfinder_open.fire = function(params) {
	var volumeId="EFW_";
	var home=params["home"];//ホームフォルダ、ストレージフォルダからの相対位置
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var id=params["id"];//elfinderのid
	var init=params["init"];//初回表示かどうか、1,0
	var target=params["target"];//初回以降はcwdのhashになる。
	var saveupload=params["saveupload"];//アップロード後の再表示のため。1,0

	if (Packages.efw.taglib.ElFinder.isProtected(id)){
		if (session.get("EFW_ELFINDER_HOME_"+id)==null||session.get("EFW_ELFINDER_READONLY_"+id)==null){
			throw new Packages.efw.ElFinderIdIsNotExistException(id);//セッションタイムアウトのため、エラーさせる。
		}
		home=session.get("EFW_ELFINDER_HOME_"+id);
		if (session.get("EFW_ELFINDER_READONLY_"+id)=="true"){
			readonly=true;
		}else{
			readonly=false;
		}
	}
	//---------------------------------------------------------------------
	var options={
         "uploadMaxConn":-1,		//アップロードファイルは分割しない
	};

	//---------------------------------------------------------------------
	var cwdFolder="";
	var folderinfo;
	if (init==1){//初期表示
		cwdFolder=home;
	}else{
		cwdFolder=target.substring(volumeId.length).base64Decode();
	}
	//---------------------------------------------------------------------
	if (saveupload==1){
		file.saveUploadFiles(cwdFolder);
	};
	//---------------------------------------------------------------------
	folderinfo=file.get(cwdFolder,true);
	var cwd={
		"mime":"directory",	
		"volumeid":volumeId,
		"dirs":1,
		"read":1,
		"ts":folderinfo.lastModified.getTime(),
		"size":folderinfo.length,
		"hash":volumeId+cwdFolder.base64EncodeURI(),
	};
	
	if (cwdFolder==home){
		cwd.name="home";
	}else{
		cwd.name=folderinfo.name;
		cwd.phash=volumeId+cwdFolder.substring(0, cwdFolder.length-folderinfo.name.length-1).base64EncodeURI();
	}
	if (readonly){
		cwd.write=0;
		cwd.locked=1;
	}else{
		cwd.write=1;
		cwd.locked=0;
	}
	//---------------------------------------------------------------------
	var files=new Record(file.list(cwdFolder,true))
	.map({
         "mime":"mineType",//function(){return "directory";},
         "ts":function(data){return data.lastModified.getTime();},
         "size":"length",
         "hash":function(data){return volumeId+(cwdFolder+"/"+data.name).base64EncodeURI();},
         "name":"name",
         "phash":function(){return cwd.hash;},
         "dirs":function(data){if(data.mineType=="directory"&&!data.isBlank){return 1;}else{return 0;}},
         "read":function(){return 1;},
         "write":function(){if (readonly){return 0;}else{return 1;}},
         "locked":function(){if (readonly){return 1;}else{return 0;}},
	})
	.getArray();
	files.unshift(cwd);
	var ret={};
	if (init){
		ret.cwd=cwd;
		ret.options=options;
		ret.api=2.1;//If it is init ,api must be returned or you can not return it.
		ret.files=files;
	}else{
		ret.cwd=cwd;
		ret.options=options;
		ret.files=files;
	};
	return ret;
};


