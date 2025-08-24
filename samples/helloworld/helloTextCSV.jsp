<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>test Text CSV</title>
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
※Run1はBinaryReaderの例です。<br>
Run2はCSVReaderの例です。<br>
<br>
例１、各種制限を考慮せず無邪気な例 <button onclick="Efw('helloTextCSV_submit',{mode:'1'})">Run1</button> <button onclick="Efw('helloTextCSV_submit2',{mode:'1'})">Run2</button><br>
例２、１件ずつ処理の慎重派の例 <button onclick="Efw('helloTextCSV_submit',{mode:'2'})">Run1</button> <button onclick="Efw('helloTextCSV_submit2',{mode:'2'})">Run2</button><br>
例３、ロット別でIOを分ける例 <button onclick="Efw('helloTextCSV_submit',{mode:'3'})">Run1</button> <button onclick="Efw('helloTextCSV_submit2',{mode:'3'})">Run2</button><br>
例４、ライターの使いまわし例 <button onclick="Efw('helloTextCSV_submit',{mode:'4'})">Run1</button> <button onclick="Efw('helloTextCSV_submit2',{mode:'4'})">Run2</button><br>
例５、バッファーの配列をID別に分ける例 <button onclick="Efw('helloTextCSV_submit',{mode:'5'})">Run1</button> <button onclick="Efw('helloTextCSV_submit2',{mode:'5'})">Run2</button><br>
<br>
<efw:elfinder id="elfinder1" home="text&csv"/>
</BODY>
</HTML>
