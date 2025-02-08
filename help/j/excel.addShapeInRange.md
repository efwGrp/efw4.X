# Excel.addShapeInRange

`addShapeInRange`関数は、テンプレートシートからシェイプをコピーし、セルの範囲を囲むように配置することで、シェイプを作成するために使用されます。この関数は、XSSF (xlsx, xlsm) ファイルでのみ機能します。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text",20,20,40,40);	// テンプレートシートのシェイプをコピーして線のようなシェイプを作成する場合
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName )` | `Excel` |
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text )` | `Excel` |
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text, x1, y1, x2, y2 )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `firstCellPosition` | `String` | 最初のセルの絶対参照 (例: "A1")。 |
| `lastCellPosition` | `String` | 最後のセルの絶対参照 (例: "B2")。 |
| `templateSheetName` | `String` | テンプレートシート名。 |
| `templateShapeName` | `String` | コピーするシェイプの名前。 |
| `text` | `String` | 作成されたシェイプのテキスト値。 |
| `x1` | `Number` | 最初のセル内のx座標。 |
| `y1` | `Number` | 最初のセル内のy座標。 |
| `x2` | `Number` | 最後のセル内のx座標。 |
| `y2` | `Number` | 最後のセル内のy座標。 |