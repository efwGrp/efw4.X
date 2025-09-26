# Excel.replacePicture

`replacePicture` 函数用于替换 Excel 文件中存在的图像形状。此函数仅适用于 XSSF (xlsx, xlsm) 文件。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.replacePicture("Sheet1","picture1","templates/tanaka.png");
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. replacePicture ( sheetName, shapeName, newPicturePath )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `shapeName` | `String` | 要替换的形状（图片）的名称。 |
| `newPicturePath` | `String` | 相对于存储文件夹的图像文件路径。 |