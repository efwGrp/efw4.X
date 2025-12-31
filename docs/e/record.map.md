# Record.map

The `map` function transforms the format of the array data within a `Record` object.

## Sample

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

## API

| Calling | Returning |
|---|---|
| `record. map ( mapping )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `mapping` | `Object` | The mapping between the new and existing fields. <br> See also: [formatter&rounder](formatter&rounder.md). |

The sample for `mapping`.

```javascript
{
    newField1: oldField1,
    newField2: [oldField2, "#,##0.0", "HALF_EVEN"], // formatter, rounder
    newField3: function(data){return String|Number|Date|Boolean;}
}
```