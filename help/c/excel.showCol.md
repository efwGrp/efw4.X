# Excel.showCol

`showCol` 函数用于显示工作表中的列。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.showCol("mySheet",2,4);
```
## API

| 调用 | 返回值 |
|---|---|
| `excel. showCol ( sheetName, startCol, endCol )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startCol` | `Number` | 要显示的范围的起始列。从 0 开始索引。 |
| `endCol` | `Number` | 要显示的范围的结束列。从 0 开始索引。 |