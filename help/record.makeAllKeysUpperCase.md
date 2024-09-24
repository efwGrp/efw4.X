<H1>Record.makeAllKeysUpperCase</H1>

The makeAllKeysUpperCase function is established to change all keys of  the array data to upper-case.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysUpperCase();
/* the data is changed to the next
[
	{"DATA1":"hello world", "DATA2":123, "DATA3":"..." },
	{"DATA1":"hello human", "DATA2":456, "DATA3":"..." }
]
*/

```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>record .makeAllKeysUpperCase ( )</td><td>Record</td></tr>
</table>
