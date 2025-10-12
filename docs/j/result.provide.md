# Result.provide

`provide` 関数は、Efw 関数の戻り値を提供するためにクライアントにデータを送信します。

## サンプル

```javascript
var result = new Result();
result.provide({a:1,b:2});
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. provide ( data )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `data` | `String \| Number \| Boolean \| Date \| Object \| Array` | クライアントに送信する情報。 |
