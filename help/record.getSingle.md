<H1>Record.getSingle</H1>

The getSingle function is established to get the first object ( not a field ) from the record.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var data = record.getSingle();
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>Record . getSingle ( )</td><td>Object</td></tr>
</table>


