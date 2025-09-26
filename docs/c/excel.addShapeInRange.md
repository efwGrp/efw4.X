# Excel.addShapeInRange

`addShapeInRange` 函数用于通过复制模板工作表中的形状来创建形状，并将其放置在单元格区域周围。此函数仅适用于 XSSF (xlsx, xlsm) 文件。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text")
.addShapeInRange("newSheet","firstCellPosition","lastCellPosition","templateSheet","shapeName","text",20,20,40,40);	// 通过复制 templateSheet 的形状来创建类似直线的形状```

## API

| 调用 | 返回值 |
|---|---|
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName )` | `Excel` |
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text )` | `Excel` |
| `excel. addShapeInRange ( sheetName, firstCellPosition, lastCellPosition, templateSheetName, templateShapeName, text, x1, y1, x2, y2 )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `firstCellPosition` | `String` | 第一个单元格的绝对引用（例如，“A1”）。 |
| `lastCellPosition` | `String` | 最后一个单元格的绝对引用（例如，“B2”）。 |
| `templateSheetName` | `String` | 模板工作表名称。 |
| `templateShapeName` | `String` | 要复制的形状的名称。 |
| `text` | `String` | 创建的形状的文本值。 |
| `x1` | `Number` | 第一个单元格内的 x 坐标。 |
| `y1` | `Number` | 第一个单元格内的 y 坐标。 |
| `x2` | `Number` | 最后一个单元格内的 x 坐标。 |
| `y2` | `Number` | 最后一个单元格内的 y 坐标。 |