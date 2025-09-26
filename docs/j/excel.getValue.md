# Excel.getValue

`getValue`関数は、セルから値を取得するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
var v1 = excel.getValue("Sheet1", "A1");
var v2 = excel.getValue("Sheet1", "B2", "yyyy/MM/dd");
var v3 = excel.getValue("Sheet1", "C3", "#,##0.0", "HALF_EVEN");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. getValue ( sheetName, position )` | `String` \| `Number` \| `Date` \| `Boolean` |
| `excel. getValue ( sheetName, position, formatter )` | `String` \| `Number` \| `Date` \| `Boolean` |
| `excel. getValue ( sheetName, position, formatter, rounder )` | `String` \| `Number` \| `Date` \| `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `position` | `String` | セルの絶対参照。 |
| [`formatter`](formatter&rounder.md) | `String` | 数値フォーマッタまたは日付フォーマッタ。 |
| [`rounder`](formatter&rounder.md) | `String` | 数値フォーマットの丸め処理。 |