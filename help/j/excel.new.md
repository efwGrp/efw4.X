# new Excel

コンストラクタ関数は、既存のExcelファイルを開くために使用されます。新しいExcelファイルを作成する場合でも、テンプレートファイルから作成する必要があります。

## サンプル

```javascript
var excelHSSF = new Excel("small.xls");
var excelXSSF = new Excel("small.xlsx");
var excelSXSSF = new Excel("large.xlsx" , true);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new Excel ( path )` | `Excel` |
| `new Excel ( path, isLarge )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ストレージフォルダからの相対的なExcelファイルパス。 |
| `isLarge` | `Boolean` | 値が`true`の場合、Excelファイルは非常に大きなデータで操作できます。[SXSSF](http://poi.apache.org/components/spreadsheet/how-to.html#sxssf)の詳細について注意してください。 |
