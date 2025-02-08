# Record.seek

The seek function is used to search within the array.

## Sample

```javascript
var record = new Record([
	{"data1":"hello world", "data2":123, "data3":new Date("2016/12/13") },
	{"data1":"hello human", "data2":456, "data3":new Date("2016/12/14") }
]);
record.seek("data2","eq",123);
```

## API

| Calling | Returning |
|---|---|
| `record. seek ( field, action, value )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `field` | `String` | The field name. |
| `action` | `String` | The comparison action: `eq` (equal), `gt` (greater than), `lt` (less than), `like` (contains), `!eq` (not equal), `!gt` (not greater than), `!lt` (not less than), `!like` (does not contain). |
| `value` | `String` \| `Number` \| `Date` \| `Boolean` | The value to compare. |
