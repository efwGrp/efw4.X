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
			height : 200,
			width : 550,
			modal : true,
			show: "fade",
			open : function(){},
			close : function(){
					Efw("MST01_search");
			},
		});
	});
	</SCRIPT>
	<TABLE STYLE="WIDTH: 100%;height: 40%">
		<TR>
			<TD align="center">
				<input TYPE="file" class="file" STYLE="WIDTH:80%;">
         	</TD>
         </TR>
	</TABLE>
	<DIV CLASS="FOOTER">
		<BUTTON ONCLICK="Efw('MST01_uploaddialog_save')" data-shortcut="F7" STYLE="WIDTH:150PX">F7 アップロード</BUTTON>
		<BUTTON ONCLICK="MST01_uploaddialog.dialog('close');" data-shortcut="ESC">ESC 閉じる</BUTTON>
	</DIV>
</DIV>

