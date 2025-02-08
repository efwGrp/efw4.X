# rest.getStatus

The `getStatus` function retrieves the HTTP status code after a REST API call. It returns an integer.

## Sample

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
var status = rest.getStatus();
// 200
```

## API

| Calling | Returning |
|---|---|
| `rest. getStatus ( )` | `number` |
