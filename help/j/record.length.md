# Record.length

`length`属性は、`Record`内のオブジェクト（行）数を返します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var len = record.length;
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. length` | `Number` |
