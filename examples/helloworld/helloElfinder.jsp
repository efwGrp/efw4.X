<%@ page language="java" contentType="text/html; charset=UTF-8"
     pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
	<button onclick="Efw('helloElfinder_testExt')">拡張子とアイコンの確認</button>
	ボタンを押した後、test_extフォルダを開いてください。<br><br>
	<efw:elFinder home="" id="helloElfinder1" saveLogFunc="savelogfunc"/>
</BODY>
</HTML>