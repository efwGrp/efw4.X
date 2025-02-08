# Batch.echo

`echo`関数は、メッセージをバッチコンソールに表示するために使用されます。

## サンプル

```javascript
var batch = new Batch();
batch.echo("good morning!").echo("good night!");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `batch. echo ( message )` | `Batch` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | バッチコンソールに表示する情報。 |