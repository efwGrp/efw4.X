# file.rename

`rename`関数は、ファイルまたはフォルダの名前を変更するために使用されます。

## サンプル

```javascript
file.rename("myFolder/myFile.txt","yourFile.txt");
file.rename("myFolder","yourFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. rename ( orgPath, newName )` |  |

| パラメータ | 型 | 説明 |
|---|---|---|
| `orgPath` | `String` | ストレージへの相対的なファイルまたはフォルダパス（ソース）。 |
| `newName` | `String` | ファイルまたはフォルダの新しい名前。 |