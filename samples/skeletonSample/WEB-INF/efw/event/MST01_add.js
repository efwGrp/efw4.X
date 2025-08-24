var MST01_add={};
MST01_add.name="ユーザ追加";
MST01_add.paramsFormat={};
MST01_add.fire=function(params){
	return (new Result())
	.eval("MST01_inputdialog.selectId=''")
	.eval("MST01_inputdialog.dialog('open')")
	;
};
