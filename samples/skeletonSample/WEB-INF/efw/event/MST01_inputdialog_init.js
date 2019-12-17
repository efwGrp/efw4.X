var MST01_inputdialog_init={};
MST01_inputdialog_init.name="ユーザ定義入力画面初期化";
MST01_inputdialog_init.paramsFormat={
	"selectId":null
};
MST01_inputdialog_init.fire=function(params){
	var objData={};
	
	if (params["selectId"]==""){//新規の場合
		objData={
				".userId":"",
				".userName":"",
				".eMail":"",
				".remark":"",
			};
		// ユーザ登録画面のactionの値を"new"に変更する
		objData[".action"]="new";
		
	}else{//編集の場合
		objData=db.select("MST01","selユーザ",{"ユーザID":params["selectId"]})
		.map({
			".userId":"ユーザid",
			".userName":"ユーザ名",
			".remark":"コメント",
			".eMail":"メール",
		}).getSingle();
		// ユーザ登録画面のactionの値を"edit"に変更する
		objData[".action"]="edit";
	}
	
	var ret=(new Result())
	.runat("#MST01_inputdialog")
	.withdata(objData);

	if (params["selectId"]==""){
		ret.enable("#MST01_inputdialog .userId")
		.focus("#MST01_inputdialog .userId")
	}else{
		ret.disable("#MST01_inputdialog .userId")
		.focus("#MST01_inputdialog .userName")
	}
	return ret;
};
