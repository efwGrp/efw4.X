<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw Upload Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
<h1>単独ファイルアップロード</h1>
<input type=file id="file1" accept=".xlsx">
<button onclick="Efw('helloUpload_submit1')">実行</button>
<h1>複数ファイルアップロード</h1>
<input type=file id="fileM" multiple accept=".xlsx">
<button onclick="Efw('helloUpload_submitM')">実行</button>

<div id="divResult">
</div>
</BODY>
</HTML>
