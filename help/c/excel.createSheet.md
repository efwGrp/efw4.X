# Excel.createSheet

`createSheet` 函数用于创建新工作表或克隆现有工作表。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("blankSheet").createSheet("Sheet1Clone", "Sheet1");
```
## API

| 调用 | 返回值 |
|---|---|
| `excel. createSheet ( sheetName )` | `Excel` |
| `excel. createSheet ( sheetName, copyFrom )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 新工作表的名称。 |
| `copyFrom` | `String` | 要克隆的现有工作表的名称。 |