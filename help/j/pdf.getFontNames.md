# Pdf.getFontNames

`getFontNames` 関数は、フォルダー内のすべてのフォント ファイルの名前を取得するために使用されます。

## サンプル

```javascript
var ary = Pdf.getFontNames("fonts");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `Pdf. getFontNames ( fontsPath )` | `Array` |
| `Pdf. getFontNames ( fontsPath, fontsPathIsAbs )` | `Array` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `fontsPath` | `String` | フォント ファイルのフォルダー パス。 |
| `fontsPathIsAbs` | `Boolean` | fontsPath が絶対パスであるかどうかを指定します。|
