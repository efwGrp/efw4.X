# Excel.isEncircled

`isEncircled`関数は、点がシェイプで囲まれているかどうかを判定するために使用されます。この関数は、XSSF (xlsx, xlsm) ファイルでのみ使用可能です。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
var tf1 = excel.isEncircled("Sheet1", "A1");
var tf2 = excel.isEncircled("Sheet1", "B2", 0.25, 0.5);
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. isEncircled ( sheetName, position )` | `Boolean` |
| `excel. isEncircled ( sheetName, position, checkpointXRate, checkpointYRate )` | `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | セルの絶対参照。 |
| `checkpointXRate` | `Number` | シェイプの中心点のx座標のセル幅に対する割合。デフォルトは0.5。 |
| `checkpointYRate` | `Number` | シェイプの中心点のy座標のセル高さに対する割合。デフォルトは0.5。 |
