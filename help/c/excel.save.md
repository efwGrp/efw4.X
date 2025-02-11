# Excel.save

`save` 函数用于将 Excel 对象保存到文件。

## 示例

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx");
```

## API

| 调用 | 返回值 |
|---|---|
| `excel. save ( path )` | `Excel` |
| `excel. save ( path, password )` | `Excel` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 Excel 文件路径。 |
| `password` | `String` | 用于打开文件的密码。 |