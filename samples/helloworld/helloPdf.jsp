<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="TEXT/HTML;CHARSET=UTF-8">
	<TITLE>efw Pdf Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp" mode="bootstrap"/>
</HEAD>
<BODY>
<h1>PDFテスト</h1>
<button onclick="Efw('helloPdf_fillFeild')">穴埋め</button>
<button onclick="Efw('helloPdf_html2pdf')">HTMLをPDFに変換する</button>
</BODY>
</HTML>
