# Excel.encircle

`encircle` 函数用于通过复制形状并将其环绕单元格来创建形状。它仅适用于 XSSF (xlsx, xlsm) 文件。

## 示例

```javascript
// 要运行示例，请确保在 Sheet1 中放置一个名为“shape1”的形状。

var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
// 通过复制 shape1 来环绕单元格 A1。新形状默认居中，宽度和高度为单元格 A1 的 50%。
.encircle("newSheet", "A1", "Sheet1", "shape1")
// 通过复制 shape1 来环绕单元格 B1。新形状位于顶部/中心，宽度和高度为单元格 B1 的 50%。
.encircle("newSheet", "B1", "Sheet1", "shape1", 0.25, 0.5 )				
// 通过复制 shape1 来环绕单元格 C1。新形状居中，宽度为单元格 C1 的 50%，高度为 25%。
.encircle("newSheet", "C1", "Sheet1", "shape1", 0.5, 0.5, 0.5, 0.25 );
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName )` | `Excel` |
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate )` | `Excel` |
| `excel. encircle ( sheetName, position, templateSheetName, templateShapeName, shapeCenterXRate, shapeCenterYRate, shapeWidthRate, shapeHeightRate )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 单元格的绝对引用。 |
| `templateSheetName` | `String` | 模板工作表名称。 |
| `templateShapeName` | `String` | 模板工作表中的模板形状名称。 |
| `shapeCenterXRate` | `Number` | 形状中心点 x 坐标相对于单元格宽度的比率。默认值为 0.5。 |
| `shapeCenterYRate` | `Number` | 形状中心点 y 坐标相对于单元格高度的比率。默认值为 0.5。 |
| `shapeWidthRate` | `Number` | 形状宽度相对于单元格宽度的比率。默认值为 0.5。 |
| `shapeHeightRate` | `Number` | 形状高度相对于单元格高度的比率。默认值为 0.5。 |