var OutputTest_display={};
OutputTest_display.paramsFormat={
	"#txtOptions":null,
	"#txtTables":null,
	"#txtValues":null,
}
OutputTest_display.fire=function(params){
//	java.lang.Thread.sleep(3000);
	var aryOptions=JSON.parse(params["#txtOptions"]);
	var aryTables=JSON.parse(params["#txtTables"]);
	var objValues=JSON.parse(params["#txtValues"]);
	return new Result()
	.runat("#item20,#item21")
	.remove("option")
	.append("<option value='{value}'>{text}</option>")
	.withdata(aryOptions)
	.runat("#item23")
	.remove("tr:gt(0)")
	.append("<tr><td>{fd1}</td><td>{fd2}</td><td>{fd3}</td></tr>")
	.withdata(aryTables)
	.runat("body")
	.withdata(objValues);
}
