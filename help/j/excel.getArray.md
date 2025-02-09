# Excel.getArray

`getArray`関数は、単一のシートから複数のフィールドを配列として取得するために使用されます。

## サンプル

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

| 呼び出し | 戻り値 |
|---|---|
| `excel. getArray ( sheetName, startRow, endCondition, positionRowMaps )` | `Array` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `startRow` | `Number` | シートのループを開始する行。1から始まります。 |
| `endCondition` | `Number` または `Function` | シートのループ終了条件。数値または関数のいずれかです。1から始まります。<br> ```function (row) {return true;}``` |
| `positionRowMaps` | `Object` または `Array` | `Object`: 行からデータを取得するためのマップ。<br> `Array`: 複数の行からデータを取得するためのマップ。 |

`positionRowMaps`のサンプル。

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
