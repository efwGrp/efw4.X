<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>ユーザ管理</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style_efw.css">
	<efw:Client lang="jp" mode="jquery-ui" theme="mytheme" />
<SCRIPT>
function selectRow(row) {
	$("#tbl_data tr").removeClass("SELECTED");
	$(row).addClass("SELECTED");
	$("#hdn_selected").val($("td:eq(0)",row).html());
}
function dblclickRow(row) {
	selectRow(row);
	Efw("MST01_edit", {"selectId" : getSelectId()});
}
function keepRowSelected(){
	var serifno=$("#hdn_selected").val();
	if (serifno!=""){
		$("#tbl_data tr").removeClass("SELECTED");
		$("#tbl_data tr").each(function(){
			if($("td:eq(0)",this).html()==serifno){
				$(this).addClass("SELECTED");
			}
		});
	}
}
function getSelectId(){
	var selectId = $("#tbl_data tr.SELECTED>td:eq(0)").html();
	return selectId==null?"":selectId ;
}

</SCRIPT>
</HEAD>
<BODY onload="Efw('MST01_init')">
	<efw:Part path="MST01_inputdialog.jsp"/>
	<efw:Part path="MST01_uploaddialog.jsp"/>
	<DIV CLASS=MAIN>
		<DIV CLASS=TOP>
			<efw:Part path="head.jsp" title="EFW DEMO　ユーザ管理" />
			<TABLE STYLE="HEIGHT:43px;">
				<COLGROUP>
					<COL WIDTH=100PX>
					<COL WIDTH=220PX>
					<COL>
					<COL WIDTH=250PX>
				</COLGROUP>
				<TR>
					<TD>フリーワード</TD>
					<TD><INPUT TYPE="TEXT" ID="txt_freeWord"
						STYLE="WIDTH: 300PX; IME-MODE: ACTIVE" MAXLENGTH=50></TD>
					<TD></TD>
					<TD STYLE="TEXT-ALIGN: RIGHT;">
						<BUTTON ONCLICK="Efw('MST01_clear')" data-shortcut="F4">F4 クリア</BUTTON>
						<BUTTON ONCLICK="Efw('MST01_search')" data-shortcut="F5">F5 検索</BUTTON>
					</TD>
				</TR>
			</TABLE>
			<TABLE CLASS=TABLE-HEAD>
				<COLGROUP>
					<COL WIDTH=100PX>
					<COL WIDTH=220PX>
					<COL>
					<COL WIDTH=250PX>

				</COLGROUP>
				<TR>
					<TH CLASS="SORT SELECTED ASC" DATA-SORT="user_id"
						STYLE="BACKGROUND-POSITION-Y: center">ユーザＩＤ</TH>
					<TH CLASS="SORT" DATA-SORT="user_name"
						STYLE="BACKGROUND-POSITION-Y: center">ユーザ名</TH>
					<TH CLASS="SORT" DATA-SORT="eMail"
						STYLE="BACKGROUND-POSITION-Y: center">メールアドレス</TH>
					<TH CLASS="SORT" DATA-SORT="bikou"
						STYLE="BACKGROUND-POSITION-Y: center">コメント</TH>
				</TR>
			</TABLE>
		</DIV>
		<TABLE ID="tbl_data" CLASS="TABLE-BODY" style="margin-top:135px">
			<COLGROUP>
				<COL WIDTH=100PX>
				<COL WIDTH=220PX>
				<COL>
				<COL WIDTH=250PX>

			</COLGROUP>
		</TABLE>
		<INPUT type="hidden" id="hdn_selected">
		<BR>
		<DIV CLASS=FOOTER>
			<BUTTON ONCLICK="Efw('MST01_add')" 
				data-shortcut="F1">F1 新規</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_edit', {'selectId' : getSelectId()})" 
				data-shortcut="F2">F2 修正</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_delete', {'selectId' : getSelectId(),'doConfirm' : true})" 
				data-shortcut="F3">F3 削除</BUTTON>
			<span style="width:50px;display:inline-block"></span>
			<IMG src="img/btn_download.png" class="BTN_ICON" ONCLICK="Efw('MST01_download')" data-shortcut="F6" title="F6 ダウンロード">
			<IMG src="img/btn_upload.png" class="BTN_ICON" ONCLICK="Efw('MST01_upload')" data-shortcut="F7" title="F7 アップロード">
			<efw:Part path="paging.jsp" id="paging" eventId="MST01_search"
				head=".MAIN .TABLE-HEAD" />
		</DIV>
	</DIV>
</BODY>
</HTML>
