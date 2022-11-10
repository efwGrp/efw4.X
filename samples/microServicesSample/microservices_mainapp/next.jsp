<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>main app test page</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
</HEAD>
<BODY>
Who am I?<hr>
<%
String userid=(String)session.getAttribute("USER_ID");
String usernm=(String)session.getAttribute("USER_NM");
String userauth=(String)session.getAttribute("USER_AUTH");
%>
USER_ID:<%=userid%><br>
USER_NM:<%=usernm%><br>
USER_AUTH:<%=userauth%><br>
<hr>
The remote parts from microservices_subapp.<hr>
The part out of login check.<br>
<efw:part path="part1.jsp" appurl="prop:sub1.appurl" shareSessions="USER_ID,USER_NM,USER_AUTH" />
<hr>
The part with login check.<br>
<efw:part path="part2.jsp" appurl="prop:sub1.appurl" shareSessions="USER_ID,USER_NM,USER_AUTH" />
<hr>
The part for admin only.<br>
<efw:part path="part3.jsp" appurl="prop:sub1.appurl" shareSessions="USER_ID,USER_NM,USER_AUTH" />
<efw:part path="partelfinder.jsp" appurl="prop:sub1.appurl" shareSessions="USER_ID,USER_NM,USER_AUTH" />
<hr>

</BODY>
</HTML>