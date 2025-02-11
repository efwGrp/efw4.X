# Record.getSingle

`getSingle` 函数从 `Record` 中检索第一个对象（而不是字段）。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var data = record.getSingle();
```

## API

| 调用 | 返回值 |
|---|---|
| `record. getSingle ( )` | `Object` |