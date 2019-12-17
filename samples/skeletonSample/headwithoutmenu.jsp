<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS=HEADER>
	<TABLE>
		<TR>
			<TD ONCLICK="window.location='LG02.jsp'"></TD>
			<TD><%= request.getAttribute("title") %></TD>
			<TD><%= request.getSession().getAttribute("USER_NM") %> 様&nbsp;&nbsp;</TD>
			<TD>
				<%if (!"代理店支援ボット　自動車保有データ抽出".equals(request.getAttribute("title"))
				&&!"代理店支援ボット　火災保有データ抽出".equals(request.getAttribute("title"))){%>
				<A TABINDEX="-1" href="#" onclick="Efw('head_logout')">ログアウト</A>
				<%}%>
			</TD>
			
		</TR>
	</TABLE>
</DIV>
