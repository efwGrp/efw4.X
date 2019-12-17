var LG01_clear={};
LG01_clear.name="LG01 ログイン クリア";
/**
 * パラメーターフォーマット
 */
LG01_clear.paramsFormat={};
/**
 * クリアイベント実行関数
 */
LG01_clear.fire=function(params){
	// ログイン画面すべてのINPUTに""を設定
	return (new Result())
	.runat()
	.withdata({
		"#txt_uid":"",																				//アカウント
		"#txt_pwd":"",																				//パスワード
	})
	.alert("アカウントとパスワードを入力してください。");
};
