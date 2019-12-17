<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS=HEADER>
	<TABLE>
	<TR>
		<TD ONCLICK="window.location='LG02.jsp'"></TD>
		<TD><%= request.getAttribute("title") %></TD>
		<TD><%=request.getSession().getAttribute("USER_NM") %> 様&nbsp;&nbsp;</TD>
		<TD>
			<A TABINDEX="-1" href="#" onclick="Efw('head_logout')">ログアウト</A>
		</TD>
	</TR>
	</TABLE>
</DIV>

<DIV CLASS=HEADER-MENU>
	<TABLE>
		<TR>
			<TD><A TABINDEX="-1" HREF="LG02.jsp">メニューへ</A></TD>
		</TR>
	</TABLE>
</DIV>
