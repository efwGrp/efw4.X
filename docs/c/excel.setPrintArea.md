# Excel.setPrintArea

`setPrintArea` 函数用于设置工作表的打印区域。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.setPrintArea("mySheet",0,10,0,100);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. setPrintArea ( sheetName, startRow, endRow, startCol, endCol )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 要打印的范围的起始行。从 0 开始索引。 |
| `endRow` | `Number` | 要打印的范围的结束行。从 0 开始索引。 |
| `startCol` | `Number` | 要打印的范围的起始列。从 0 开始索引。 |
| `endCol` | `Number` | 要打印的范围的结束列。从 0 开始索引。 |