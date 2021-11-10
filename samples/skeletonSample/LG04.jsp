<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>パスワード送信依頼</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style_efw.css">
	<efw:Client lang="jp" mode="jquery-ui" theme="mytheme" />
</HEAD>
<BODY onload="$('#txt_uid').focus();">
	<DIV ID="LG04" CLASS=MAIN ALIGN="CENTER">
		<efw:Part path="headbeforelogining.jsp" title="EFW DEMO　パスワード送信依頼" />
		<BR><BR><BR><BR>
		<TABLE STYLE="WIDTH: 70%;">
			<TR>
				<TD CLASS="MSG-BLUE" style="padding-left:150px"><BR>以下の手順で登録されているパスワードをメールでお知らせします。<BR>
				<BR></TD>
			</TR>
			<TR>
				<TD style="padding-left:150px">・本人のユーザIDを入力し、「メール送信」ボタンをクリックしてください。</TD>
			</TR>
			<TR>
				<TD style="padding-left:150px">・クリック後、会社メールアドレスへパスワード通知メールが送信されます。</TD>
			</TR>
			<TR>
				<TD style="padding-left:150px">・メールボックスを確認し、件名「パスワード通知」のメールを開き、パスワードを確認してください。</TD>
			</TR>
			<TR>
				<TD ALIGN=CENTER>
					<BR>
					<TABLE CLASS=BORDER-GRAY STYLE="WIDTH: 300PX">
						<TR>
							<TD COLSPAN=4>&nbsp;</TD>
						</TR>
						<TR>
							<TD></TD>
							<TH>ユーザID</TH>
							<TD><INPUT ID="txt_uid" TYPE="TEXT"
								STYLE="WIDTH: 150PX; IME-MODE: DISABLED" MAXLENGTH=10></TD>
							<TD></TD>
						</TR>
						<TR>
							<TD COLSPAN=4>&nbsp;</TD>
						</TR>
					</TABLE>
					<BR>
				</TD>
			</TR>

			<TR>
				<TD ALIGN=CENTER>
					<BUTTON ONCLICK="window.location='LG01.jsp';">戻る</BUTTON>
					<BUTTON ONCLICK="Efw('LG04_sndPwd')">メール送信</BUTTON>
				</TD>
			</TR>
		</TABLE>
		<DIV class="FOOTER" style="text-align:center">
		<p id="copyright">&copy;エスコ・ジャパン株式会社</p>
		</DIV>
	</DIV>
</BODY>
</HTML>
