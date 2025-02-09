# Record.getSingle

`getSingle`関数は、`Record`から最初のオブジェクト（フィールドではない）を取得します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var data = record.getSingle();
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. getSingle ( )` | `Object` |