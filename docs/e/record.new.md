# new Record

The constructor function creates a new `Record` object.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
```

## API

| Calling | Returning |
|---|---|
| `new Record ( array )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `array` | `Array` | The array data. |
