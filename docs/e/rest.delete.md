# rest.delete

The `delete` function calls a REST API using the DELETE method. It returns `null` or a JSON object.

## Sample

```javascript
var ret = rest.delete("http://localhost:8080/restSample/efwRestAPI/customer/u001");
```

## API

| Calling | Returning |
|---|---|
| `rest. delete ( apiUrl )` | `null` or `JSON` |
| `rest. delete ( apiUrl, heads )` | `null` or `JSON` |

| Parameters | Type | Description |
|---|---|---|
| `apiUrl` | `String` | The URL for the REST API. |
| `heads` | `JSON Object` | Additional request headers. |
