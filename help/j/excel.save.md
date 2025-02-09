# Excel.save

`save`関数は、Excelオブジェクトをファイルに保存するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. save ( path )` | `Excel` |
| `excel. save ( path, password )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダからの相対的なExcelファイルパス。 |
| `password` | `String` | ファイルを開くためのパスワード。 |