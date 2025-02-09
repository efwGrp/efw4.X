# Excel.encircle

`encircle`関数は、セルをコピーして囲むシェイプを作成するために使用されます。XSSF (xlsx, xlsm) ファイルでのみ使用可能です。

## サンプル

```javascript
// サンプルを実行するには、Sheet1に"shape1"という名前のシェイプを配置してください。

var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
// shape1をコピーしてセルA1を囲みます。新しいシェイプはデフォルトで中央に配置され、セルA1の幅と高さの50％になります。
.encircle("newSheet", "A1", "Sheet1", "shape1")
// shape1をコピーしてセルB1を囲みます。新しいシェイプは上部中央に配置され、セルB1の幅と高さの50％になります。
.encircle("newSheet", "B1", "Sheet1", "shape1", 0.25, 0.5 )				
// shape1をコピーしてセルC1を囲みます。新しいシェイプは中央に配置され、セルC1の幅の50％、高さの25％になります。
.encircle("newSheet", "C1", "Sheet1", "shape1", 0.5, 0.5, 0.5, 0.25 );
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName )` | `Excel` |
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate )` | `Excel` |
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | セルの絶対参照。 |
| `templateSheetName` | `String` | テンプレートシート名。 |
| `templateShapeName` | `String` | テンプレートシート内のテンプレートシェイプ名。 |
| `shapeCenterXRate` | `Number` | シェイプの中心点のx座標のセル幅に対する割合。デフォルトは0.5。 |
| `shapeCenterYRate` | `Number` | シェイプの中心点のy座標のセル高さに対する割合。デフォルトは0.5。 |
| `shapeWidthRate` | `Number` | シェイプ幅のセル幅に対する割合。デフォルトは0.5。 |
| `shapeHeightRate` | `Number` | シェイプ高さのセル高さに対する割合。デフォルトは0.5。 |