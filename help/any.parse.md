# any.parse

The `parse` function is established to parse String to any value.

`{any} = { Number | Date | Boolean | String }`

## Sample

```javascript
var nm = Number.parse("12,345.0", "#,000.0");
var nm = Number.parse("一", "{一=1,二=2,三=3}");
var dt = Date.parse("2016/09/08", "yyyy/MM/dd");
//the enum format
var dt = Date.parse("25Y", "{25Y=2025-01-01,24Y=2024-01-01}");
var bl = Boolean.parse("YES","{YES=true,NO=false}");
var st = String.parse("一", "{一='1',二='2',三='3'}");
var st = String.parse("一", '{一="1",二="2",三="3"}');
```

## API

| Calling | Returning |
|---|---|
| `{any} . parse ( value , formatter )` | `String` |

| Parameters | Type | Description |
|---|---|---|
| `value` | `String` | The string value of Number or Date. |
| `formatter` | `String` | Number Formatter or Date Formatter |

### Number Formatter

|  |  |
|---|---|
| `0` |  |
| `#` |  |
| `,` |  |
| `.` |  |
| `%` |  |

### Date Formatter

|  |  |
|---|---|
| `GGGGy` | Japan WAREKI, 2016 -- 平成28 |
| `Gy` | Japan WAREKI, 2016 -- H28 |
| `yyyy` |  |
| `yy` |  |
| `MM` |  |
| `M` |  |
| `dd` |  |
| `d` |  |
| `HH` |  |
| `H` |  |
| `mm` |  |
| `m` |  |
| `ss` |  |
| `s` |  |
| `SSS` |  |
| `S` |  |