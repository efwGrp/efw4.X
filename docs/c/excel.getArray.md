# Excel.getArray

`getArray` 函数用于从单个工作表中检索多个字段作为数组。

## 示例

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

| 调用 | 返回值 |
|---|---|
| `excel. getArray ( sheetName, startRow, endCondition, positionRowMaps )` | `Array` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 在工作表中开始循环的起始行。从 1 开始索引。 |
| `endCondition` | `Number` 或 `Function` | 在工作表中结束循环的结束条件。它可以是一个数字或一个函数。从 1 开始索引。<br> ```function (row) {return true;}``` |
| `positionRowMaps` | `Object` 或 `Array` | `Object`: 从一行获取数据的映射。<br> `Array`: 从多行获取数据的映射。 |

`positionRowMaps` 的示例。

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
