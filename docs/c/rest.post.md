# rest.post

`post` 函数使用 POST 方法调用 REST API。它返回一个 JSON 对象。

## 示例

```javascript
var params={"nm":"customer name 1"};
var ret = rest.post("http://localhost:8080/restSample/efwRestAPI/customer/u001",params);
// {"id":"u001","nm":"customer name 1"}
```

## API

| 调用 | 返回值 |
|---|---|
| `rest. post ( apiUrl, params )` | `null` 或 `JSON` |
| `rest. post ( apiUrl, params, heads )` | `null` 或 `JSON` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `apiUrl` | `String` | REST API 的 URL。 |
| `params` | `JSON 对象` | 要发送到 REST API 的数据。 |
| `heads` | `JSON 对象` | 附加请求标头。 |