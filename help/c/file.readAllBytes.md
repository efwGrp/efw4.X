# file.readAllBytes

`readAllBytes` 函数用于将二进制文件加载到字节数组中。

## 示例

```javascript
var ary = file.readAllBytes("Roboto-Italic.ttf");
var uint8Array = new Uint8Array(ary.length);
uint8Array.set(Java.from(ary));
```

## API

| 调用 | 返回值 |
|---|---|
| `file. readAllBytes ( path )` | `byte[]` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `path` | `String` | 相对于存储的文件的相对路径。 |