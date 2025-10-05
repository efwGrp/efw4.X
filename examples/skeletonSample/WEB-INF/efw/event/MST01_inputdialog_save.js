var MST01_inputdialog_save={};
MST01_inputdialog_save.name="MST01ユーザ  保存";
/**
 * パラメーターフォーマット
 */
MST01_inputdialog_save.paramsFormat={
	"#MST01_inputdialog":{
		".userId":"required:true;display-name:ユーザID;",											// ユーザID
		".userName":"required:true;display-name:ユーザ名;",											// ユーザ名
		".eMail":"required:true;display-name:メールアドレス;",										// メールアドレス
		".action":null,																				//action
		".remark":null																				// コメント
	}
};
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
MST01_inputdialog_save.fire=function(params){
	
	// 社員登録画面のデータを取得
	var data={
		"ユーザID":params["#MST01_inputdialog"][".userId"],											// ユーザID
		"ユーザ名":params["#MST01_inputdialog"][".userName"],										// ユーザ名
		"メール":params["#MST01_inputdialog"][".eMail"],											// メール
		"コメント":params["#MST01_inputdialog"][".remark"],											// コメント
		"action":params["#MST01_inputdialog"][".action"],											// action
		"ログインユーザ":session.get("USER_ID"),													// ログインユーザ
	};
	// new 新規の場合
	if(data.action=="new"){
		// 新規のユーザコードはすでに存在の場合
		if(db.select("MST01","selユーザ",{"ユーザID":data.ユーザID}).length>0){
			var message = "ユーザ"+data.ユーザID+"は既に存在するため新規登録できません。";
			return (new Result()).alert(message);
		}
		// 新規のユーザコードは存在しない場合
		// ユーザマスタテーブルにデータを挿入
		db.change("MST01", "insユーザ作成", data);
		// ユーザ登録画面を新規の初期化状態にして、ユーザマスタ画面の一覧データを更新する
		return (new Result())
		.runat("#MST01_inputdialog")
		.withdata({
			".userId":"",
			".userName":"",
			".eMail":"",
			".remark":""
		});
	}else{
	//edit 修正の場合
		// ユーザマスタテーブルにデータを更新
		db.change("MST01", "updユーザ更新", data);
		// ユーザ登録画面を閉じて、社員マスタ画面の一覧データを更新する
		return (new Result())
		.eval("MST01_inputdialog.dialog('close')");													// ユーザ登録画面を閉じる
	}
};
