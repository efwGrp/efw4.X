# Record.makeAllKeysLowerCase

`makeAllKeysLowerCase` 函数将数组数据中的所有键转换为小写。

## 示例

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysLowerCase();
/* 数据更改为：
[
    {"data1":"hello world", "data2":123, "data3":"..." },
    {"data1":"hello human", "data2":456, "data3":"..." }
]
*/

```

## API

| 调用 | 返回值 |
|---|---|
| `record. makeAllKeysLowerCase ( )` | `Record` |