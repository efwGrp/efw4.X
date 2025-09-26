# Excel.isEncircled

`isEncircled` 函数用于确定一个点是否被一个形状包围。此函数仅适用于 XSSF (xlsx, xlsm) 文件。

## 示例

```javascript
var excel = new Excel("test.xlsx");
var tf1 = excel.isEncircled("Sheet1", "A1");
var tf2 = excel.isEncircled("Sheet1", "B2", 0.25, 0.5);
```
## API

| 调用 | 返回值 |
|---|---|
| `excel. isEncircled ( sheetName, position )` | `Boolean` |
| `excel. isEncircled ( sheetName, position, checkpointXRate, checkpointYRate )` | `Boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 单元格的绝对引用。 |
| `checkpointXRate` | `Number` | 形状中心点 x 坐标相对于单元格宽度的比率。默认值为 0.5。 |
| `checkpointYRate` | `Number` | 形状中心点 y 坐标相对于单元格高度的比率。默认值为 0.5。 |