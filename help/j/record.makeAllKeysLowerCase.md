# Record.makeAllKeysLowerCase

`makeAllKeysLowerCase`関数は、配列データ内のすべてのキーを小文字に変換します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysLowerCase();
/* データは以下のように変更されます。
[
    {"data1":"hello world", "data2":123, "data3":"..." },
    {"data1":"hello human", "data2":456, "data3":"..." }
]
*/

```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. makeAllKeysLowerCase ( )` | `Record` |