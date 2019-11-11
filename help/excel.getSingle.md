<H1>Excel.getSingle</H1>

The getSingle function is established to get several fields as an object from one sheet.

<h2>Sample</h2>
<pre>
	var excel = new Excel("test.xlsx");
	var ary = excel.getSingle("Sheet1", 
		{	"data1":"A1", 
			"data2":["B2","#,##0.0","HALF_EVEN"], 
			"data3":["C3","yyyy/MM/dd"], 
			"data4":
			function(){
				return excel.getValue("Sheet1","D4")+excel.getValue("Sheet1","E5");
			}
		}
	);
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Excel . getSingle ( sheetName , positionMap )</td><td>Object</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>sheetName</td><td>String</td><td>The sheet name.</td></tr>
<tr><td>positionRowMap</td><td>Object</td><td>
The map for getting data from a row.<br>
<pre>
	{	data1:position, 
		data2:[position, <a href="formatter&rounder.md">formatter</a>, <a href="formatter&rounder.md">rounder</a>], 
		data3:function(){ return String|Number|Date|Boolean;} 
	}
</pre>
</td></tr>

</table>

