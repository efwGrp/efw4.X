<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<div style="background-color:red">
<h1>part1</h1>
<%
String userid=(String)session.getAttribute("USER_ID");
String usernm=(String)session.getAttribute("USER_NM");
String userauth=(String)session.getAttribute("USER_AUTH");
%>
USER_ID:<%=userid%><br>
USER_NM:<%=usernm%><br>
USER_AUTH:<%=userauth%><br>
<button onclick="Efw('part1_test','<efw:prop key="efw.appurl"/>')">try to test part1_event</button>
<button onclick="Efw('part2_test','<efw:prop key="efw.appurl"/>')">try to test part2_event</button>
<button onclick="Efw('part3_test','<efw:prop key="efw.appurl"/>')">try to test part3_event</button>
</div>