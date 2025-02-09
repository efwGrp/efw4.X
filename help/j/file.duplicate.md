# file.duplicate

`duplicate`関数は、ファイルまたはフォルダのコピーを作成するために使用されます。コピー先がすでに存在する場合、上書きは*されません*。

## サンプル

```javascript
file.duplicate("myFile.txt","yourFile.txt");
file.duplicate("myFolder","yourFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. duplicate ( srcPath, destPath )` | `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `srcPath` | `String` | コピーするストレージへの相対的なファイルまたはフォルダパス。 |
| `destPath` | `String` | 保存するストレージへの相対的なファイルまたはフォルダパス。 |