<H1>Record.length</H1>

The length attribute is established to get length of the array.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var len = record.length;
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Record . length</td><td>Number</td></tr>
</table>


