<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>EFWデザインデモ</TITLE>
	<META NAME="viewport" CONTENT="width=device-width,initial-scale=1"/>
	<META CHARSET="UTF-8"/>
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<efw:Client lang="jp" mode="jquery-ui" theme="dot-luv"/>
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="css/ske.css">
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="bootstrap/icons/bootstrap-icons.css">
	<SCRIPT type="text/javascript" charset="UTF-8" src="./js/common.js"></SCRIPT>
</HEAD>
<BODY ONLOAD="Efw('LG01_cookie');$('#txt_uid').focus();">
	<DIV ID="LG01" CLASS=MAIN ALIGN="CENTER">
		<efw:Part path="headbeforelogining.jsp" title="EFW DEMO" />
		<BR><BR><BR><BR><BR>
		<DIV STYLE="WIDTH:700PX;LINE-HEIGHT:18PX;TEXT-ALIGN:CENTER;"><LABEL ID=LBL_MSG>ユーザーID 、パスワードを入力してください。</LABEL></DIV>
		<BR>
		<FIELDSET class=LOGIN style="width:300px">
			<LABEL>ユーザID</LABEL><INPUT ID="txt_uid" MAXLENGTH=10 TYPE="TEXT" STYLE="WIDTH: 150PX;"><BR>
			<LABEL>パスワード</LABEL><INPUT ID="txt_pwd" MAXLENGTH=10 STYLE="WIDTH: 150PX;" TYPE="PASSWORD"><BR>
		</FIELDSET>
		<BR>
		<BR>
		<BUTTON ONCLICK="Efw('LG01_submit')">ログイン</BUTTON>
		<BUTTON ONCLICK="Efw('LG01_clear');">クリア</BUTTON>
		<BR>
		<BR>
		<A HREF="LG04.jsp">パスワードを忘れた場合</A>
		<A HREF="LG03.jsp">パスワードを変更する場合</A>
		<DIV CLASS="FOOTER">
			<TABLE><TR>
				<TD CLASS="VERSION"></TD>
				<TD CLASS="COPYRIGHT">&copy;エスコ・ジャパン株式会社</TD>
				<TD CLASS="VERSION"></TD>
			</TR></TABLE>
		</DIV>
	</DIV>
</BODY>
</HTML>
