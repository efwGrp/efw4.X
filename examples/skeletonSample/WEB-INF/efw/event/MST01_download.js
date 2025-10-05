var MST01_download={};
MST01_download.name="MST01ユーザマスタ ダウンロード";
/**
 * パラメーターフォーマット
 */
MST01_download.paramsFormat={
		"#txt_freeWord":null,													 					// フリーワード
};
/**
 * ダウンロードイベント実行関数
 */
MST01_download.fire=function(params){
	// テンプレートにより、EXCELオブジェクトを作成する
	var excel=new Excel("templates/MST01.xlsx");
	// データの検索条件を作成
	var searchCondition = {
			"フリーワード" : params["#txt_freeWord"],												// フリーワード
			"user_id asc":"true"
	};
	// フリーワードを条件として、ダウンロード用データを検索する
	var ary=db
	.select(
			"MST01",																				// 外だしSQLファイル名
			"selユーザ一覧",																	 	// 一覧データを検索するSQL名
			searchCondition
		   ).map({
				"user_id":"ユーザid",
				"user_name":"ユーザ名",
				"eMail":"メール",
				"bikou":"コメント"	
	}).getArray();
	// 検索されたレコードを指定された Excel ワークシートに設定して、一時フォルダに保存する
	for(var i=0;i<ary.length;i++){
		var data=ary[i];
		excel
		.setCell("ユーザ一覧", "A"+(i+2), data.user_id, "template", "A2")						  		// ユーザID
		.setCell("ユーザ一覧", "B"+(i+2), data.user_name, "template", "B2")							// ユーザ名
		.setCell("ユーザ一覧", "C"+(i+2), data.eMail, "template", "C2")						   		// メール
		.setCell("ユーザ一覧", "D"+(i+2), data.bikou, "template", "D2")								// コメント
		.setCell("ユーザ一覧", "E"+(i+2), "", "template", "E2")										//削除フラグ
		.setCell("ユーザ一覧", "F"+(i+2), "", "template", "F2")										//メッセージ
		;
	}

	var tempFilePathName=file.getTempFileName();													// ダウンロード用一時ファイルのパス
	excel
	.setActiveSheet("ユーザ一覧")
	.save(tempFilePathName);
	// ダウンロード用ファイルを設定して、ダウンロードした後、ファイルを削除する
	return (new Result())
	.attach(tempFilePathName)
	.saveas("ユーザ_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();
};
