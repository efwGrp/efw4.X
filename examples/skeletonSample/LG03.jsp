<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>パスワード変更</TITLE>
	<META NAME="viewport" CONTENT="width=device-width,initial-scale=1"/>
	<META CHARSET="UTF-8"/>
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<efw:Client lang="jp" mode="jquery-ui" theme="dot-luv"/>
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="css/ske.css">
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="bootstrap/icons/bootstrap-icons.css">
	<SCRIPT type="text/javascript" charset="UTF-8" src="./js/common.js"></SCRIPT>
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
					<FIELDSET class=LOGIN style="width:350px">
						<LABEL>ユーザID</LABEL><INPUT ID="txt_uid" MAXLENGTH=10 TYPE="TEXT" STYLE="WIDTH: 150PX;"><BR>
						<LABEL>旧パスワード</LABEL><INPUT ID="txt_pwd" MAXLENGTH=10 STYLE="WIDTH: 150PX;" TYPE="PASSWORD"><BR>
						<LABEL>新パスワード</LABEL><INPUT ID="txt_npwd" MAXLENGTH=10 STYLE="WIDTH: 150PX;" TYPE="PASSWORD"><BR>
						<LABEL>(確認)</LABEL><INPUT ID="txt_npwdCon" MAXLENGTH=10 STYLE="WIDTH: 150PX;" TYPE="PASSWORD"><BR>
						（8文字以上10文字以内、英大文字・英小文字・数字・特殊記号から3種組み合わせが必要）
					</FIELDSET>

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
