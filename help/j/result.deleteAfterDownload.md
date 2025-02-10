# Result.deleteAfterDownload

`deleteAfterDownload`関数は、ファイルまたはフォルダがダウンロードされた後に削除されるように指定します。

## サンプル

```javascript
var result = new Result();
result
.attach("test.xls")
.deleteAfterDownload();
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result . deleteAfterDownload ( )` | `Result` |