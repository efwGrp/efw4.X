# file.remove

`remove`関数は、ファイルまたはフォルダを削除するために使用されます。

## サンプル

```javascript
file.remove("myFolder/myFile.txt");
file.remove("yourFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. remove ( path )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | 削除するファイルまたはフォルダの相対パス。 |