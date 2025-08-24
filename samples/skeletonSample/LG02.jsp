<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>メインメニュー</TITLE>
	<META NAME="viewport" CONTENT="width=device-width,initial-scale=1"/>
	<META CHARSET="UTF-8"/>
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<efw:Client lang="jp" mode="jquery-ui" theme="dot-luv"/>
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="css/ske.css">
	<LINK REL="STYLESHEET" TYPE="TEXT/CSS" HREF="bootstrap/icons/bootstrap-icons.css">
	<SCRIPT type="text/javascript" charset="UTF-8" src="./js/common.js"></SCRIPT>
</HEAD>
<BODY>
	<DIV ID="LG02" CLASS=MAIN>
			<efw:Part path="head.jsp" title="EFW DEMO　メインメニュー" />
			<!-- コンテンツ -->
	<DIV class="MAIN-MENU" style="">
		<DIV style="margin:50px;">
<A id="menu1" href="LG02.jsp">〇〇業務</A><br>
<span style='display:inline-block;width:28px'></span><A id="menu1_1" href="#">〇〇管理</A><br>
<span style='display:inline-block;width:28px'></span><A id="menu1_2" href="#">〇〇管理</A><br>
<span style='display:inline-block;width:28px'></span><A id="menu1_3" href="#">〇〇管理</A><br>
<br>
<A id="menu2" href="LG02.jsp">システム管理</A><br>
<span style='display:inline-block;width:28px'></span><A id="menu2_1" href="javascript:Efw('LG02_goto', {'page' : 'MST01.jsp'})">ユーザ管理</A><br>
		</DIV>
	</DIV>
		<!-- コンテンツ終わり -->

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
