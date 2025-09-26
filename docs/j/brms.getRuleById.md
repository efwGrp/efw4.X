# brms.getRuleById

`getRuleById`関数は、[innorules](https://www.escco.co.jp/innorules/)のBRMSからIDでルールを呼び出すために用意されています。その戻り値は`Record`クラスのインスタンスです。

## サンプル

```javascript
var record = brms.getRuleById("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `brms. getRuleById ( ruleId, params )` | [`Record`](record.md) |
| `brms. getRuleById ( ruleId, params, ruleDate )` | [`Record`](record.md) |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ruleId` | `String` | BRMSに保存されているルールのID。 |
| `params` | `JSON Object` | ルールに必要な値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | 呼び出し日。デフォルトはシステム日付です。 |