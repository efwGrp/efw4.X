<H1>new Record</H1>

The constructor function is established to create a record object.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>new Record ( array )</td><td>Record</td></tr>
</table>


<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>array</td><td>Array</td><td>The array data.</td></tr>
</table>

