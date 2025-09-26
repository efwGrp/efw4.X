# new Result

The constructor function creates a new `Result` object, used for returning data from events.

## Sample

```javascript
var result = new Result();
var result = new Result(true);
```

## API

| Calling | Returning |
|---|---|
| `new Result ( )` | `Result` |
| `new Result ( withoutI18nTranslation )` | `Result` |

| Parameters | Type | Description |
|---|---|---|
| `withoutI18nTranslation` | `Boolean` | If true, the `Result` instance will not support multiple languages. |
