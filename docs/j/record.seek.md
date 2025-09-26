# Record.seek

`seek`関数は、配列内を検索するために使用されます。

## サンプル

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.seek("data2","eq",123);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `record. seek ( field, action, value )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `field` | `String` | フィールド名 |
| `action` | `String` | 比較アクション：`eq` (等しい)、`gt` (より大きい)、`lt` (より小さい)、`like` (含む)、`!eq` (等しくない)、`!gt` (より大きくない)、`!lt` (より小さくない)、`!like` (含まない)。 |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` | 比較する値 |