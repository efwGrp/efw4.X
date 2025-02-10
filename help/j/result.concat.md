# Result.concat

`concat`関数は、現在の結果を別の`Result`オブジェクトと連結します。

## サンプル

```javascript
var result = new Result();
result.concat(event.fire("subEvent"));
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. concat ( result )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `result` | `Result` | 連結するもう一方の`Result`オブジェクト。 |