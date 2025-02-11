# Math.ROUND

`Math.ROUND` 函数舍入一个数字，类似于 Excel 中同名的函数。

## 示例

```javascript
Math.ROUND(5.5,0);    // 6
Math.ROUND(2.5,0);    // 3
Math.ROUND(1.6,0);    // 2
Math.ROUND(1.1,0);    // 1
Math.ROUND(1.0,0);    // 1
Math.ROUND(-1.0,0);    // -1
Math.ROUND(-1.1,0);    // -1
Math.ROUND(-1.6,0);    // -2
Math.ROUND(-2.5,0);    // -3
Math.ROUND(-5.5,0);    // -6

Math.ROUND(1.2345,3);  // 1.235
```

## API

| 调用 | 返回值 |
|---|---|
| `Math. ROUND ( num, digit )` | `Number` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `num` | `Number` | 要舍入的数字。 |
| `digit` | `Number` | 小数点后的位数。 |