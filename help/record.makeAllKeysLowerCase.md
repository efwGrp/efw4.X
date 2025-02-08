# Record.makeAllKeysLowerCase

The `makeAllKeysLowerCase` function converts all keys in the array data to lowercase.

## Sample

```javascript
var record = new Record([
    {"data1":"hello world", "DATA2":123, "data3":new Date("2016/12/13") },
    {"data1":"hello human", "DATA2":456, "data3":new Date("2016/12/14") }
]);

record.makeAllKeysLowerCase();
/* The data is changed to:
[
    {"data1":"hello world", "data2":123, "data3":"..." },
    {"data1":"hello human", "data2":456, "data3":"..." }
]
*/

```

## API

| Calling | Returning |
|---|---|
| `record. makeAllKeysLowerCase ( )` | `Record` |