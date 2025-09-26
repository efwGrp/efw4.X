# Record.length

`length` 属性返回 `Record` 中对象的数量（行数）。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var len = record.length;
```

## API

| 调用 | 返回值 |
|---|---|
| `record. length` | `Number` |
