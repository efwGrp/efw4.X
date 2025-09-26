# Record.makeAllKeysUpperCase

`makeAllKeysUpperCase`関数は、配列データ内のすべてのキーを大文字に変換します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysUpperCase();
/* データは以下のように変更されます。
[
    {"DATA1":"hello world", "DATA2":123, "DATA3":"..." },
    {"DATA1":"hello human", "DATA2":456, "DATA3":"..." }
]
*/
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. makeAllKeysUpperCase ( )` | `Record` |