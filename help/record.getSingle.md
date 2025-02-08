# Record.getSingle

The `getSingle` function retrieves the first object (not a field) from the `Record`.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
var data = record.getSingle();
```

## API

| Calling | Returning |
|---|---|
| `record. getSingle ( )` | `Object` |
