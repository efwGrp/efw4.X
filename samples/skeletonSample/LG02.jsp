<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
	<TITLE>メインメニュー</TITLE>
	<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
	<LINK REL=STYLESHEET TYPE=TEXT/CSS HREF="css/style.css">
	<efw:Client theme="mytheme" lang="jp"/>
</HEAD>
<SCRIPT>
</SCRIPT>
<BODY>
	<DIV ID="LG02" CLASS=MAIN>
		<efw:Part path="headwithoutmenu.jsp" title="EFW DEMO　メインメニュー" />
		
		<DIV STYLE="PADDING-LEFT:120PX;">
			<BR>
			<BR>
			<DIV STYLE="FLOAT:LEFT;MARGIN-RIGHT:20PX">
				<FIELDSET STYLE="TEXT-ALIGN: LEFT;" CLASS="BORDER-GRAY">
					<LEGEND CLASS=MENU-GROUP>保険業務</LEGEND>
					<TABLE STYLE="WIDTH: 305PX;MARGIN:10PX;">
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">契約管理</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">収納管理</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">事故管理</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">支払管理</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">再保険管理</TD>
						</TR>
					</TABLE>
				</FIELDSET><br>
			</DIV>

			
			<DIV STYLE="FLOAT:LEFT;MARGIN-RIGHT:20PX">
				<FIELDSET STYLE="TEXT-ALIGN: LEFT;" CLASS="BORDER-GRAY">
					<LEGEND CLASS=MENU-GROUP>帳票出力</LEGEND>
					<TABLE STYLE="WIDTH: 305PX;MARGIN:10PX;">
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">＃＃＃＃＃</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">＃＃＃＃＃</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">＃＃＃＃＃</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">＃＃＃＃＃</TD>
						</TR>
					</TABLE>
				</FIELDSET><BR>
			</DIV>

			<DIV STYLE="FLOAT:LEFT;MARGIN-RIGHT:20PX">
				<FIELDSET STYLE="TEXT-ALIGN: LEFT;" CLASS="BORDER-GRAY">
					<LEGEND CLASS=MENU-GROUP>管理者機能</LEGEND>
					<TABLE STYLE="WIDTH: 305PX;MARGIN:10PX;">
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="Efw('LG02_goto',{'page':'MST01.jsp'})" style="color:yellow">ユーザ管理</TD>
						</TR>
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">会社情報登録</TD>
						</TR>
					</TABLE>
				</FIELDSET><BR>
				<FIELDSET STYLE="TEXT-ALIGN: LEFT;" CLASS="BORDER-GRAY">
					<LEGEND CLASS=MENU-GROUP>システム設定</LEGEND>
					<TABLE STYLE="WIDTH: 305PX;MARGIN:10PX;">
						<TR>
							<TD CLASS=MENU-BUTTON
								ONCLICK="">商品管理</TD>
						</TR>
					</TABLE>
				</FIELDSET>
			</DIV>
		</DIV>

		<DIV CLASS="FOOTER" STYLE="text-align:center">
		<P ID="copyright">&copy;エスコ・ジャパン株式会社</P>
		</DIV>
	</DIV>
</BODY>
</HTML>
