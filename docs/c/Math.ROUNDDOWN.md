# Math.ROUNDDOWN

`Math.ROUNDDOWN` 函数向下舍入一个数字，类似于 Excel 中同名的函数。

## 示例

```javascript
Math.ROUNDDOWN(5.5,0);    // 5
Math.ROUNDDOWN(2.5,0);    // 2
Math.ROUNDDOWN(1.6,0);    // 1
Math.ROUNDDOWN(1.1,0);    // 1
Math.ROUNDDOWN(1.0,0);    // 1
Math.ROUNDDOWN(-1.0,0);    // -1
Math.ROUNDDOWN(-1.1,0);    // -1
Math.ROUNDDOWN(-1.6,0);    // -1
Math.ROUNDDOWN(-2.5,0);    // -2
Math.ROUNDDOWN(-5.5,0);    // -5

Math.ROUNDDOWN(1.2345,3);  // 1.234
```

## API

| 调用 | 返回值 |
|---|---|
| `Math. ROUNDDOWN ( num, digit )` | `Number` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `num` | `Number` | 要舍入的数字。 |
| `digit` | `Number` | 小数点后的位数。 |