# file.readAllLines

`readAllLines`関数は、テキストファイルからすべての行を読み取るために使用されます。

## サンプル

```javascript
var txt = file.readAllLines("myFolder/myFile.txt");
var txt = file.readAllLines("myFolder/myFile.txt", "UTF-8");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. readAllLines ( path )` | `String` |
| `file. readAllLines ( path, encoding )` | `String` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダへの相対的なテキストファイルパス。 |
| `encoding` | `String` | テキストファイルの文字セット名。デフォルト値は UTF-8 です。 |