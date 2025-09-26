# Excel.showRow

`showRow` 函数用于显示工作表中的行。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.showRow("mySheet",2,4);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. showRow ( sheetName, startRow, endRow )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 要显示的范围的起始行。从 0 开始索引。 |
| `endRow` | `Number` | 要显示的范围的结束行。从 0 开始索引。 |