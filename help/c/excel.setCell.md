# Excel.setCell

`setCell` 函数用于在单元格中设置值、样式等。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.setCell("newSheet", "A1", "hell world!")					// 在单元格中设置一个值。
.setCell("newSheet", "B1", "hell world!", "Sheet1", "A1")	// 在单元格中设置一个值，并从另一个单元格复制样式。
.setCell("newSheet", "C1", null, "Sheet1", "A2");			// 如果值为 null，它将尝试设置公式。
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. setCell ( sheetName, position, value )` | `Excel` |
| `excel. setCell ( sheetName, position, value, templateSheetName, templatePosition )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 单元格的绝对引用。 |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` \| `null` | 要设置到单元格中的值。如果为 `null`，它将尝试设置公式。 |
| `templateSheetName` | `String` | 模板工作表名称。 |
| `templatePosition` | `String` | 模板单元格的绝对引用。 |