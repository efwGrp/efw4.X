# new Excel

构造函数用于打开现有的 Excel 文件。即使您想创建新的 Excel 文件，也必须从模板文件创建它。

## 示例

```javascript
var excelHSSF = new Excel("small.xls");
var excelXSSF = new Excel("small.xlsx");
var excelSXSSF = new Excel("large.xlsx" , true);
```

## API

| 调用 | 返回值 |
|---|---|
| `new Excel ( path )` | `Excel` |
| `new Excel ( path, isLarge )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 Excel 文件路径。 |
| `isLarge` | `Boolean` | 如果值为 `true`，则可以使用非常大的数据操作 Excel 文件。请注意有关 [SXSSF](http://poi.apache.org/components/spreadsheet/how-to.html#sxssf) 的详细信息。 |