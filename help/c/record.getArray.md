# Record.getArray

`getArray` 函数从 `Record` 对象检索数组数据。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var array = record.getArray();
```

## API

| 调用 | 返回值 |
|---|---|
| `record. getArray ( )` | `Array` |
