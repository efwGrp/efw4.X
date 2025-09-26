# Date.getYears

`getYears`関数は、指定された日付と現在時刻の間の年数を取得するために用意されています。

## サンプル

```javascript
var date = Date.parse("1980/01/01","yyyy/MM/dd");
var years = date.getYears();
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `date. getYears ( )` | `Number` |
| `date. getYears ( current )` | `Number` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `current` | `Date` | 現在の日付として使用される日付。 |