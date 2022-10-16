<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>azureテスト</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL="SHORTCUT ICON" HREF="img/favicon.png" />
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style_efw.css">
	<efw:Client lang="jp" mode="jquery-ui" theme="mytheme" />
	<script type="text/javascript" src="https://alcdn.msauth.net/browser/2.8.0/js/msal-browser.min.js"></script>
	<script type="text/javascript" src="./js/authConfig.js"></script>
	<script type="text/javascript" src="./js/auth.js"></script>
</HEAD>
<BODY>
	<DIV ID="LG01" CLASS=MAIN ALIGN="CENTER">
		<efw:Part path="headbeforelogining.jsp" title="azureテスト"/>
	</DIV>
	<script>
		//この関数はauth.jsの前で定義する必要
		function loginApplication(account) {
			Efw("LG01_submit",account);
		}
		//bodyロード時もしlogoutパラメータが設定される場合、ログアウトする
		<%
			if ("true".equals(request.getParameter("logout"))){
				out.println("signOut();");
			}else{
				out.println("signIn('loginPopup');");
			}
		%>
	</script>
</BODY>
</HTML>
