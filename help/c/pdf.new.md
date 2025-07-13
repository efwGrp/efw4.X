# new Pdf

构造函数用于打开现有的 Pdf 文件。即使您想创建新的 Pdf 文件，也必须从模板文件创建它。

## 示例

```javascript
var pdf = new Pdf("mytemplate.pdf");
```

## API

| 调用 | 返回值 |
|---|---|
| `new Pdf ( path )` | `Pdf` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 Excel 文件路径。 |
