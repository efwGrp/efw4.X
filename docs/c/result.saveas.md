# Result.saveas

`saveas` 函数允许您在文件下载时重命名该文件。

## 示例

```javascript
var result = new Result();
result.attach("test.xls")
    .saveas("hello.xls");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. saveas ( filename )` | `Result` |
| `result. saveas ( filename, password )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `filename` | `String` | 保存的文件名。 |
| `password` | `String` | 如果附加了文件夹或多个文件，您可以将它们全部保存到受密码保护的已命名 zip 压缩文件中。 |