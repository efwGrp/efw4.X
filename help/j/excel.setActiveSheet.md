# Excel.setActiveSheet

`setActiveSheet`関数は、シートをアクティブシートとして設定するために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setActiveSheet("newSheet");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. setActiveSheet ( sheetName )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |