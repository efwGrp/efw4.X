# rest.get

The `get` function calls a REST API using the GET method.  It returns `null` or a JSON object.

## Sample

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
```

## API

| Calling | Returning |
|---|---|
| `rest. get ( apiUrl )` | `null` or `JSON` |
| `rest. get ( apiUrl, heads )` | `null` or `JSON` |

| Parameters | Type | Description |
|---|---|---|
| `apiUrl` | `String` | The URL for the REST API. |
| `heads` | `JSON Object` | Additional request headers. |
