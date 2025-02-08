# Record.sort

The `sort` function sorts the array within the `Record` object.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.sort("data2","asc");
```

## API

| Calling | Returning |
|---|---|
| `record. sort ( field, action )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `field` | `String` | The field name. |
| `action` | `String` | `asc` or `desc`. The sort direction. |
