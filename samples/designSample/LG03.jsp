<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>パスワード変更</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style.css">
	<efw:Client theme="mytheme" lang="jp"/>
<SCRIPT type="text/javascript">
	function init (){
		$('#txt_uid').focus();
		Efw("LG03_init");
		}

</SCRIPT>

</HEAD>
<BODY onload="init()">
	<DIV ID="LG03" CLASS=MAIN ALIGN="CENTER">
		<efw:Part path="headbeforelogining.jsp" title="EFW DEMO　パスワード変更" />
		<BR><BR><BR><BR>
		<TABLE STYLE="WIDTH: 50%;">
			<TR></TR>
			<TR>
				<TD ID="LG03top" CLASS="MSG-BLUE" style="padding-left:140px"></TD>
			</TR>
			<TR>
				<TD ID="LG03down" CLASS="MSG-BLUE" style="padding-left:140px"></TD>
			</TR>
			<TR>
				<TD ALIGN=CENTER>
					<BR>
					<TABLE CLASS=BORDER-GRAY STYLE="WIDTH: 300PX">
						<COLGROUP>
							<COL>
							<COL WIDTH="100PX">
							<COL>
						</COLGROUP>
						<TR>
							<TD COLSPAN="3">&nbsp;</TD>
						</TR>
						<TR>
							<TD></TD>
							<TH>ユーザID</TH>
							<TD><INPUT ID="txt_uid" TYPE="TEXT"
								STYLE="WIDTH: 150PX; IME-MODE: DISABLED" MAXLENGTH="10"></TD>
						</TR>
						<TR>
							<TD></TD>
							<TH>旧パスワード</TH>
							<TD><INPUT ID="txt_pwd" TYPE="PASSWORD"
								STYLE="WIDTH: 150PX; IME-MODE: DISABLED;" MAXLENGTH="10"/></TD>
						</TR>
						<TR>
							<TD></TD>
							<TH>新パスワード</TH>
							<TD><INPUT ID="txt_npwd" TYPE="PASSWORD"
								STYLE="WIDTH: 150PX; IME-MODE: DISABLED;" MAXLENGTH="10"/></TD>
						</TR>
						<TR>
							<TD></TD>
							<TH>(確認)</TH>
							<TD><INPUT ID="txt_npwdCon" TYPE="PASSWORD"
								STYLE="WIDTH: 150PX; IME-MODE: DISABLED;" MAXLENGTH="10"/></TD>
						</TR>
						<TR>
							<TD COLSPAN="3"
								STYLE="TEXT-ALIGN: CENTER;line-height:16px">（8文字以上10文字以内、英大文字・英小文字・<BR>数字・特殊記号から3種組み合わせが必要）</TD>
						</TR>
						<TR>
							<TD COLSPAN=3>&nbsp;</TD>
						</TR>
					</TABLE>
					<BR>
				</TD>
			</TR>
			<TR>
				<TD ALIGN="CENTER">
					<BUTTON ONCLICK="window.location='LG01.jsp';">戻る</BUTTON>
					<BUTTON ONCLICK="Efw('LG03_chgPwd')">実行</BUTTON>
				</TD>
			</TR>
		</TABLE>
		<DIV class="FOOTER" style="text-align:center">
		<p id="copyright">&copy;エスコ・ジャパン株式会社</p>
		</DIV>
	</DIV>
</BODY>
</HTML>
