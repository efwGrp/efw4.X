# Excel.getValue

`getValue` 函数用于从单元格中检索值。

## 示例

```javascript
var excel = new Excel("test.xlsx");
var v1 = excel.getValue("Sheet1", "A1");
var v2 = excel.getValue("Sheet1", "B2", "yyyy/MM/dd");
var v3 = excel.getValue("Sheet1", "C3", "#,##0.0", "HALF_EVEN");
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. getValue ( sheetName, position )` | `String` \| `Number` \| `Date` \| `Boolean` |
| `excel. getValue ( sheetName, position, formatter )` | `String` \| `Number` \| `Date` \| `Boolean` |
| `excel. getValue ( sheetName, position, formatter, rounder )` | `String` \| `Number` \| `Date` \| `Boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 单元格的绝对引用。 |
| [`formatter`](formatter&rounder.md) | `String` | 数字格式化器或日期格式化器。 |
| [`rounder`](formatter&rounder.md) | `String` | 数字格式的舍入器。 |