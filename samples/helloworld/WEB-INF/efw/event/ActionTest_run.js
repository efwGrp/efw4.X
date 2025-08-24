var ActionTest_run={};
ActionTest_run.paramsFormat={
	btn:null,
};
ActionTest_run.fire=function(params){
	var ret=new Result();
	if (params.btn=="F1") return ret.alert("I am F1");
	if (params.btn=="F12") return ret.alert("I am F12");
	if (params.btn=="CTRL+A") return ret.alert("I am CTRL+A");
	if (params.btn=="CTRL+Z") return ret.alert("I am CTRL+Z");
	if (params.btn=="Show") return ret.show("fieldset:eq(0) button");
	if (params.btn=="Hide") return ret.hide("fieldset:eq(0) button");
	if (params.btn=="Enable") return ret.enable("fieldset:eq(0) button");
	if (params.btn=="Disable") return ret.disable("fieldset:eq(0) button");
	if (params.btn=="Confirm") 
		return ret.confirm("To be or not to be ?",{
			"YES":"Efw('ActionTest_run',{btn:'YES'})",
			"NO":"Efw('ActionTest_run',{btn:'NO'})"});
	if (params.btn=="YES") return ret.alert("Yes is good"); 
	if (params.btn=="NO") return ret.alert("No is bad"); 
	if (params.btn=="Alert") return ret.alert("I am Alert");
	if (params.btn=="HighlightText") return ret.highlight("#theText");
	if (params.btn=="HighlightNone") return ret.highlight("");
	if (params.btn=="Focus") return ret.focus("#theText");
	if (params.btn=="Create"){
		file.makeDir("I am Folder");
		file.writeAllLines("I am Folder/file1.txt","I am file1","UTF-8");
		file.writeAllLines("I am Folder/file2.txt","I am file2","UTF-8");
		return ret.eval("elfinder1.setHome('')");//クライアントの更新を行う。
	}
	if (params.btn=="DownloadFolder") return ret.attach("I am Folder");
	if (params.btn=="DownloadFiles") return ret.attach("I am Folder/file1.txt","I am Folder").attach("I am Folder/file2.txt","I am Folder");
	if (params.btn=="DldSvDlt") 
		return ret.attach("I am Folder")
		.saveas("IamFolderToo.zip")
		.deleteAfterDownload()
		.eval("elfinder1.setHome('')");//クライアントの更新を行う。
	if (params.btn=="Navigate") return ret.navigate("https://www.google.co.jp/search",{q:"efw4.x"});
}