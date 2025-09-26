# Excel.zoomSheet

`zoomSheet`関数は、シートをズームするために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.zoomSheet("mySheet",75);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. zoomSheet ( sheetName, percent )` | `Excel` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `sheetName` | `String` | シート名。 |
| `percent` | `Number` | ズームするパーセンテージ。 |