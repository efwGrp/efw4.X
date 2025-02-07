# Excel.getArray

The `getArray` function is used to retrieve multiple fields as an array from a single sheet.

## Sample

```javascript
var excel = new Excel("test.xlsx");
var ary1 = excel.getArray("Sheet1", 1, 3, 
	{
		"data1":"A", 
		"data2":"B", 
		"data3":"C"
	});
var ary2 = excel.getArray("Sheet1", 1, 
	function(row){
		if (excel.getValue("Sheet1","A"+row)!=""){
			return false;
		}else{
			return true;
		}
	}
, {
	"data1":"A", 
	"data2":["B","#,##0.0","HALF_EVEN"], 
	"data3":["C","yyyy/MM/dd"], 
	"data4":
		function(row){
			return excel.getValue("Sheet1","D"+row)+excel.getValue("Sheet1","E"+row);
		}
});
var ary3 = excel.getArray{"Sheet1", 1, 4,[{"data1":"A"},{"data2":"A"}]};
```

## API

| Calling | Returning |
|---|---|
| `Excel.getArray(sheetName, startRow, endCondition, positionRowMaps)` | `Array` |

| Parameters | Type | Description |
|---|---|---|
| `sheetName` | `String` | The sheet name. |
| `startRow` | `Number` | The start row for looping at the sheet. Indexed from 1. |
| `endCondition` | `Number` or `Function` | The end condition for looping at the sheet. It can be a number or a function. Indexed from 1. <br> ```function ( row ) {return true;} ``` |
| `positionRowMaps` | `Object` or `Array` | `Object`: The map for getting data from a row. <br> `Array`: The maps for getting data from several rows.  |

The samples for `positionRowMaps`.

```javascript
{
	data1: col, 
	data2: [col, formatter, rounder], 
	data3: function(row){ return String|Number|Date|Boolean;} 
} 

[
	{ 
		data1: col, 
		data2: [col, formatter, rounder], 
		data3: function(row){ return String|Number|Date|Boolean;} 
	}, 
	{...} 
] 
```
