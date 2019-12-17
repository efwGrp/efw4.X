var LG01_cookie={};
LG01_cookie.name="LG01 ログイン Cookie情報取得";
/**
 * パラメーターフォーマット
 */
LG01_cookie.paramsFormat={};
/**
 * Cookie情報取得関数
 */
LG01_cookie.fire=function(params){
	return (new Result())
	.runat()
	.withdata({
		"#txt_uid":cookie.get("txt_uid"),															//cookieからアカウントを取得
		"#txt_pwd":"",																				//パスワードに""を設定
	});
};