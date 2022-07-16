/**** efw4.X Copyright 2019 efwGrp ****/
load("classpath:efw/resources/elfinder/elfinder_cmds.js");
load("classpath:efw/resources/elfinder/elfinder_download.js");
load("classpath:efw/resources/elfinder/elfinder_duplicate.js");
load("classpath:efw/resources/elfinder/elfinder_file.js");
load("classpath:efw/resources/elfinder/elfinder_ls.js");
load("classpath:efw/resources/elfinder/elfinder_mkdir.js");
load("classpath:efw/resources/elfinder/elfinder_mkfile.js");
load("classpath:efw/resources/elfinder/elfinder_open.js");
load("classpath:efw/resources/elfinder/elfinder_parents.js");
load("classpath:efw/resources/elfinder/elfinder_paste.js");
load("classpath:efw/resources/elfinder/elfinder_put.js");
load("classpath:efw/resources/elfinder/elfinder_rename.js");
load("classpath:efw/resources/elfinder/elfinder_rm.js");
load("classpath:efw/resources/elfinder/elfinder_size.js");
load("classpath:efw/resources/elfinder/elfinder_tree.js");

function elfinder_checkRisk(params){
	var volumeId="EFW_";
	var id=params["id"];//elfinderのid
	var home=params["home"];//ホームフォルダ、ストレージフォルダからの相対位置
	var isAbs=params["isAbs"];//絶対パスかどうか
	var readonly=params["readonly"];//参照のみかどうか,true,false
	var target=params["target"];
	var targets=params["targets"];

	var reg=session.get("EFW_ELFINDER_PROTECTED_"+id);
	if (reg==null){//指定idは、初期化されたかどうか
		return (new Result()).alert("{ElFinderSessionTimeoutMessage}");
	}else if (reg=="true"){
		var sessionHome=session.get("EFW_ELFINDER_HOME_"+id)+"";
		var sessionIsAbs=session.get("EFW_ELFINDER_ISABS_"+id)+"";
		if (sessionIsAbs=="true")sessionIsAbs=true;
		if (sessionIsAbs=="false")sessionIsAbs=false;
		var sessionReadonly=session.get("EFW_ELFINDER_READONLY_"+id)+"";
		if (sessionReadonly=="true")sessionReadonly=true;
		if (sessionReadonly=="false")sessionReadonly=false;
		if(home!=sessionHome||isAbs!=sessionIsAbs||readonly!=sessionReadonly){
			return (new Result()).alert("{ElFinderIsProtectedMessage}");
		}
	}
	//相対パスが設定される場合、あるいは相対パス空白で絶対パス未設定の場合（storage直下）
	if (!isAbs){
		params["file"]=file;
	}else{
		params["file"]=absfile;
	}
	if (home.indexOf("..")>-1){
		return (new Result()).alert("{ElFinderHackingRiskMessage}");
	}else if(!params["file"].exists(home)){
		return (new Result()).alert("{ElFinderHomeNotExistsMessage}");
	}
	if (target!=null){
		var cwdFile=target.substring(volumeId.length).base64Decode();
		if (cwdFile!=""){
			if (cwdFile.indexOf(home)!=0||cwdFile.indexOf("..")>-1){
				return (new Result()).alert("{ElFinderHackingRiskMessage}");
			}
		}
	}
	if (targets!=null){
		for(var i=0;i<targets.length;i++){
			var target=targets[i];
			var cwdFile=target.substring(volumeId.length).base64Decode();
			if (cwdFile!=""){
				if (cwdFile.indexOf(home)!=0||cwdFile.indexOf("..")>-1){
					return (new Result()).alert("{ElFinderHackingRiskMessage}");
				}
			}
		}
	}
	return null;
}