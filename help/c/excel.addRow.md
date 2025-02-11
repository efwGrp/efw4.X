# Excel.addRow

`addRow` 函数用于向工作表添加行。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.addRow("mySheet",0);
excel.addRow("mySheet",1,10);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. addRow ( sheetName, startRow )` | `Excel` |
| `excel. addRow ( sheetName, startRow, n )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 将新行添加*到其之前*的行索引。从 0 开始索引。 |
| `n` | `Number` | 要添加的空白行数。默认值为 1。 |