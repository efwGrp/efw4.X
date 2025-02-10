# new Record

コンストラクタ関数は、新しい`Record`オブジェクトを作成します。

## サンプル

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new Record ( array )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `array` | `Array` | 配列データ |