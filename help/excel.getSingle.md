# Excel.getSingle

The `getSingle` function is used to retrieve multiple fields as an object from a single sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
var ary = excel.getSingle("Sheet1", 
	{	"data1":"A1", 
		"data2":["B2","#,##0.0","HALF_EVEN"], 
		"data3":["C3","yyyy/MM/dd"], 
		"data4":
		function(){
			return excel.getValue("Sheet1","D4")+excel.getValue("Sheet1","E5");
		}
	}
);
```

## API

| Calling | Returning |
|---|---|
| `Excel.getSingle(sheetName, positionMap)` | `Object` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `positionRowMap` | `Object` | The map for getting data from a row. About [formatter&rounder](formatter&rounder.md).|

The sample for positionRowMap.
```javascript 
{
	data1: position, 
	newField2: [oldField2, "#,##0.0", "HALF_EVEN"], //formatter, rounder 
	data3: function(){ return String|Number|Date|Boolean;} 
}
```