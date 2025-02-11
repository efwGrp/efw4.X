# Excel.getMaxRow

`getMaxRow` 函数用于检索最后一行号，从 1 开始计数。

## 示例

```javascript
var excel = new Excel("test.xlsx");
var maxrow = excel.getMaxRow("Sheet1");
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. getMaxRow ( sheetName )` | `Number` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |