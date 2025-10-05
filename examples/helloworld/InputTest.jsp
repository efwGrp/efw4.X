<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw Input Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp"/>
	<style>
		button{
			font-size:30px;
			font-weight:bold;
		}
		span{
			margin-left:200px;
		}
		#divParams{
			position:absolute;
			top:250px;
			right:50px;
			width:500px;
			height:700px;
			border:1px solid black;
			background-color:white;
			font-size:20px;
		}
	</style>
</HEAD>
<BODY>
<textarea id="divParams" style=""></textarea>
<h1>各種類の入力枠を<button type="button" onclick="Efw('InputTest_submit')">一括テスト</button></h1>
<h3>html5 input type</h3>
<fieldset>
1	<input id="item1" value="I am input"> <span id="spnItem1"></span><br>
2	I am hidden<input id="item2" type="hidden" value="I am hiden"> <span id="spnItem2"></span><br>
3	<input id="item3" type="text" value="I am text"> <span id="spnItem3"></span><br>
4	<input id="item4" type="search" value="I am search"> <span id="spnItem4"></span><br>
5	<input id="item5" type="tel" value="03-000-0000"> <span id="spnItem5"></span><br>
6	<input id="item6" type="url" value="htttps://I.am.url.jp"> <span id="spnItem6"></span><br>
7	<input id="item7" type="email" value="i@am.url.jp"> <span id="spnItem7"></span><br>
8	<input id="item8" type="password" value="I am password"> <span id="spnItem8"></span><br>
9	<input id="item9" type="datetime" value="2023/06/21 10:23:00"> <span id="spnItem9"></span><br>
10	<input id="item10" type="date" value="2023-06-21"> <span id="spnItem10"></span><br>
11	<input id="item11" type="month" value="2023-06"> <span id="spnItem11"></span><br>
12	<input id="item12" type="week" value="2023-W25"> <span id="spnItem12"></span><br>
13	<input id="item13" type="time" value="12:00"> <span id="spnItem13"></span><br>
14	<input id="item14" type="datetime-local" value="2023-06-21 12:00:00"> <span id="spnItem14"></span><br>
15	<input id="item15" type="number" value="1234567890"> <span id="spnItem15"></span><br>
16	<input id="item16" type="range" value="50"> <span id="spnItem16"></span><br>
17	<input id="item17" type="color" value="#FF0000"> <span id="spnItem17"></span><br>
18	<input id="item18" type="checkbox" value="1" checked> <span id="spnItem18"></span><br>
19	<input id="item19_1" name="item19" type="radio" value="1" checked><input id="item19_2" name="item19" type="radio" value="2"> <span id="spnItem19"></span><br>
</fieldset>
<h3>その他の入力用タグ</h3>
<fieldset>
20	<select id="item20">
		<option value=""></option>
		<option value="I am option 1" selected>option 1</option>
		<option value="I am option 2">option 2</option>
	</select> <span id="spnItem20"></span><br>
21	<select id="item21" size=3 multiple>
		<option value="I am option 1" selected>option 1</option>
		<option value="I am option 2" selected>option 2</option>
	</select> <span id="spnItem21"></span><br>
22	<textarea id="item22">I am text area</textarea> <span id="spnItem22"></span><br>
</fieldset>
<h3>efw data-format</h3>
<fieldset>
23	<input id="item23" data-format="#,##0.00" style="text-align:right" value="1,234.56"> <span id="spnItem23"></span><br>
24	<input id="item24" data-format="yyyy/MM/dd HH:mm:ss" value="2023/12/12 12:00:00"> <span id="spnItem24"></span><br>
25	<input id="item25" data-format="yyyy/MM/dd" value="2023/12/12"> <span id="spnItem25"></span><br>
26	<input id="item26" data-format="yyyy/MM" value="2023/12"> <span id="spnItem26"></span><br>
</fieldset>

</BODY>
</HTML>
