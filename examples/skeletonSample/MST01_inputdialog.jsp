<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="MST01_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
	var MST01_inputdialog = null;
	$(function() {
		MST01_inputdialog = $("#MST01_inputdialog").dialog({
			title : "ユーザ登録",
			autoOpen : false,
			resizable : false,
			height : 330,
			width : 550,
			modal : true,
			show: "fade",
			open : function(){
				Efw("MST01_inputdialog_init",{"selectId":MST01_inputdialog.selectId});
			},
			close : function(){
				Efw("MST01_search");
			},
			//ボタンありの場合、createメソッドを利用する
			create : function(){$(".ui-dialog-buttonset",$(this).parent().get(0)).html(`
				<BUTTON ONCLICK="Efw('MST01_inputdialog_save')" data-shortcut="CTRL+S">CTRL+S 保存</BUTTON>
				<BUTTON ONCLICK="MST01_inputdialog.dialog('close');" data-shortcut="ESC">ESC 閉じる</BUTTON>
			`);},
			//ダミーボタンの目的はjquery uiのダイアログのボタンエリアを作成させるため
			buttons:{"dummy":function(){}},
			});
	});
	</SCRIPT>
	<TABLE STYLE="WIDTH: 100%" >
		<COLGROUP>
			<COL WIDTH="100PX">
			<COL>
		</COLGROUP>
		<TR><TD>ユーザID</TD><TD><INPUT CLASS="userId" TYPE="TEXT" STYLE="WIDTH:100px;IME-MODE:DISABLED" MAXLENGTH=10></TD></TR>
		<TR><TD>ユーザ名</TD><TD><INPUT CLASS="userName" TYPE="TEXT" STYLE="WIDTH:95%" MAXLENGTH=20></TD></TR>
		<TR><TD>メールアドレス</TD><TD><INPUT CLASS="eMail" TYPE="TEXT" STYLE="WIDTH:95%;IME-MODE:DISABLED" MAXLENGTH=50></TD></TR>
		<TR><TD>コメント</TD><TD><TEXTAREA CLASS="remark" STYLE="WIDTH:95%;HEIGHT:100PX" MAXLENGTH=200></TEXTAREA></TD></TR>
	</TABLE>
	<INPUT TYPE="HIDDEN" CLASS="action">
</DIV>

