var helloUpload_submitM={};
helloUpload_submitM.paramsFormat={
	"#fileM":"accept:xlsx;display-name:複数ファイル選択枠"
};
helloUpload_submitM.fire=function(params){
	file.remove("upload");
	file.makeDir("upload");
	file.saveUploadFiles( "upload" );
	var ary=file.list("upload");
	return new Result()
	.runat("body")
	.withdata({
		"#divResult":JSON.stringify(ary),
	});
}