var LG03_chgPwd={};
LG03_chgPwd.name="LG03ログイン パスワード変更";
/**
 * パラメーターフォーマット
 */
LG03_chgPwd.paramsFormat={
	"#txt_uid":"required:true;display-name:ユーザーID",												// アカウント
	"#txt_pwd":"required:true;display-name:旧パスワード",											// 旧パスワード
	"#txt_npwd":"required:true;display-name:新パスワード",											// 新パスワード
	"#txt_npwdCon":"required:true;display-name:確認パスワード",										// 確認パスワード
};
/**
 * パスワード変更ベント実行関数
 */
LG03_chgPwd.fire=function(params){
	// 新パスワードと旧パスワードが同じ場合、以下のエラーメッセージを表示する。
	if(params["#txt_pwd"]==params["#txt_npwd"]){
		return (new Result())
		.alert("新パスワードは旧パスワードと異なるように設定してください。")
		.highlight("#txt_npwd")
		.focus("#txt_npwd");																		// カーソルを パスワード変更画面の新パスワードにフォーカスする
	}else if(params["#txt_npwd"].length<8){
	// パスワードの文字数チェック
		return (new Result())
		.alert("新パスワードは８桁以上で入力してください。")
		.highlight("#txt_npwd")
		.focus("#txt_npwd");																		// カーソルを パスワード変更画面の新パスワードにフォーカスする
	}else if(checkNewPwdReg(params["#txt_npwd"]) != true){
    // 新パスワードに数字英字が揃えない場合、以下のエラーメッセージを表示する。
		return (new Result())
		.alert("新パスワードに英大文字・英小文字・数字・特殊記号から３種組み合わせにしてください。")
		.highlight("#txt_npwd")
		.focus("#txt_npwd");																		// カーソルを パスワード変更画面の新パスワードにフォーカスする
	}else if(params["#txt_npwd"]!=params["#txt_npwdCon"]){
	// 確認パスワードと新パスワードの一致チェック
		return (new Result())
		.alert("新パスワード（確認）が正しくありません。")
		.highlight("#txt_npwdCon")
		.focus("#txt_npwdCon");																		// カーソルを パスワード変更画面の新パスワードにフォーカスする
	}

	var pwd=db.select(
		"LG",																						// 外だしSQLファイル名
		"selユーザ",																				// 旧パスワード取得のSQL
		{"ユーザID":params["#txt_uid"]}																// アカウント
	).getValue("パスワード");

	// 旧パスワードの存在チェック
	if(params["#txt_pwd"]!=pwd){
		return (new Result())
		.alert("パスワードが変更できません。再度、入力してください。")
		.highlight("#txt_pwd")
		.focus("#txt_pwd");																			// カーソルを パスワード変更画面の旧パスワードにフォーカスする
	}else{
		db.change(
			"LG",																					// 外だしSQLファイル名
			"updパスワード",																		// パスワード変更のSQL名 
			{	"パスワード":params["#txt_npwd"],													// 新パスワード
				"ユーザID":params["#txt_uid"]}														// アカウント
		);
		cookie.set("txt_uid",params["#txt_uid"]);
		return (new Result())
		.alert("パスワードを変更しました。")
		.runat("#LG03")																				// クリア
		.withdata({
			"#txt_uid" : "",																		// アカウント
			"#txt_pwd" : "",																		// 旧パスワード
			"#txt_npwd" : "",																		// 新パスワード
			"#txt_npwdCon" : ""																		// 確認パスワード
		});
	}
	
	//英大文字・英小文字・数字・特殊記号から３種組み合わせ
	function checkNewPwdReg(npwd){
		var reg1=/[0-9]/;
		var reg2=/[a-z]/;
		var reg3=/[A-Z]/;
		var reg4=/[\!\x22\#$%&@'()*+,-./]/;
		
		var matchcount=0;
		if(reg1.test(npwd)){matchcount++;}
		if(reg2.test(npwd)){matchcount++;}
		if(reg3.test(npwd)){matchcount++;}
		if(reg4.test(npwd)){matchcount++;}
		
		if(matchcount>=3){
			return true;
		}else{
			return false;
		}
	}
};
