# Math.ROUNDDOWN

The `Math.ROUNDDOWN` function rounds a number down, similar to the Excel function of the same name.

## Sample

```javascript
Math.ROUNDDOWN(5.5,0);    // 5
Math.ROUNDDOWN(2.5,0);    // 2
Math.ROUNDDOWN(1.6,0);    // 1
Math.ROUNDDOWN(1.1,0);    // 1
Math.ROUNDDOWN(1.0,0);    // 1
Math.ROUNDDOWN(-1.0,0);   // -1
Math.ROUNDDOWN(-1.1,0);   // -1
Math.ROUNDDOWN(-1.6,0);   // -1
Math.ROUNDDOWN(-2.5,0);   // -2
Math.ROUNDDOWN(-5.5,0);   // -5

Math.ROUNDDOWN(1.2345,3);  // 1.234
```

## API

| Calling | Returning |
|---|---|
| `Math. ROUNDDOWN ( num, digit )` | `Number` |

| Parameters | Type | Description |
|---|---|---|
| `num` | `Number` | The number to round. |
| `digit` | `Number` | Number of digits after the decimal point. |