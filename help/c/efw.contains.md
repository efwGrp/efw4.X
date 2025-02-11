# efw.contains

`contains` 函数用于检查一个键是否已在 `efw` 中注册。

## 示例

```javascript
if (!efw.contains("PDFLib")){
	load(_eventfolder+"/pdf-lib.min.js");
	load(_eventfolder+"/fontkit.umd.min.js");
	efw.register("PDFLib");
	efw.register("fontkit");
};
```
## API

| 调用 | 返回值 |
|---|---|
| `efw. contains ( key )` | `boolean` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 要注册的全局变量的名称。 |