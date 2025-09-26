# efw.register

`register` 函数用于在 `efw` 中注册一个键，以防止系统将其识别为非法全局变量。

## 示例

```javascript
load(_eventfolder+"/pdf-lib.min.js");
load(_eventfolder+"/fontkit.umd.min.js");
efw.register("PDFLib");
efw.register("fontkit");
```

## API

| 调用 | 返回值 |
|---|---|
| `efw. register ( key )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 要注册的全局变量的名称。 |