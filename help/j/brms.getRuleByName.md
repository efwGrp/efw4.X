# brms.getRuleByName

`getRuleByName`関数は、[innorules](https://www.escco.co.jp/innorules/)のBRMSから名前でルールを呼び出すために用意されています。その戻り値は`Record`クラスのインスタンスです。

## サンプル

```javascript
var record = brms.getRuleByName("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `brms. getRuleByName ( ruleName, params )` | `Record` |
| `brms. getRuleByName ( ruleName, params, ruleDate )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ruleName` | `String` | BRMSに保存されているルールの名前。 |
| `params` | `JSON Object` | ルールに必要な値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | 呼び出し日。デフォルトはシステム日付です。 |