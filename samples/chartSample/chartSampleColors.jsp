<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
</HEAD>
<BODY>
	<table><tr>
	<td rowspan=2 style="vertical-align:top">
		<table border=1 id="chart1_data" data-format="$#,##0" data-legend="bottom">
			<caption>Chart Caption</caption>
			<tr><th>Row0Col0</th><th data-color="coral" style="background-color:coral">col1</th><th data-color="red" style="background-color:red">col2</th><th  data-color="deeppink" style="background-color:deeppink">col3</th></tr>
			<tr><td data-color="darkcyan" style="background-color:darkcyan">row1</td><td>$1,000</td><td>$700</td><td>$300</td></tr>
			<tr><td data-color="darkgreen" style="background-color:darkgreen">row2</td><td>$900</td><td>$700</td><td>$600</td></tr>
			<tr><td data-color="seagreen" style="background-color:seagreen">row3</td><td>$800</td><td>$600</td><td>$500</td></tr>
			<tr><td data-color="darkseagreen" style="background-color:darkseagreen">row4</td><td>$700</td><td>$500</td><td>$400</td></tr>
			<tr><td data-color="lightgreen" style="background-color:lightgreen">row5</td><td>$1,000</td><td>$800</td><td>$700</td></tr>
		</table>
	</td>
	<td>
		<efw:Chart id="char1" mode="googlechart" data="chart1_data" type="column" width="400px" height="300px"/>
	</td>
	<td>
		<efw:Chart id="char2" mode="googlechart" data="chart1_data" type="pie" width="400px" height="300px"/>
	</td></tr></table>
	
</BODY>
</HTML>
