var MST01_search={};
MST01_search.name="ユーザ一覧検索";
MST01_search.paramsFormat={
	"#txt_freeWord":null,																			// フリーワード
	"#paging":{
		".currentPage":"format:0",																	// 現在のページ数
		".allPages":"format:0",																		// すべてのページ数
		".totalNumber":"format:0",																	// 総件数
		".orderBy":null,																			// ソート
	},
	"#hdn_selected":null,
};
MST01_search.fire=function(params){
	// データの検索条件を作成
	var searchCondition = {
			"フリーワード":params["#txt_freeWord"],													// フリーワード
			"currentPage":params["#paging"][".currentPage"],										// 現在のページ数
			"allPages":params["#paging"][".allPages"],												// すべてのページ数
			"totalNumber":params["#paging"][".totalNumber"],										// 総件数
			"orderBy":params["#paging"][".orderBy"],												// ソート
			
	};
	var arySerifs=getPageData(
		"MST01",
		"selユーザ一覧cnt",
		"selユーザ一覧",
	searchCondition)
	.map({
		"user_id":"ユーザid",
		"user_name":"ユーザ名",
		"eMail":"メール",
		"bikou":"コメント",
	}).getArray();
	
	// 画面へ結果を返す
	return (new Result())
	.runat("#paging")																				// ページ数を設定
	.withdata({
		".currentPage":searchCondition.currentPage,													// 現在のページ数
		".allPages":searchCondition.allPages,														// すべてのページ数
		".totalNumber":searchCondition.totalNumber													// 総件数
	})
	.runat("#tbl_data")
	.remove("tr")
	.append("<tr " +
			"onclick='selectRow(this)' " +
			"ondblclick='dblclickRow(this)'>" +
			"<td title='{user_id}'>{user_id}</td>" +												// ユーザID
			"<td title='{user_name}'>{user_name}</td>" +											// ユーザ名
			"<td title='{eMail}'>{eMail}</td>" +													// メール
			"<td title='{bikou}'>{bikou}</td>" +													// コメント
			"</tr>")
	.withdata(arySerifs)
	.eval("$('#tbl_data TR:ODD').addClass('ROW1');")												// 一覧奇数行で背景色を付ける
	.eval("$('#tbl_data TR:EVEN').addClass('ROW0');")												// 一覧偶数行で背景色を付ける
	.eval("keepRowSelected()");
};
