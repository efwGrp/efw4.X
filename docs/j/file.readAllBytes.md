# file.readAllBytes

`readAllBytes`関数は、バイナリファイルをバイト配列にロードするために使用されます。

## サンプル

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
var uint8Array = new Uint8Array(ary.length);
uint8Array.set(Java.from(ary));

```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. readAllBytes ( path )` | `byte[]` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルパス。 |