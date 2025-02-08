# Batch.log

`log`関数は、メッセージをバッチログファイルに保存するために使用されます。

## サンプル

```javascript
var batch = new Batch();
batch.log("good morning!").log("good night!");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `batch. log ( message )` | `Batch` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | ログファイルに保存する情報。 |