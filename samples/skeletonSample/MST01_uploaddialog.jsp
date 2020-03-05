<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="MST01_uploaddialog" STYLE="DISPLAY:NONE">
	<SCRIPT>
	var MST01_uploaddialog=null;
	$(function(){
		MST01_uploaddialog=$("#MST01_uploaddialog").dialog({
			title : "ユーザアップロード",
			autoOpen: false,
			resizable : false,
			height : 300,
			width : 500,
			modal : true,
			close : function(){
					Efw("MST01_search");
			},
		});
	});
	</SCRIPT>
	<LABEL CLASS="MSG-BLUE">ファイルを選択してください。</LABEL>
	<BR>
	<BR>
	<INPUT CLASS="file" TYPE="FILE" STYLE="WIDTH:100%;HEIGHT:30PX;PADDING:0">
	<BR>
	<BR>
	<BR>
	<DIV STYLE="TEXT-ALIGN:CENTER">
		<BUTTON ONCLICK="Efw('MST01_uploaddialog_save')" data-shortcut="F7" STYLE="WIDTH:150PX">F7 アップロード</BUTTON>
		<BUTTON ONCLICK="MST01_uploaddialog.dialog('close');" data-shortcut="ESC">ESC 閉じる</BUTTON>
	</DIV>
</DIV>

