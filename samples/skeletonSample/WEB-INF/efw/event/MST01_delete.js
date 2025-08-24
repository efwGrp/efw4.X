var MST01_delete={};
MST01_delete.name="ユーザ一覧削除";
MST01_delete.paramsFormat={
	"selectId":null,
	"doConfirm":null,
};
MST01_delete.fire=function(params){
	if (params["selectId"]==""){
		return (new Result())
		.alert("ユーザを選択してください。");
    // ユーザは管理者の場合
    }else if(params["selectId"]=="admin"){
        return (new Result())
    	.alert("管理者を削除できません。");
	}else if (params["doConfirm"]==true){
		return (new Result())
		.confirm("選択されたユーザを削除します。よろしいですか",{
			"削除":"Efw('MST01_delete',{"
				+"selectId:'"+params["selectId"]+"',"
				+"doConfirm:false,"
			+"})",
			"キャンセル":"",
		})
	}else{
		db.change("MST01","delユーザ",{
			"ユーザID":params["selectId"],
		});
		return (new Result())
		.eval("Efw('MST01_search')");
	}
};

