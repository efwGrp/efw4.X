<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>excel テスト</title>
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
<button onclick="Efw('helloExcel_submit',{mode:'sheet'})">シート操作</button>
<button onclick="Efw('helloExcel_submit',{mode:'rowcol'})">行列操作</button>
<button onclick="Efw('helloExcel_submit',{mode:'data'})">データ操作</button>
<button onclick="Efw('helloExcel_submit',{mode:'shape'})">図形操作</button>
<button onclick="Efw('helloExcel_submit',{mode:'formula'})">計算式</button>
</BODY>
</HTML>
