var head_logout={};
head_logout.name="ヘッダ ログアウト";
/**
 * パラメーターフォーマット
 */
head_logout.paramsFormat={};
/**
 * ログアウトイベント実行関数
 */
head_logout.fire=function(params){
	session.invalidate();																			// セッションを無効化
	return (new Result())
	.navigate("LG01.jsp");																			// ログイン画面へ遷移する
};
