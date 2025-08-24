<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS=HEADER>
	<TABLE class="ui-widget-header">
	<TR>
		<TD ONCLICK="window.location='LG02.jsp'"></TD>
		<TD><%= request.getAttribute("title") %></TD>
		<TD>
			<i class="bi bi-person-circle" > <%= request.getSession().getAttribute("USER_NM") %> 様&nbsp;&nbsp;</i>
			<i class="bi bi-box-arrow-right" title="ログアウト" onclick="Efw('head_logout')"> </i>
		</TD>
	</TR>
	</TABLE>
</DIV>
