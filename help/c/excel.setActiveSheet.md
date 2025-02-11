# Excel.setActiveSheet

`setActiveSheet` 函数用于将工作表设置为活动工作表。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.createSheet("newSheet").setActiveSheet("newSheet");
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. setActiveSheet ( sheetName )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `sheetName` | `String` | 工作表名称。 |