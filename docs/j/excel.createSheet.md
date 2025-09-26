# Excel.createSheet

`createSheet`関数は、新しいシートを作成したり、既存のシートを複製したりするために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("blankSheet").createSheet("Sheet1Clone", "Sheet1");
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. createSheet ( sheetName )` | `Excel` |
| `excel. createSheet ( sheetName, copyFrom )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | 新しいシートの名前。 |
| `copyFrom` | `String` | 複製する既存のシートの名前。 |