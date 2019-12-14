<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client mode="jquery-ui" theme="blitzer"/>
</HEAD>
<BODY>
	<efw:part path="dialogJQueryUI.jsp"/>
	<button onclick="dialogJQueryUI.p1='hello world! '+new Date();dialogJQueryUI.dialog('open')">open dialog</button>
</BODY>
</HTML>
