# Batch.exit

`exit`関数は、バッチ実行のERRORLEVELを設定するために使用されます。

## サンプル

```javascript
var batch = new Batch();
batch.exit(1);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `batch. exit ( level )` | `Batch` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `level` | `Number` | ERRORLEVELを表す整数値。 |