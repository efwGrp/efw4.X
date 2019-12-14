<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client mode="bootstrap"/>
</HEAD>
<BODY>
	<efw:part path="dialogBootstrap.jsp"/>
	<button onclick="dialogBootstrap.p1='hello world! '+new Date();dialogBootstrap.modal();">open dialog</button>
</BODY>
</HTML>
