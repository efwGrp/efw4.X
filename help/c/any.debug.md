# any.debug

`debug` 函数用于将任何对象的信息打印到控制台。

`any = { String | Number | Boolean | Date | Array | Function | Object | Excel | Record | Result }`

## 示例

```javascript
"hello world!".debug("test1");
(123).debug("test1");
(true).debug("test1");
(new Date()).debug("test2");

return (new Result()).runat().withData({
	"#userId" : "Wang"
}.debug("test3")).debug("test4");
```

## API

| 调用 | 返回值 |
|---|---|
| `any. debug ( label )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Array` \| `Function` \| `Object` \| `Excel` \| `Record` \| `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `label` | `String` | 在调试信息之前打印的标签。 |