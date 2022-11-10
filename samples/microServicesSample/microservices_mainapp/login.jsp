<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>main app login page</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
</HEAD>
<BODY>
<button onclick="Efw('gotonext_asAdmin');">Goto the next page with Loginning as admin.</button><br><br>
<button onclick="Efw('gotonext_asUser');">Goto the next page with Loginning as user.</button><br><br>
<button onclick="Efw('gotonext_asNobody');">Goto the next page without Loginning.</button><br><br>
</BODY>
</HTML>