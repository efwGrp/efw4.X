<H1>Record.seek</H1>

The seek function is established to seek in the array.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.seek("data2","eq",123);
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>record .seek ( field , action , value )</td><td>Record</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>field</td><td>String</td><td>The field name of the array.</td></tr>
<tr><td>action</td><td>eq|gt|lt|like|!eq|!gt|!lt|!like</td><td>The comparison action.
eq: equal,
gt: greater than,
lt: less than,
like: contain,
!eq: not equal,
!gt: not greater than,
!let: not less than,
!like: not contain,
</td></tr>
<tr><td>value</td><td>String|Number|Date|Boolean</td><td>The value to compare.</td></tr>
</table>

