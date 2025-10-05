/***********************
* メイン画面の色設定、
* メイン画面のサイズ調整、
* メイン画面のメインテーブルのサイズ調整
***********************/
$(function(){
	//存在しない場合0にする関数。
	function nvl(num){if (num==null){return 0;}else{return num;}}
	//画面部品サイズ調整の部分
	$("body").append("<span id='efw_skeleton_page_color_checker' class='ui-widget-header' style='display:none'></span>")
	function bodyResize(){
		//両側余白15pxずつ※１つのスクロールバーのサイズ。
		var bodyWidth=$("body").width()-30;
		//jquery uiのヘッダ背景色を取得する
		var uiBackgroundColor=$("#efw_skeleton_page_color_checker").css("background-color");
		//jquery uiのヘッダ文字色を取得する
		var uiFontColor=$("#efw_skeleton_page_color_checker").css("color");

		//css変数を処理開始
		const root = document.querySelector(":root");
		//メインdivの幅を確定
		root.style.setProperty("--main-bage-width",bodyWidth+"px");
		//メインテーブルの幅は、10px足す。縦スクロールバーを右余白に配置させる。
		root.style.setProperty("--main-table-width",(bodyWidth+10)+"px");
		//jquery uiのヘッダ背景色を各種ラベルの背景色とする
		root.style.setProperty("--efw-client-common-background-color",uiBackgroundColor);
		//jquery uiのヘッダ文字色を各種ラベルの文字色とする
		root.style.setProperty("--efw-client-common-title-font-color",uiFontColor);

		//以下の各種類の高さは存在しない場合0にする。
		//bodyの高さ
		var bodyHeight=nvl($("body").height());
		//header部の高さ
		var headerHeight=nvl($("#mainPage .HEADER").height());
		//header-menu部の高さ
		var headerMenuHeight=nvl($("#mainPage .HEADER-MENU").height());
		//条件部の高さ
		var conditionHeight=nvl($("#mainPage .CONDITION").height());
		//footer部の高さ
		var footerHeight=nvl($("#mainPage .FOOTER").height());
		//メインテーブルの高さを計算する。
		var mainTableHeight=bodyHeight-headerHeight-headerMenuHeight-conditionHeight-footerHeight-11;
		$("#mainPage .MAIN-TABLE").height(mainTableHeight+"px");
	}
	//resizeイベントを追加する。※複数設定可能
	$(window).resize(bodyResize);
	//divメインを一旦表示して、幅高さを特定できるようにする。
	$("DIV.MAIN").show();
	//resizeイベントを実行する。
	bodyResize();
});
/***********************
* ダイアログのメインテーブルのサイズ調整
***********************/
function dialogResize(dialogSelector){
	function nvl(num){if (num==null){return 0;}else{return num;}}
	//以下の各種類の高さは存在しない場合0にする。
	//bodyの高さ
	var bodyHeight=nvl($(dialogSelector).height());
	//条件部の高さ
	var conditionHeight=nvl($(dialogSelector+" .CONDITION").height());
	//メインテーブルの高さを計算する。
	var mainTableHeight=bodyHeight-conditionHeight;
	$(dialogSelector+" .MAIN-TABLE").height(mainTableHeight+"px");
	//.MAIN-TABLEのDIVの幅を11減る
	$(dialogSelector+" .MAIN-TABLE TABLE").width(($(dialogSelector+" .MAIN-TABLE").width()-10)+"px");
}

/***********************
* 行クリックのメソッド
************************/
function mainTableRowClick(row) {
	//上位のメインテーブルを探す
	var p=$(row).parents(".MAIN-TABLE")[0];
	$("tr",p).removeClass("SELECTED");
	$(row).addClass("SELECTED");
	$(".upKeep",p).val($("td:eq(0)",row).attr("data-pk"));
};
/***********************
* 行ダブルクリックのメソッド
************************/
function mainTableRowDblClick(row) {
	mainTableRowClick(row);
	var pk=$("td:eq(0)",row).attr("data-pk");
};
/***********************
* メインテーブル表示後の装飾
* 奇数偶数の色設定
* 前回選択状態を維持するメソッド
************************/
function mainTablePaint(tableSelector){
	//一覧奇数行で背景色を付ける
	$(tableSelector+" TR:ODD").addClass("ROW1");
	//一覧偶数行で背景色を付ける
	$(tableSelector+" TR:EVEN").addClass("ROW0");
	//
	var keepedValue=$(tableSelector+" .upKeep").val();
	if (keepedValue!=""){
		$(tableSelector+" TR").removeClass("SELECTED");
		$(tableSelector+" TR").each(function(){
			if($("td:eq(0)",this).attr("data-pk")==keepedValue){
				$(this).addClass("SELECTED");
			}
		});
	}
};
/***********************
* 
***********************/
function mainTableReset(tableSelector){
	$(tableSelector+" .upKeep").val("");
};
/***********************
* 全選択、全解除
***********************/
function mainTableSelectAll(tableSelector){
	//一つめのcheckbox
	var checked=$(tableSelector+" TH:eq(0) input:checkbox").prop("checked");
	//各行の一つめのtdのcheckbox
	$(tableSelector+" TR:has(td:eq(0) input:checkbox)").each(function(index){
		$("TD:eq(0) input:checkbox",this).prop("checked",checked);
	});
};
/***********************
* PKを取得する
***********************/
function getSelectId(){
	var selectId = $(".MAIN-TABLE tr.SELECTED>td:eq(0)").attr("data-pk");
	return selectId==null?"":selectId ;
}
