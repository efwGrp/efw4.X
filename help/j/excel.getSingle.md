# Excel.getSingle

`getSingle`関数は、単一のシートから複数のフィールドをオブジェクトとして取得するために使用されます。

## サンプル

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

| 呼び出し | 戻り値 |
|---|---|
| `excel. getSingle ( sheetName, positionMap )` | `Object` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `positionRowMap` | `Object` | 行からデータを取得するためのマップ。[formatter&rounder](formatter&rounder.md)について。 |

positionRowMapのサンプル。

```javascript
{
    data1: position,
    newField2: [oldField2, "#,##0.0", "HALF_EVEN"], //formatter, rounder
    data3: function(){ return String|Number|Date|Boolean;}
}
```