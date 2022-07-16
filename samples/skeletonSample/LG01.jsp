<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>EFWデザインデモ</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style_efw.css">
	<efw:Client lang="jp" mode="jquery-ui" theme="mytheme" />
</HEAD>
<BODY ONLOAD="Efw('LG01_cookie');$('#txt_uid').focus();">
	<DIV ID="LG01" CLASS=MAIN ALIGN="CENTER">
		<efw:Part path="headbeforelogining.jsp" title="EFW DEMO" />
		<BR><BR><BR><BR><BR>
		<DIV STYLE="WIDTH:700PX;LINE-HEIGHT:18PX;TEXT-ALIGN:CENTER;"><LABEL ID=LBL_MSG CLASS="MSG-BLUE">ユーザーID 、パスワードを入力してください。</LABEL></DIV>
		<BR>
		<TABLE CLASS=BORDER-GRAY
			STYLE="BACKGROUND-COLOR: WHITE; WIDTH: 300PX;">
			<TR>
				<TD COLSPAN=4>&nbsp;</TD>
			</TR>
			<TR>
				<TD STYLE="WIDTH: 15PX"></TD>
				<TH STYLE="TEXT-ALIGN:LEFT">ユーザID</TH>
				<TD><INPUT ID="txt_uid" MAXLENGTH=10 TYPE="TEXT"
					STYLE="WIDTH: 150PX; IME-MODE: DISABLED"></TD>
				<TD STYLE="WIDTH: 15PX"></TD>
			</TR>
			<TR>
				<TD></TD>
				<TH STYLE="TEXT-ALIGN:LEFT">パスワード</TH>
				<TD><INPUT ID="txt_pwd" MAXLENGTH=10
					STYLE="WIDTH: 150PX; IME-MODE: DISABLED" TYPE="PASSWORD"></TD>
				<TD></TD>
			</TR>
			<TR>
				<TD COLSPAN=4>&nbsp;</TD>
			</TR>
		</TABLE>
		<BR>
		<BR>
		<BUTTON ONCLICK="Efw('LG01_submit')">ログイン</BUTTON>
		<BUTTON ONCLICK="Efw('LG01_clear');">クリア</BUTTON>
		<BR>
		<BR>
		<A HREF="LG04.jsp">パスワードを忘れた場合</A>
		<A HREF="LG03.jsp">パスワードを変更する場合</A>
		<DIV CLASS="FOOTER" STYLE="text-align:center">
		<P ID="copyright">&copy;エスコ・ジャパン株式会社</P>
		</DIV>
	</DIV>
</BODY>
</HTML>
