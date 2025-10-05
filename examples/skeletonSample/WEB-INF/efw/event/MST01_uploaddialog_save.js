var MST01_uploaddialog_save={};
MST01_uploaddialog_save.name="ユーザ  アップロード保存";
/**
 * パラメーターフォーマット
 */
MST01_uploaddialog_save.paramsFormat={
	"#MST01_uploaddialog":{
			".file":"required:true;accept:xlsx;display-name:アップロードファイル;"					// アップロードファイル
		}
};
/**
 * アップロード保存イベント実行関数
 */
MST01_uploaddialog_save.fire=function(params){
	var dateString=(new Date()).format("yyyyMMddHHmmss");											// 現在時間を取得 "yyyyMMddHHmmss"
	var filename="upload/MST01_"+dateString+"_.xlsx";							// アップロード用一時ファイルのパス
	var errorfilename="upload/MST01_"+dateString+"_error.xlsx";					// アップロード用一時エラーファイルのパス
	// アップロードされたファイルを相対パスで保存する
	file.saveSingleUploadFile(filename);
	// テンプレートにより、EXCELオブジェクトを作成する
	var excel=new Excel(filename);
	// EXCELシートの名前をチェックする
	var datalistExisted=false;
	var templateExisted=false;
	var shts=excel.getSheetNames();

	try{
		for(var i=0;i<shts.length;i++){
			if (shts[i]=="ユーザ一覧"){
				datalistExisted=true;
			}
			if (shts[i]=="template"){
				templateExisted=true;
			}
		}
		
		if (!datalistExisted || !templateExisted){
			var message="アップロードされたファイルは正しくありません。";
			return new Result().alert(message);
		}
		// EXCELシート"ユーザ一覧"の最大行数を取得
		var maxrow=excel.getMaxRow("ユーザ一覧");
		// EXCELシート"ユーザ一覧"のデータを取得
		var excelArray=excel.getArray("ユーザ一覧", 1, maxrow, {
			"ユーザID":"A",																			// ユーザID
			"ユーザ名":"B",																			// ユーザ名
			"メールアドレス":"C",																	// メールアドレス
			"備考":"D",																				// 備考
			"削除フラグ":"E",																		// 削除フラグ
			"エラーメッセージ":"F"																	// エラーメッセージ
		});
		//ヘッダ行をチェックする
		var row1=excelArray[0];
		if (row1.ユーザID!="ユーザID"||
				row1.ユーザ名!="ユーザ名"||
				row1.メールアドレス!="メールアドレス"||
				row1.備考!="備考"||
				row1.削除フラグ!="削除フラグ" ||
				row1.エラーメッセージ!="エラーメッセージ"
			){
			var message = "アップロードされたファイルは正しくありません。";
			return new Result().alert(message);
		}
		//データをチェックする
		var haserror=false;																			// エラーがあるかどうかのフラグ
		for (var i=2;i<=maxrow;i++){
			var errormsg="";
			var autherror=false;
			// ユーザIDのチェック
			var row=excelArray[i-1];
			if (row.ユーザID==""||row.ユーザID==null||(""+row.ユーザID).length>10){
			
				errormsg += "ユーザＩＤは必須です。10文字以内で入力してください。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			}
			
			// ユーザの重複をチェック
			for (var j=2;j<i;j++){
				var rowJ=excelArray[j-1];
				if(rowJ.ユーザID==row.ユーザID){
					errormsg+="ユーザＩＤをユニークに設定してください。\n";
					excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
					break;
				}
			}
			
			// ユーザ名のチェック
			if (row.ユーザ名==""||row.ユーザ名==null||(""+row.ユーザ名).length>20){
				errormsg+="ユーザ名は必須です。20文字以内で入力してください。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			}
			
			//メールアドレスのチェック
			if (row.メールアドレス==""||row.メールアドレス==null||(""+row.メールアドレス).length>50){
				errormsg+="メールアドレスは必須です。50文字以内で入力してください。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			}
			
			//備考のチェック
			if ((""+row.備考).length>200){
				errormsg+="備考は200文字以内で入力してください。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			}

			//削除フラグのチェック
			if (row.削除フラグ!=""&&row.削除フラグ!=null&&row.削除フラグ!="×"){
				errormsg+="削除フラグは「×」で記入してください。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			}
			
			// ユーザIDはadminの場合、データを削除できません
			if (row.削除フラグ=="×"&&row.ユーザID=="admin"){
				errormsg+="管理者を削除できません。\n";
				excel.setCell("ユーザ一覧","F"+i, errormsg, "template", "F3");
			} 
			
			 // エラーメッセージがある場合、対応セルにメッセージを挿入する
			if (errormsg!=""){
				haserror=true;
			}
		}
		
		// エラーがある場合
		if(haserror){
			excel
			.save(errorfilename)																	// エラー情報のEXCELを一時フォルダに保存する。
			.close();																				// EXCELを閉じる
			file.remove(filename);																	// 一時テンプレートファイルを削除
			// エラー結果を返す
			var message = "アップロードファイルにエラーがあります。修正後、再びアップロードしてください。";
			return (new Result()).alert(message)													// エラーメッセージを提示
			.attach(errorfilename)																	// エラーファイルを設定
			.deleteAfterDownload();																	// ダウンロードした後、ファイルを削除する
		}else{
			excel.close();
		}
		// エラーがない場合
		for (var i=2;i<=maxrow;i++){
			var row=excelArray[i-1];
			// 削除フラグが"×"にした場合、この一行データを削除
			if(row.削除フラグ == "×"){
				db.change("MST01", "delユーザ", {"ユーザID":row.ユーザID});
			}else{
				// 削除フラグがない場合
				// ユーザコードが既存の場合、データを更新
				if (db.master("ユーザマスタ").seek("ユーザid", "eq", row.ユーザID).length > 0){
					db.change("MST01", "updユーザ更新", {
						"ユーザID":row.ユーザID,
						"ユーザ名":row.ユーザ名,													// ユーザ名
						"メール":row.メールアドレス,												// メールアドレス
						"コメント":row.備考,														// 備考
						"ログインユーザ":session.get("USER_ID"),									// ログインユーザー
					});
				}else{
				// ユーザコードが存在しない場合、データを挿入
					db.change("MST01", "insユーザ作成", {
						"ユーザID":row.ユーザID,													// ユーザID
						"ユーザ名":row.ユーザ名,													// ユーザ名
						"メール":row.メールアドレス,												// メールアドレス
						"コメント":row.備考,														// 備考
						"ログインユーザ":session.get("USER_ID"),									// ログインユーザー
					});
				}
			}
		}
		// 一時ファイルを削除
		file.remove(filename);
		// ユーザアップロード画面を閉じて、ユーザマスタ一覧データを更新	
		return (new Result())
			.eval("MST01_uploaddialog.dialog('close')");
	}catch(e){
		db._rollbackAll();
		var massage = "アップロード処理にて想定外の異常が発生しました。";
		return new Result().alert(massage + e);
	}
};
