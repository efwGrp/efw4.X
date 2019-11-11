<H1>Record.getArray</H1>

The getArray function is established to get the array data from the record.

<h2>Sample</h2>
<pre>
	var record = new Record([
		{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
		{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
	]);
	var array = record.getArray();
</pre>

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Record . getArray ( )</td><td>Array</td></tr>
</table>


