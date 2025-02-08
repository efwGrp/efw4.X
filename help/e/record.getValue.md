# Record.getValue

The `getValue` function retrieves a field value from the first object within the `Record`.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var value = record.getValue("data1");
```

## API

| Calling | Returning |
|---|---|
| `record. getValue ( field )` | `String` \| `Number` \| `Date` \| `Boolean` |

| Parameters | Type | Description |
|---|---|---|
| `field` | `String` | The field name. |

