# Excel.hideCol

`hideCol` 函数用于隐藏工作表中的列。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.hideCol("mySheet",2,4);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. hideCol ( sheetName, startCol, endCol )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startCol` | `Number` | 要隐藏的范围的起始列。从 0 开始索引。 |
| `endCol` | `Number` | 要隐藏的范围的结束列。从 0 开始索引。 |