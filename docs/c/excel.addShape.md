# Excel.addShape

`addShape` 函数用于通过复制模板工作表中的形状来创建形状，并将其放置在单元格周围。此函数仅适用于 XSSF (xlsx, xlsm) 文件。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.addShape("newSheet","A1","templateSheet","shapeName")
.addShape("newSheet","A1","templateSheet","shapeName","text")
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30)
.addShape("newSheet","A1","templateSheet","shapeName","text",90,30,40,40);	// 通过复制 templateSheet 的形状来创建不包含直线的形状
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y )` | `Excel` |
| `excel. addShape ( sheetName, position, templateSheetName, templateShapeName, text, x, y, width, height )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 单元格的绝对引用（例如，“A1”）。 |
| `templateSheetName` | `String` | 模板工作表名称。 |
| `templateShapeName` | `String` | 要复制的形状的名称。 |
| `text` | `String` | 创建的形状的文本值。 |
| `x` | `Number` | 创建的形状在单元格内的 x 坐标。 |
| `y` | `Number` | 创建的形状在单元格内的 y 坐标。 |
| `width` | `Number` | 创建的形状的宽度。 |
| `height` | `Number` | 创建的形状的高度。 |