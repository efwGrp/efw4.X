# Math.ROUND

`Math.ROUND`関数は、Excelの同名の関数と同様に、数値を四捨五入します。

## サンプル

```javascript
Math.ROUND(5.5,0);    // 6
Math.ROUND(2.5,0);    // 3
Math.ROUND(1.6,0);    // 2
Math.ROUND(1.1,0);    // 1
Math.ROUND(1.0,0);    // 1
Math.ROUND(-1.0,0);   // -1
Math.ROUND(-1.1,0);   // -1
Math.ROUND(-1.6,0);   // -2
Math.ROUND(-2.5,0);   // -3
Math.ROUND(-5.5,0);   // -6

Math.ROUND(1.2345,3);  // 1.235
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `Math. ROUND ( num, digit )` | `Number` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `num` | `Number` | 丸める数値。 |
| `digit` | `Number` | 小数点以下の桁数。 |