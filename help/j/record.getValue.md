# Record.getValue

`getValue`関数は、`Record`内の最初のオブジェクトからフィールド値を取得します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var value = record.getValue("data1");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. getValue ( field )` | `String` \| `Number` \| `Date` \| `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `field` | `String` | フィールド名 |