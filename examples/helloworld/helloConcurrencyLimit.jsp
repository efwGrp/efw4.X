<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>event 同時実行制限テスト</title>
	<efw:Client lang="jp" nopromise="true"/>
</HEAD>
<BODY>
<h1>同時実行制限テスト</h1>
<button onclick="Efw('helloConcurrencyLimit_test')">同時１人、２人めからワーニング</button>
<button onclick="Efw('helloConcurrencyLimit_test2')">同時１人、２人めからカウントダウン</button>
<br>
<h1>内部機能lockerのテスト</h1>
<p>３つのブラザー画面で操作して、１０秒間隔ずつ実行される効果です。</p>
<button onclick="Efw('helloConcurrencyLimit_test3')">lockerのテスト</button>
</BODY>
</HTML>
