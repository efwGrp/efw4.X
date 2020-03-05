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
	var data=db.select(
		"LG",																						// 外だしSQLファイル名 
		"selユーザ"																					// 担当者情報取得しようのデータを検索するSQL名
		,{"ユーザID":params["#txt_uid"]}															// アカウント
	);
    // 担当者の存在チェック
	if (data.length==0){
		return (new Result())
		.alert("ユーザーＩＤが正しくありません。")
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
			session.set("USER_ID", null);																// セッションにアカウントを設定する
			
			return (new Result())
			.alert("パスワード通知メールが送信されました。");
		}catch(e){
			
			session.set("USER_ID", params["#txt_uid"]);													// セッションにアカウントを設定する
			session.set("USER_ID", null);																// セッションにアカウントを設定する
			
			return (new Result())
			.alert("パスワード通知メールが送信できませんでした。システム管理者に問い合わせてください。");
		}
	}
};
