<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>メインメニュー</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style_efw.css">
	<efw:Client lang="jp" mode="jquery-ui" theme="mytheme" />
</HEAD>
<BODY>
	<DIV ID="LG02" CLASS=MAIN>
			<efw:Part path="headwithoutmenu.jsp" title="EFW DEMO　メインメニュー" />
			<!-- コンテンツ -->
			<div id="container" class="container"  style = "margin-top:30px" >
				<br />
				<fieldset id="div1" class="BORDER-GRAY"
					style="width: 500px; margin:auto; text-align:center;">
					<legend class="MENU-GROUP" id="lbl_master" style="text-align:left;">〇〇業務</legend>
					<table style="WIDTH: 500px">
						<tr><td>
							<BUTTON class="MENU-BUTTON1">〇〇管理</BUTTON>
						</td></tr>
					</table>
				</fieldset>
				<br/>
				<fieldset id="div3" class="BORDER-GRAY"
					style="width: 500px; margin:auto; text-align:center;">
					<legend class="MENU-GROUP" id="lbl_system" style="text-align:left;">システム管理</legend>
					<table style="WIDTH: 500px">
						<tr><td>
							<BUTTON class="MENU-BUTTON3" ONCLICK="Efw('LG02_goto', {'page' : 'MST01.jsp'})" style="color:yellow!important">ユーザ管理</BUTTON>
						</td></tr>
					</table>
				</fieldset>
			</div>
		<!-- コンテンツ終わり -->
		<DIV CLASS="FOOTER" STYLE="text-align:center">
		<P ID="copyright">&copy;エスコ・ジャパン株式会社</P>
		</DIV>
	</DIV>
</BODY>
</HTML>
