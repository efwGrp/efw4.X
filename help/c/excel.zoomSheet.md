# Excel.zoomSheet

`zoomSheet` 函数用于缩放工作表。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.zoomSheet("mySheet",75);
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. zoomSheet ( sheetName, percent )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |
| `percent` | `Number` | 缩放百分比。 |