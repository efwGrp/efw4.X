<H1>Record.map</H1>

The sort function is established to change the array data format.

<h2>Sample</h2>

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);

record.map({
	"A":"data1",
	"B":["data2","#,##0"],
	"C":["data3","yyyy/MM/dd"],
	"D":function(data){
		return data["data1"]+data["data2"]+data["data3"];
	}
});
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>record .map ( mapping )</td><td>Record</td></tr>
</table>

<table>
<tr><th>Parameters</th><th>Type</th><th>Description</th></tr>
<tr><td>mapping</td><td>Object</td><td>The mapping of ToBe and AsIs.

```javascript
{
	newField1:oldField1,
	newField2:[oldField2, <a href="formatter&rounder.md">formatter</a>, <a href="formatter&rounder.md">rounder</a>],
	newField3:function(data){return String|Number|Date|Boolean;}
}
```

</td></tr>
</table>

