# Batch.concat

`concat`関数は、あるバッチ処理の結果を別のバッチ処理の結果に連結するために使用されます。

## サンプル

```javascript
var batch = new Batch();
var batch1 = new Batch();
batch.concat(batch1);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `batch. concat ( batch )` | `Batch` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `batch` | `Batch` | サブバッチの結果。 |