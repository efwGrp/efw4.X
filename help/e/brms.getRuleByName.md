# brms.getRuleByName

The `getRuleByName` function is established to call a rule by name from the BRMS of [innorules](https://www.escco.co.jp/innorules/). Its return is an instance of the `Record` class.

## Sample

```javascript
var record = brms.getRuleByName("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| Calling | Returning |
|---|---|
| `brms. getRuleByName ( ruleName, params )` | [`Record`](record.md) |
| `brms. getRuleByName ( ruleName, params, ruleDate )` | [`Record`](record.md) |

| Parameters | Type | Description |
|---|---|---|
| `ruleName` | `String` | The name of a rule stored in BRMS. |
| `params` | `JSON Object` | To send values which are required by the rule.<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | The calling date. Default is the system date. |
