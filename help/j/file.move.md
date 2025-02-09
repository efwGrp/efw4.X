# file.move

`move`関数は、元のファイルまたはフォルダを新しい場所に移動するために使用されます。移動先がすでに存在する場合、上書きは*されません*。

## サンプル

```javascript
file.move("myFile.txt","yourFile.txt");
file.move("myFolder","yourFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. move ( orgPath, newPath )` | `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `orgPath` | `String` | ストレージへの相対的なファイルまたはフォルダパス（ソース）。 |
| `newPath` | `String` | ストレージへの相対的なファイルまたはフォルダパス（デスティネーション）。 |