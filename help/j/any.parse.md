# any.parse

`parse`関数は、文字列を任意の値にパースするために提供されています。

`any = { Number | Date | Boolean | String }`

## サンプル

```javascript
var nm = Number.parse("12,345.0", "#,000.0");
var nm = Number.parse("一", "{一=1,二=2,三=3}");
var dt = Date.parse("2016/09/08", "yyyy/MM/dd");
// 列挙型フォーマット
var dt = Date.parse("25Y", "{25Y=2025-01-01,24Y=2024-01-01}");
var bl = Boolean.parse("YES","{YES=true,NO=false}");
var st = String.parse("一", "{一='1',二='2',三='3'}");
var st = String.parse("一", '{一="1",二="2",三="3"}');
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `any. parse ( value, formatter )` | `String` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `value` | `String` | 数値または日付の文字列値。 |
| `formatter` | `String` | 数値フォーマッタまたは日付フォーマッタ。 |

### 数値フォーマッタ

|  |  |
|---|---|
| `0` |  |
| `#` |  |
| `,` |  |
| `.` |  |
| `%` |  |

### 日付フォーマッタ

|  |  |
|---|---|
| `GGGGy` | 和暦 (例: 平成28年) |
| `Gy` | 和暦 (例: H28) |
| `yyyy` | 年 (4桁) |
| `yy` | 年 (2桁) |
| `MM` | 月 (2桁) |
| `M` | 月 (1桁) |
| `dd` | 日 (2桁) |
| `d` | 日 (1桁) |
| `HH` | 時 (24時間表記) |
| `H` | 時 (24時間表記) |
| `mm` | 分 (2桁) |
| `m` | 分 (1桁) |
| `ss` | 秒 (2桁) |
| `s` | 秒 (1桁) |
| `SSS` | ミリ秒 (3桁) |
| `S` | ミリ秒 (1桁) |