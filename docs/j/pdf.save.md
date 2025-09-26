# Pdf.save

`save`関数は、Pdfオブジェクトをファイルに保存するために使用されます。

## サンプル

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf.save("my.pdf").close();
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `pdf. save ( path )` | `Pdf` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダからの相対的なPdfファイルパス。 |
