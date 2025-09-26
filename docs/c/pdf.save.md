# Pdf.save

`save` 函数用于将 Pdf 对象保存到文件。

## 示例

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf.save("my.pdf").close();
```

## API

| 调用 | 返回值 |
|---|---|
| `pdf. save ( path )` | `Pdf` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储文件夹的 Pdf 文件路径。 |
