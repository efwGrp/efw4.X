# Date.getYears

The `getYears` function is established to get the number of years between the date and the current time.

## Sample

```javascript
var date = Date.parse("1980/01/01","yyyy/MM/dd");
var years = date.getYears();
```

## API

| Calling | Returning |
|---|---|
| `date. getYears ( )` | `Number` |
| `date. getYears ( current )` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `current` | `Date` | A date to be used as the current date. |

