# Date.getYears

`getYears` 函数用于获取指定日期与当前时间之间的年数。

## 示例

```javascript
var date = Date.parse("1980/01/01","yyyy/MM/dd");
var years = date.getYears();
```

## API

| 调用 | 返回值 |
|---|---|
| `date. getYears ( )` | `Number` |
| `date. getYears ( current )` | `Number` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `current` | `Date` | 用作当前日期的日期。 |
