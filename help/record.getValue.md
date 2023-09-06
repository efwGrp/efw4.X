<H1>Record.getValue</H1>

The getValue function is established to get a field value from the first object of the record.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var value = record.getValue("data1");
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Record . getValue ( field )</td><td>String|Number|Date|Boolean</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>field</td><td>String</td><td>The field name of the array.</td></tr>
</table>

