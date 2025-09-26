# file.get

`get`関数は、ファイルまたはフォルダに関する情報を取得するために使用されます。

## サンプル

```javascript
var infoFile = file.get("myFile.txt");
var infoFolder = file.get("myFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. get ( path )` | [`FileInfo`](file.FileInfo.md) |
| `file. get ( path, withoutFolderLength )` | [`FileInfo`](file.FileInfo.md) |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルまたはフォルダパス。 |
| `withoutFolderLength` | `Boolean` | フォルダサイズを計算するかどうかを示すフラグ。デフォルト値は`false`です。 |