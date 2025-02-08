# Record.makeAllKeysUpperCase

The `makeAllKeysUpperCase` function converts all keys in the array data to uppercase.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysUpperCase();
/* The data is changed to:
[
    {"DATA1":"hello world", "DATA2":123, "DATA3":"..." },
    {"DATA1":"hello human", "DATA2":456, "DATA3":"..." }
]
*/
```

## API

| Calling | Returning |
|---|---|
| `record. makeAllKeysUpperCase ( )` | `Record` |