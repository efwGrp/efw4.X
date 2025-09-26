# Result.saveas

`saveas` 関数は、ファイルがダウンロードされるときにファイル名を変更します。

## サンプル

```javascript
var result = new Result();
result.attach("test.xls")
    .saveas("hello.xls");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. saveas ( filename )` | `Result` |
| `result. saveas ( filename, password )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `filename` | `String` | 保存するファイル名。 |
| `password` | `String` | フォルダまたは複数のファイルを添付する場合、それらをすべて名前付きのパスワードで保護されたzipアーカイブに保存できます。 |
