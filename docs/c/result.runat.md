# Result.runat

`runat` 函数指定网页上的目标元素，后续操作（如 `remove`、`append`、`withdata` 等）将应用在该元素上。它本质上是为这些操作设置上下文。

## 示例

```javascript
var result = new Result();
result.runat("#table1");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. runat ( )` | `Result` |
| `result. runat ( selector )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `selector` | `String` | 一个 jQuery 选择器，用于标识将显示数据的元素。默认值为 `"body"`。 |