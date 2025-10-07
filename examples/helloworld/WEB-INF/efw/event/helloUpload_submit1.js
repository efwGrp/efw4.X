var helloUpload_submit1={};
helloUpload_submit1.paramsFormat={
	"#file1":"accept:xlsx;display-name:単独ファイル選択枠"
};
helloUpload_submit1.fire=function(params){
	file.remove("upload");
	file.makeDir("upload");
	var filename=params["#file1"].split(/[/\\]/g).pop();
	file.saveSingleUploadFile("upload/"+filename);
	var ary=file.list("upload");
	return new Result()
	.runat("body")
	.withdata({
		"#divResult":JSON.stringify(ary),
	});
}