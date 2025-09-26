# barcode.decode

`decode` 函数用于解码条形码图像文件并检索其值。如果无法解码条形码，则该函数返回 `null`。

## 示例

```javascript
var msg = barcode.decode("test.png");
```

## API

| 调用 | 返回值 |
|---|---|
| `barcode. decode ( imagePath )` | `String` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `imagePath` | `String` | 相对于存储文件夹的条形码图像文件路径。 |