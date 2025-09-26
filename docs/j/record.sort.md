# Record.sort

`sort`関数は、`Record`オブジェクト内の配列をソートします。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.sort("data2","asc");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. sort ( field, action )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `field` | `String` | フィールド名 |
| `action` | `String` | `asc` または `desc`。ソート方向。 |