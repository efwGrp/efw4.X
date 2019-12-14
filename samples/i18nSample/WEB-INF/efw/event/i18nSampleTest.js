var i18nSampleTest={};
i18nSampleTest.paramsFormat={
	input:"required:true;display-name:{here}"
};
i18nSampleTest.fire=function(params){
	return (new Result())
	.runat("body")
	.withdata({"input":""})
	.runat("table")
	.append("<tr><td>{here}</td><td>{value}</td></tr>")
	.withdata([{value:params["input"]}])
	.alert("{here} = "+params["input"],"{here}");
}