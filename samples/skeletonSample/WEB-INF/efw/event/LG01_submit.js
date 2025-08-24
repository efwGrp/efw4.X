var LG01_submit={};
LG01_submit.name="LG01 ログイン 認証処理";
/**
 * パラメーターフォーマット
 */
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:ユーザID;",																				//アカウント
	"#txt_pwd":"required:true;display-name:パスワード;",																				//パスワード
};
/**
 * 認証処理関数
 */
LG01_submit.fire=function(params){
	
	var LOGIN_FAILED_TIMES = session.get("LOGIN_FAILED_TIMES");
	if(LOGIN_FAILED_TIMES==null){
		session.set("LOGIN_FAILED_TIMES",0);
	}else{
		LOGIN_FAILED_TIMES++;
		session.set("LOGIN_FAILED_TIMES",LOGIN_FAILED_TIMES);
	}
	
	var data=db
	.select(
		"LG",																					// 外だしSQLファイル名
		"selユーザ",																			// ユーザ情報取得のSQL
		{"ユーザID":params["#txt_uid"]}															// アカウント
	).getSingle();
	var pwd=data["パスワード"];																	// パスワード
	var initFlag=data["初期化フラグ"];															// パスワード変更画面からのパスワード
	var lockFlag=data["ロックフラグ"];															// ロックフラグ
	var userName=data["ユーザ名"];																//ユーザ名

	// ユーザーはロックされているかどうか
	if(lockFlag == "1"){
		return (new Result())
		.alert("ユーザーＩＤとパスワードが正しく入力されていないため、アカウントがロックされました。<br>「パスワードを忘れた場合」で正しいパスワードを取得して、「パスワードを変更する場合」 でパスワードを再設定してください。");
	}else if (params["#txt_pwd"] == pwd && initFlag == '1'){
	// 初期パスワードは変更してないか
		session.create();
		session.set("INITFLAG",initFlag);
		cookie.set("txt_uid",params["#txt_uid"]);												// cookieにアカウントを設定する
		return (new Result())
		.alert("初回ログインのため、パスワードを変更してください。")
		.navigate("LG03.jsp");
	}else if (params["#txt_pwd"] == pwd && initFlag == "0"){
	// ユーザー登録が成功
		session.set("USER_ID", params["#txt_uid"]);													// セッションにアカウントを設定する
		session.set("USER_NM",userName);															// セッションにユーザ名を設定する
		session.set("INITFLAG",initFlag);															// パスワード変更画面からのパスワード
		session.set("LOGIN_FAILED_TIMES",null);
		cookie.set("txt_uid",params["#txt_uid"]);													// cookieにアカウントを設定する
		return (new Result()).navigate("LG02.jsp");													// メニュー画面へ遷移する
	}else{
		session.set("USER_ID", params["#txt_uid"]);													// セッションにアカウントを設定する
		// １０回ログイン失敗の場合、ユーザマスタ情報のロックフラグを設定する。
		if(session.get("LOGIN_FAILED_TIMES") == 10){
			session.set("LOGIN_FAILED_TIMES",0);//リセット
			db.change(
				"LG",																				// 外だしSQLファイル名
				"lckユーザ",																		// パスワード変更のSQL
				{"ユーザID":params["#txt_uid"]}														// アカウント
			);
			
			return (new Result())
			.alert("ユーザＩＤとパスワードは正しく入力されていないため、アカウントがロックされました。パスワードを変更してから、再度ログインしてください。");
		}
		session.set("USER_ID", "");																	// セッションに空文字を設定する
		return (new Result())
		.alert("ログインできません。ユーザＩＤとパスワードを確認して、もう一度入力してください。")
		.focus("#txt_uid")																			// カーソルを ログイン画面のアカウントにフォーカスする
		.highlight("#txt_uid")
		.highlight("#txt_pwd");
	}
};
