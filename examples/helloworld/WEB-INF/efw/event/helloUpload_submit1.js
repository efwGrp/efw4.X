var helloUpload_submit1={};
helloUpload_submit1.paramsFormat={
	"#file1":null
};
helloUpload_submit1.fire=function(params){
	file.remove("upload");
	file.makeDir("upload");
	var ary=params["#file1"].split("/");
	var fielname=ary[ary.length-1];
	file.saveSingleUploadFile("upload/"+fielname);
	var ary=file.list("upload");
	return new Result()
	.runat("body")
	.withdata({
		"#divResult":JSON.stringify(ary),
	});
}