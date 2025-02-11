# Excel.delRow

`delRow` 函数用于删除工作表中的行。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.delRow("mySheet",0);
excel.delRow("mySheet",1,10);
```
## API

| 调用 | 返回值 |
|---|---|
| `excel. delRow ( sheetName, startRow )` | `Excel` |
| `excel. delRow ( sheetName, startRow, n )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `startRow` | `Number` | 将要删除的行的起始行索引。从 0 开始索引。 |
| `n` | `Number` | 要删除的行数。默认值为 1。 |