# Excel.setSheetOrder

`setSheetOrder` 函数用于移动工作表的位置。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setSheetOrder("newSheet", 1);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. setSheetOrder ( sheetName, order )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `order` | `Number` | 工作表的位置，从 1 开始。 |