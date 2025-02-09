## file.exists

`exists`関数は、ファイルまたはフォルダが存在するかどうかを判定するために使用されます。

## サンプル

```javascript
var tf = file.exists("myFile.txt");
var tf = file.exists("myFolder");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `file. exists ( path )` | `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージへの相対的なファイルまたはフォルダパス。 |