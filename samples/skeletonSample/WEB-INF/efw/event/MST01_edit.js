var MST01_edit={};
MST01_edit.name="ユーザ編集";
MST01_edit.paramsFormat={
	"selectId":null,
};
MST01_edit.fire=function(params){
	if (params["selectId"]==""){
		return (new Result())
		.alert("ユーザを選択してください。");
	}
	return (new Result())
	.eval("MST01_inputdialog.selectId='"+params["selectId"]+"'")
	.eval("MST01_inputdialog.dialog('open')")
	;
};
