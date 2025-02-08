# brms.getRuleByAlias

`getRuleByAlias`関数は、[innorules](https://www.escco.co.jp/innorules/)のBRMSからエイリアスでルールを呼び出すために用意されています。その戻り値は`Record`クラスのインスタンスです。

## サンプル

```javascript
var record = brms.getRuleByAlias("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `brms. getRuleByAlias ( ruleAlias, params )` | `Record` |
| `brms. getRuleByAlias ( ruleAlias, params, ruleDate )` | `Record` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `ruleAlias` | `String` | BRMSに保存されているルールのエイリアス。 |
| `params` | `JSON Object` | ルールに必要な値を送信します。<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | 呼び出し日。デフォルトはシステム日付です。 |