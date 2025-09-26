# Excel.replacePicture

`replacePicture`関数は、Excelファイルに存在する画像シェイプを置き換えるために使用されます。この関数は、XSSF (xlsx, xlsm) ファイルでのみ使用可能です。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.replacePicture("Sheet1","picture1","templates/tanaka.png");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. replacePicture ( sheetName, shapeName, newPicturePath )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `shapeName` | `String` | 置き換えるシェイプ（画像）の名前。 |
| `newPicturePath` | `String` | ストレージフォルダからの相対的な画像ファイルパス。 |