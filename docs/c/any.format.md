# any.format

`format` 函数用于将任何值格式化为字符串。

`any = { Number | Date | Boolean | String }`

## 示例

```javascript
(12345).format("#,000.0");
(new Date()).format("yyyy/MM/dd");
// 枚举格式
true.format("{YES=true,NO=false}");
"ONE".format("{一=ONE,二=TWO,三=THREE}");
"1".format("{一=1,二=2,三=3}");
"1".format("{一='1',二='2',三='3'}");
"1".format('{一="1",二="2",三="3"}');
var a=1;a.format("{一=1,二=2,三=3}");
new Date("2025-01-01").format("{25Y=2025-01-01,24Y=2024-01-01}");
```

## API

| 调用 | 返回值 |
|---|---|
| `any. format ( formatter )` | `String` |
| `any. format ( formatter, rounder )` | `String` |

| 参数 | 类型 | 描述 |
|---|---|---|
| [`formatter`](formatter&rounder.md) | `String` | 数字格式化器或日期格式化器。 |
| [`rounder`](formatter&rounder.md) | `String` | 数字格式的舍入器。 |