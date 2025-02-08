# any.format

`format`関数は、任意の値をString型にフォーマットするために提供されています。

`any = { Number | Date | Boolean | String }`

## サンプル

```javascript
(12345).format("#,000.0");
(new Date()).format("yyyy/MM/dd");
// 列挙型フォーマット
true.format("{YES=true,NO=false}");
"ONE".format("{一=ONE,二=TWO,三=THREE}");
"1".format("{一=1,二=2,三=3}");
"1".format("{一='1',二='2',三='3'}");
"1".format('{一="1",二="2",三="3"}');
var a=1;a.format("{一=1,二=2,三=3}");
new Date("2025-01-01").format("{25Y=2025-01-01,24Y=2024-01-01}");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `any. format ( formatter )` | `String` |
| `any. format ( formatter, rounder )` | `String` |

| パラメータ | 型 | 説明 |
|---|---|---|
| [`formatter`](formatter&rounder.md) | `String` | 数値フォーマッタまたは日付フォーマッタ。 |
| [`rounder`](formatter&rounder.md) | `String` | 数値フォーマットの丸め処理。 |