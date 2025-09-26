# Excel.hideRow

`hideRow` 函数用于隐藏工作表中的行。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.hideRow("mySheet",2,4);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. hideRow ( sheetName, startRow, endRow )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 要隐藏的范围的起始行。从 0 开始索引。 |
| `endRow` | `Number` | 要隐藏的范围的结束行。从 0 开始索引。 |