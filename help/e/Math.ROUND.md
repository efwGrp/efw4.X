# Math.ROUND

The `Math.ROUND` function rounds a number, similar to the Excel function of the same name.

## Sample

```javascript
Math.ROUND(5.5,0);    // 6
Math.ROUND(2.5,0);    // 3
Math.ROUND(1.6,0);    // 2
Math.ROUND(1.1,0);    // 1
Math.ROUND(1.0,0);    // 1
Math.ROUND(-1.0,0);   // -1
Math.ROUND(-1.1,0);   // -1
Math.ROUND(-1.6,0);   // -2
Math.ROUND(-2.5,0);   // -3
Math.ROUND(-5.5,0);   // -6

Math.ROUND(1.2345,3);  // 1.235
```

## API

| Calling | Returning |
|---|---|
| `Math. ROUND ( num, digit )` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `num` | `Number` | The number to round. |
| `digit` | `Number` | The number of digits after the decimal point. |