# rest.get

`get` 函数使用 GET 方法调用 REST API。它返回 `null` 或一个 JSON 对象。

## 示例

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
```

## API

| 调用 | 返回值 |
|---|---|
| `rest. get ( apiUrl )` | `null` 或 `JSON` |
| `rest. get ( apiUrl, heads )` | `null` 或 `JSON` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `apiUrl` | `String` | REST API 的 URL。 |
| `heads` | `JSON 对象` | 其他请求标头。 |