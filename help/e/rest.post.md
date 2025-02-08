# rest.post

The `post` function calls a REST API using the POST method. It returns a JSON object.

## Sample

```javascript
var params={"nm":"customer name 1"};
var ret = rest.post("http://localhost:8080/restSample/efwRestAPI/customer/u001",params);
// {"id":"u001","nm":"customer name 1"}
```

## API

| Calling | Returning |
|---|---|
| `rest. post ( apiUrl, params )` | `null` or `JSON` |
| `rest. post ( apiUrl, params, heads )` | `null` or `JSON` |

| Parameters | Type | Description |
|---|---|---|
| `apiUrl` | `String` | The URL for the REST API. |
| `params` | `JSON Object` | The data to send to the REST API. |
| `heads` | `JSON Object` | Additional request headers. |