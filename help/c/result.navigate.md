# Result.navigate

`navigate` 函数将客户端重定向到另一个 JSP 页面。它只能被调用一次。

## 示例

```javascript
var result = new Result();
result.navigate("the next page url");
```

## API

| 调用 | 返回值 |
|---|---|
| `result. navigate ( url )` | `Result` |
| `result. navigate ( url, params )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `url` | `String` | 客户端将导航到的 URL。 |
| `params` | `Object` | 要附加到 URL 的参数。<br> ```{param1:value1, param2:value2,...}``` |