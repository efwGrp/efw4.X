# barcode.decode

`decode`関数は、バーコード画像ファイルをデコードし、その値を取得するために使用されます。バーコードをデコードできない場合、関数は`null`を返します。

## サンプル

```javascript
var msg = barcode.decode("test.png");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `barcode. decode ( imagePath )` | `String` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `imagePath` | `String` | ストレージフォルダからの相対的なバーコード画像ファイルパス。 |