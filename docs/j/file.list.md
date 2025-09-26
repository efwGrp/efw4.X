# file.list

`list`関数は、ファイルまたはサブフォルダ情報の配列を取得するために使用されます。

## サンプル

```javascript
var infos = file.list("myFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. list ( path )` | [`FileInfo`](file.FileInfo.md) の配列 |
| `file. list ( path, withoutFolderLength )` | [`FileInfo`](file.FileInfo.md) の配列 |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なフォルダパス。 |
| `withoutFolderLength` | `Boolean` | サブフォルダサイズを計算するかどうかを示すフラグ。デフォルト値は`false`です。 |