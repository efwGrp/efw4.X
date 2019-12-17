var LG04_sndPwd={};
LG04_sndPwd.name="LG04 ログイン パスワード送信";
/**
 * パラメーターフォーマット
 */
LG04_sndPwd.paramsFormat={
	"#txt_uid":"required:true;display-name:ユーザID"												// ユーザID
};
/**
 * パスワード送信関数
 */
LG04_sndPwd.fire=function(params){
	loadFile(_eventfolder + "/message.js");
	var data=db.select(
		"LG",																						// 外だしSQLファイル名 
		"selユーザ"																					// 担当者情報取得しようのデータを検索するSQL名
		,{"ユーザID":params["#txt_uid"]}															// アカウント
	);
    // 担当者の存在チェック
	if (data.length==0){
		return (new Result())
		.alert(LG01Message.LG01011)
		.highlight("#txt_uid")
		.focus("#txt_uid");																			// カーソルをパスワード送信画面のアカウントにフォーカスする
	}else{
		var userName=data.getValue("ユーザ名");														// ユーザ名
		var eMail=data.getValue("メール");															// Eメール
		var password=data.getValue("パスワード");													// パスワード
		try{
			mail.send(
				"mails",																			// 外だしMAILファイル名 
				"sndPwd",																			// パスワード送信するMAIL名 
				{	"userId":params["#txt_uid"],													// ユーザ名
					"userName":userName,															// 担当者名
					"eMail":eMail,																	// Eメール
					"password":password	}															// パスワード
			);
			
			session.set("USER_ID", params["#txt_uid"]);													// セッションにアカウントを設定する
			// ログ出力
			saveLog("認証", "LG04", "パスワード送信成功");
			session.set("USER_ID", null);																// セッションにアカウントを設定する
			
			return (new Result())
			.alert(LG01Message.LG01012);
		}catch(e){
			
			session.set("USER_ID", params["#txt_uid"]);													// セッションにアカウントを設定する
			// ログ出力
			saveLog("認証", "LG04", "パスワード送信失敗");
			session.set("USER_ID", null);																// セッションにアカウントを設定する
			
			return (new Result())
			.alert(LG01Message.LG01013);
		}
	}
};
