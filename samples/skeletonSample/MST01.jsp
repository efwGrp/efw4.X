<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>ユーザ管理</TITLE>
	<META NAME="viewport" CONTENT="width=device-width,initial-scale=1"/>
	<META CHARSET="UTF-8"/>
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<efw:Client lang="jp" mode="jquery-ui" theme="dot-luv"/>
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="css/ske.css">
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="bootstrap/icons/bootstrap-icons.css">
	<SCRIPT type="text/javascript" charset="UTF-8" src="./js/common.js"></SCRIPT>
</HEAD>
<BODY onload="Efw('MST01_init')">
	<DIV CLASS=MAIN id="mainPage">
		<efw:Part path="head.jsp" title="EFW DEMO　ユーザ管理" />
		<DIV CLASS=HEADER-MENU>
			<TABLE style="width:100%">
				<TR>
					<TD></TD>
					<TD style="text-align:right"><A TABINDEX="-1" HREF="LG02.jsp">メニューへ</A></TD>
				</TR>
			</TABLE>
		</DIV>

		<TABLE CLASS=CONDITION>
		<TR><TD>
			<DIV class="FORM">
				<LABEL style="width:120px;">フリーワード</LABEL>
				<INPUT TYPE="TEXT" ID="txt_freeWord" STYLE="WIDTH: 300PX;" MAXLENGTH=50>
			</DIV>
		</TD><TD style="width:250px">
			<BUTTON ONCLICK="Efw('MST01_clear')" data-shortcut="F4">F4 クリア</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_search')" data-shortcut="F5">F5 検索</BUTTON>
		</TD></TR>
		</TABLE>
		<DIV class=MAIN-TABLE>
			<TABLE>
				<TR>
					<TH CLASS="SORT SELECTED ASC"  DATA-SORT="user_id" STYLE="width:100px">ユーザＩＤ</TH>
					<TH CLASS="SORT" DATA-SORT="user_name" STYLE="width:220px">ユーザ名</TH>
					<TH CLASS="SORT" DATA-SORT="eMail" STYLE="width:250px">メールアドレス</TH>
					<TH CLASS="SORT" DATA-SORT="bikou">コメント</TH>
				</TR>
			</TABLE>
			<INPUT type="hidden" class="upKeep">
		</DIV>
		<efw:Part path="paging.jsp" id="paging" eventId="MST01_search" table=".MAIN .MAIN-TABLE" />

		<DIV CLASS=FOOTER>
			<BUTTON ONCLICK="Efw('MST01_add')" 
				data-shortcut="F1">F1 新規</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_edit', {selectId:getSelectId()})" 
				data-shortcut="F2">F2 修正</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_delete', {selectId:getSelectId(),doConfirm:true})" 
				data-shortcut="F3">F3 削除</BUTTON>
			<span style="width:50px;display:inline-block"></span>
			
			<BUTTON ONCLICK="Efw('MST01_download')" 
				data-shortcut="F6">F6 ダウンロード</BUTTON>
			<BUTTON ONCLICK="Efw('MST01_upload')" 
				data-shortcut="F7">F7 アップロード</BUTTON>
		</DIV>
	</DIV>
</BODY>
</HTML>
<efw:Part path="MST01_inputdialog.jsp"/>
<efw:Part path="MST01_uploaddialog.jsp"/>
