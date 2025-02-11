# Excel.getSingle

`getSingle` 函数用于从单个工作表中检索多个字段作为对象。

## 示例

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

| 调用 | 返回值 |
|---|---|
| `excel. getSingle ( sheetName, positionMap )` | `Object` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `positionRowMap` | `Object` | 从行获取数据的映射。关于 [formatter&rounder](formatter&rounder.md)。 |

`positionRowMap` 的示例。

```javascript 
{
	data1: position, 
	newField2: [oldField2, "#,##0.0", "HALF_EVEN"], //formatter, rounder 
	data3: function(){ return String|Number|Date|Boolean;} 
}
```