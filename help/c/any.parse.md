# any.parse

`parse` 函数用于将字符串解析为任何值。

`any = { Number | Date | Boolean | String }`

## 示例

```javascript
var nm = Number.parse("12,345.0", "#,000.0");
var nm = Number.parse("一", "{一=1,二=2,三=3}");
var dt = Date.parse("2016/09/08", "yyyy/MM/dd");
// 枚举格式
var dt = Date.parse("25Y", "{25Y=2025-01-01,24Y=2024-01-01}");
var bl = Boolean.parse("YES","{YES=true,NO=false}");
var st = String.parse("一", "{一='1',二='2',三='3'}");
var st = String.parse("一", '{一="1",二="2",三="3"}');
```

## API

| 调用 | 返回值 |
|---|---|
| `any. parse ( value, formatter )` | `String` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `value` | `String` | 数字或日期的字符串值。 |
| `formatter` | `String` | 数字格式化器或日期格式化器 |

### 数字格式化器

|  |  |
|---|---|
| `0` |  |
| `#` |  |
| `,` |  |
| `.` |  |
| `%` |  |

### 日期格式化器

|  |  |
|---|---|
| `GGGGy` | 日本和历，2016 -- 平成28 |
| `Gy` | 日本和历，2016 -- H28 |
| `yyyy` |  |
| `yy` |  |
| `MM` |  |
| `M` |  |
| `dd` |  |
| `d` |  |
| `HH` |  |
| `H` |  |
| `mm` |  |
| `m` |  |
| `ss` |  |
| `s` |  |
| `SSS` |  |
| `S` |  |