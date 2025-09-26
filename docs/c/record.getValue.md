# Record.getValue

`getValue` 函数从 `Record` 中第一个对象检索字段值。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var value = record.getValue("data1");
```

## API

| 调用 | 返回值 |
|---|---|
| `record. getValue ( field )` | `String` \| `Number` \| `Date` \| `Boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `field` | `String` | 字段名。 |
