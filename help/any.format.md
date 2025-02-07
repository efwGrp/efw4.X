# any.format

The `format` function is established to format any value to String.

`{any} = { Number | Date | Boolean | String }`

## Sample

```javascript
(12345).format("#,000.0");
(new Date()).format("yyyy/MM/dd");
//the enum format
true.format("{YES=true,NO=false}");
"ONE".format("{一=ONE,二=TWO,三=THREE}");
"1".format("{一=1,二=2,三=3}");
"1".format("{一='1',二='2',三='3'}");
"1".format('{一="1",二="2",三="3"}');
var a=1;a.format("{一=1,二=2,三=3}");
new Date("2025-01-01").format("{25Y=2025-01-01,24Y=2024-01-01}");
```

## API

| Calling | Returning |
|---|---|
| `{any} . format ( formatter )` | `String` |
| `{any} . format ( formatter , rounder )` | `String` |

| Parameters | Type | Description |
|---|---|---|
| [`formatter`](formatter&rounder.md) | `String` | Number formatter or date formatter. |
| [`rounder`](formatter&rounder.md) | `String` | The rounder for number format. |