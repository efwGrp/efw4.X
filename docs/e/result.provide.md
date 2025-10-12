# Result.provide

The `provide` function send data to client to provide the return value of Efw function. 

## Sample

```javascript
var result = new Result();
result.provide({a:1,b:2});
```

## API

| Calling | Returning |
|---|---|
| `result. provide ( data )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `data` | `String \| Number \| Boolean \| Date \| Object \| Array` | The information you want to send to client. |
