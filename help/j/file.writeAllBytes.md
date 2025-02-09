# file.writeAllBytes

`writeAllBytes`関数は、すべてのバイナリバイトをファイルに書き込むために使用されます。

## サンプル

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
file.writeAllBytes("test.ttf", ary);

```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. writeAllBytes ( path, content )` | `byte[]` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルパス。 |
| `content` | `byte[]` | 書き込むバイト配列。 |