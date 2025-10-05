<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>db テスト</title>
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
デフォルトDBコネクションプールを利用する<br>
<button onclick="Efw('helloDB_submit',{mode:'create'})">テーブルを作成する</button>
<button onclick="Efw('helloDB_submit',{mode:'insert'})">１行データを挿入する</button>
<button onclick="Efw('helloDB_submit',{mode:'update'})">そのデータを更新する</button>
<button onclick="Efw('helloDB_submit',{mode:'delete'})">そのデータを削除する</button>
<button onclick="Efw('helloDB_submit',{mode:'drop'})">テーブルを削除する</button><br>
もう一つのDBコネクションプールを利用する<br>
<button onclick="Efw('helloDB_submit2',{mode:'create'})">テーブルを作成する</button>
<button onclick="Efw('helloDB_submit2',{mode:'insert'})">１行データを挿入する</button>
<button onclick="Efw('helloDB_submit2',{mode:'update'})">そのデータを更新する</button>
<button onclick="Efw('helloDB_submit2',{mode:'delete'})">そのデータを削除する</button>
<button onclick="Efw('helloDB_submit2',{mode:'drop'})">テーブルを削除する</button><br>
<br>
<div id="divRet" style="border:1px solid silver;height:400px;width:800px;">
</div>
</BODY>
</HTML>
