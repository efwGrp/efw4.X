# file.writeAllBytes

`writeAllBytes` 函数用于将所有二进制字节写入文件。

## 示例

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
file.writeAllBytes("test.ttf", ary);

```

## API

| 调用 | 返回值 |
|---|---|
| `file. writeAllBytes ( path, content )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件的相对路径。 |
| `content` | `byte[]` | 要写入的字节数组。 |