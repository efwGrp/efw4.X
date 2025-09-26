# Excel.addShape

`addShape`関数は、テンプレートシートからシェイプをコピーし、セルを囲むように配置することで、シェイプを作成するために使用されます。この関数は、XSSF (xlsx, xlsm) ファイルでのみ機能します。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShape("newSheet","A1","templateSheet","shapeName")
.addShape("newSheet","A1","templateSheet","shapeName","text")
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30)
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30,40,40);	// テンプレートシートのシェイプをコピーして線を含まないシェイプを作成する場合
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y, width, height )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | セルの絶対参照 (例: "A1")。 |
| `templateSheetName` | `String` | テンプレートシート名。 |
| `templateShapeName` | `String` | コピーするシェイプの名前。 |
| `text` | `String` | 作成されたシェイプのテキスト値。 |
| `x` | `Number` | セル内の作成されたシェイプのx座標。 |
| `y` | `Number` | セル内の作成されたシェイプのy座標。 |
| `width` | `Number` | 作成されたシェイプの幅。 |
| `height` | `Number` | 作成されたシェイプの高さ。 |