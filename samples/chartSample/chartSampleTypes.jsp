<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
<script>
	function setChar1Options(options){
		$("#char1Options").html(JSON.stringify(options));
	}
	function setChar2Options(options){
		$("#char2Options").html(JSON.stringify(options));
	}
</script>
</HEAD>
<BODY>
	<table><tr>
	<td rowspan=2 style="vertical-align:top">
		<table border=1 id="chart1_data" data-format="$#,##0" data-legend="bottom">
		<!--table border=1 id="chart1_data" data-format="$#,##0" data-legend="bottom" data-ticks="0,200,400,600,800,1000"-->
			<caption>Chart Caption</caption>
			<tr><th>Row0Col0</th><th>col1</th><th>col2</th><th>col3</th></tr>
			<tr><td>row1</td><td>$1,000</td><td>$700</td><td>$300</td></tr>
			<tr><td>row2</td><td>$900</td><td>$700</td><td>$600</td></tr>
			<tr><td>row3</td><td>$800</td><td>$600</td><td>$500</td></tr>
			<tr><td>row4</td><td>$700</td><td>$500</td><td>$400</td></tr>
			<tr><td>row5</td><td>$1,000</td><td>$800</td><td>$700</td></tr>
		</table>
	</td>
	<td>
		<efw:Chart id="char1" mode="googlechart" data="chart1_data" type="pie" width="400px" height="300px" setoptions="setChar1Options"/>
	</td>
	<td id="char1Options"></td></tr>
	<tr>
	<td>
		<efw:Chart id="char2" mode="chartjs" data="chart1_data" type="pie" width="400px" height="300px" setoptions="setChar2Options"/>
	</td>
	<td id="char2Options"></td></tr></table>
	
	<button onclick="char1.setType('area');char2.setType('area');">area</button>
	<button onclick="char1.setType('bar');char2.setType('bar');">bar</button>
	<button onclick="char1.setType('column');char2.setType('column');">column</button>
	<button onclick="char1.setType('donut');char2.setType('donut');">donut</button>
	<button onclick="char1.setType('line');char2.setType('line');">line</button>
	<button onclick="char1.setType('pie');char2.setType('pie');">pie</button>
	<button onclick="char1.setType('scatter');char2.setType('scatter');">scatter</button>
	<button onclick="char1.setType('stackedarea');char2.setType('stackedarea');">stackedarea</button>
	<button onclick="char1.setType('stackedbar');char2.setType('stackedbar');">stackedbar</button>
	<button onclick="char1.setType('stackedcolumn');char2.setType('stackedcolumn');">stackedcolumn</button>
	<button onclick="char2.setType('radar');">radar</button>
</BODY>
</HTML>
