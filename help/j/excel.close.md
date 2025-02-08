# Excel.close

`close`関数は、Excelオブジェクトを閉じるために使用されます。

## サンプル

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx").close();		// test.xlsxとmy.xlsxの両方が保持されます。
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `excel. close ( )` | `void` |