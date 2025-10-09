<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>mail テスト</title>
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
TO:<input type="text" id="txtTo"><br>
CC:<input type="text" id="txtCC"><br>
BCC:<input type="text" id="txtBCC"><br>
開封確認:<input type="text" id="txtMDN"><br>
発信者:<input type="text" id="txtFrom"><br>
名称:<input type="text" id="txtName"><br>
重要度:	<select id="selImportance">
			<option value="High">高
			<option value="Normal">中
			<option value="Low">低
		</select><br>
バックエンド送信:<input type=checkbox value="1" id="chkInBackground"><br>
<button onclick="Efw('helloMail_submit')">メール送信</button><br>
<br>
</BODY>
</HTML>
