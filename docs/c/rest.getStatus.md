# rest.getStatus

`getStatus` 函数检索 REST API 调用后返回的 HTTP 状态码。它返回一个整数。

## 示例

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
var status = rest.getStatus();
// 200
```

## API

| 调用 | 返回值 |
|---|---|
| `rest. getStatus ( )` | `Number` |