<H1>Record.makeAllKeysLowerCase</H1>

The makeAllKeysLowerCase function is established to change all keys of  the array data to lower-case.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysLowerCase();
/* the data is changed to the next
[
	{"data1":"hello world", "data2":123, "data3":"..." },
	{"data1":"hello human", "data2":456, "data3":"..." }
]
*/

```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>record .makeAllKeysLowerCase ( )</td><td>Record</td></tr>
</table>
