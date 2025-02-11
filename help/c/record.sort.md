# Record.sort

`sort` 函数对 `Record` 对象中的数组进行排序。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.sort("data2","asc");
```

## API

| 调用 | 返回值 |
|---|---|
| `record. sort ( field, action )` | `Record` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `field` | `String` | 字段名。 |
| `action` | `String` | `asc` 或 `desc`。排序方向。 |