# Record.makeAllKeysUpperCase

`makeAllKeysUpperCase` 函数将数组数据中的所有键转换为大写。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysUpperCase();
/* 数据更改为：
[
    {"DATA1":"hello world", "DATA2":123, "DATA3":"..." },
    {"DATA1":"hello human", "DATA2":456, "DATA3":"..." }
]
*/
```

## API

| 调用 | 返回值 |
|---|---|
| `record. makeAllKeysUpperCase ( )` | `Record` |