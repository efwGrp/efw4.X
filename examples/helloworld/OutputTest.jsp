<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw Output Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp"/>
	<style>
		button{
			font-size:30px;
			font-weight:bold;
		}
	</style>
</HEAD>
<BODY>
<h1>各種類の入力枠を<button type="button" onclick="Efw('OutputTest_display')">一括表示</button></h1>
<table><tr><td style="vertical-align:top">
<h3>html5 input type</h3>
<fieldset style="width:220px">
1	<input id="item1"><br>
2	I am hidden<input id="item2" type="hidden"><br>
3	<input id="item3" type="text"><br>
4	<input id="item4" type="search"><br>
5	<input id="item5" type="tel"><br>
6	<input id="item6" type="url"><br>
7	<input id="item7" type="email"><br>
8	<input id="item8" type="password"><br>
9	<input id="item9" type="datetime"><br>
10	<input id="item10" type="date"><br>
11	<input id="item11" type="month"><br>
12	<input id="item12" type="week"><br>
13	<input id="item13" type="time"><br>
14	<input id="item14" type="datetime-local"><br>
15	<input id="item15" type="number"><br>
16	<input id="item16" type="range"><br>
17	<input id="item17" type="color"><br>
18	<input id="item18" type="checkbox" value="1"><br>
19	<input id="item19_1" name="item19" type="radio" value="1"><input id="item19_2" name="item19" type="radio" value="2"><br>
</fieldset>
</td><td style="vertical-align:top">
<h3>その他の入力用タグ</h3>
<fieldset style="width:200px">
20	<select id="item20">
	</select><br>
21	<select id="item21" size=3 multiple>
	</select><br>
22	<textarea id="item22"></textarea><br>
</fieldset>
</td><td style="vertical-align:top">
<h3>table</h3>
<fieldset style="width:200px">
	<table id="item23" border=1>
		<tr><th>head1</th><th>head2</th><th>head3</th></tr>
	</table>
</fieldset>
</td><td style="vertical-align:top">
<h3>表示値</h3>
<textarea id="txtOptions" style="width:400px;height:50px;font-size:15px;">
[{"value":"","text":""},
{"value":"I am option 1","text":"option 1"},
{"value":"I am option 2","text":"option 2"}]</textarea>
<textarea id="txtTables" style="width:400px;height:50px;font-size:15px;">
[{"fd1":"data1-1","fd2":"data1-2","fd3":"data1-3"},
{"fd1":"data2-1","fd2":"data2-2","fd3":"data2-3"},
{"fd1":"data3-1","fd2":"data3-2","fd3":"data3-3"}]</textarea>
</textarea>
<textarea id="txtValues" style="width:400px;height:350px;font-size:15px;">
{"#item1":"I am input",
"#item2":"I am hidden",
"#item3":"I am text",
"#item4":"I am search",
"#item5":"03-000-0000",
"#item6":"htttps://I.am.url.jp",
"#item7":"i@am.url.jp",
"#item8":"I am password",
"#item9":"2023/06/21 10:23:00",
"#item10":"2023-06-21",
"#item11":"2023-06",
"#item12":"2023-W25",
"#item13":"12:00",
"#item14":"2023-06-21T12:00",
"#item15":"1234567890",
"#item16":"100",
"#item17":"#ff0000",
"#item18":"1",
"[name=item19]":"1",
"#item20":"I am option 1",
"#item21":"I am option 1,I am option 2",
"#item22":"I am text area"
}</textarea>

</td></tr></table>
</BODY>
</HTML>
