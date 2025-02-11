# Excel.setLink

`setLink` 函数用于在单元格中设置链接。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet")
.createSheet("linkSheet")
.setLink("newSheet","A1","#\'linkSheet\'!A1");		// 在单元格中设置链接。
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. setLink ( sheetName, position, linkUrl )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `position` | `String` | 添加链接的单元格位置。 |
| `linkUrl` | `String` | 链接到工作表的 URL。 |