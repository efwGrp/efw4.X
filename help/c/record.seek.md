# Record.seek

`seek` 函数用于在数组中搜索。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.seek("data2","eq",123);
```

## API

| 调用 | 返回值 |
|---|---|
| `record. seek ( field, action, value )` | `Record` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `field` | `String` | 字段名。 |
| `action` | `String` | 比较操作：`eq`（等于）、`gt`（大于）、`lt`（小于）、`like`（包含）、`!eq`（不等于）、`!gt`（不大于）、`!lt`（不小于）、`!like`（不包含）。 |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` | 要比较的值。 |