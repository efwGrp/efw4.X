# Math.ROUNDUP

The `Math.ROUNDUP` function rounds a number up, similar to the Excel function of the same name.

## Sample

```javascript
Math.ROUNDUP(5.5,0);    // 6
Math.ROUNDUP(2.5,0);    // 3
Math.ROUNDUP(1.6,0);    // 2
Math.ROUNDUP(1.1,0);    // 2
Math.ROUNDUP(1.0,0);    // 1
Math.ROUNDUP(-1.0,0);   // -1
Math.ROUNDUP(-1.1,0);   // -2
Math.ROUNDUP(-1.6,0);   // -2
Math.ROUNDUP(-2.5,0);   // -3
Math.ROUNDUP(-5.5,0);   // -6

Math.ROUNDUP(1.2345,3);  // 1.235
```

## API

| Calling | Returning |
|---|---|
| `Math. ROUNDUP ( num, digit )` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `num` | `Number` | The number to round. |
| `digit` | `Number` | Number of digits after the decimal point. |