# Record.length

The `length` attribute returns the number of objects (rows) in the `Record`.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var len = record.length;
```

## API

| Calling | Returning |
|---|---|
| `record. length` | `Number` |
