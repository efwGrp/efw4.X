# rest.delete

`delete` 函数使用 DELETE 方法调用 REST API。它返回 `null` 或一个 JSON 对象。

## 示例

```javascript
var ret = rest.delete("http://localhost:8080/restSample/efwRestAPI/customer/u001");
```

## API

| 调用 | 返回值 |
|---|---|
| `rest. delete ( apiUrl )` | `null` 或 `JSON` |
| `rest. delete ( apiUrl, heads )` | `null` 或 `JSON` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `apiUrl` | `String` | REST API 的 URL。 |
| `heads` | `JSON 对象` | 附加请求标头。 |