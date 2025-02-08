# properties.get

The `get` function retrieves data from the `efw.properties` file.

## Sample

```javascript
var bln = properties.get("efw.login.check", false);
var str = properties.get("efw.login.key");
```

## API

| Calling | Returning |
|---|---|
| `properties. get ( key )` | `String` |
| `properties. get ( key, defaultValue )` | `String` \| `Number` \| `Boolean` (The type of `defaultValue`) |

| Parameters | Type | Description |
|---|---|---|
| `key` | `String` | Identifies the property. |
| `defaultValue` | `{any}` | The default value if the property is not defined in the `efw.properties` file. |