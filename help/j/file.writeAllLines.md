# file.writeAllLines

`writeAllLines`関数は、すべての行をテキストファイルに書き込むために使用されます。

## サンプル

```javascript
file.writeAllLines("myFolder/myFile.txt","abcdefghijklmn","UTF-8");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. writeAllLines ( path, content )` | `String` |
| `file. writeAllLines ( path, content, encoding )` | `String` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダへの相対的なテキストファイルパス。 |
| `content` | `String` | 保存するテキストコンテンツ。 |
| `encoding` | `String` | テキストファイルの文字セット名。デフォルト値は UTF-8 です。 |