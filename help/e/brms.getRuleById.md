# brms.getRuleById

The `getRuleById` function is established to call a rule by Id from the BRMS of [innorules](https://www.escco.co.jp/innorules/). Its return is an instance of the `Record` class.

## Sample

```javascript
var record = brms.getRuleById("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| Calling | Returning |
|---|---|
| `brms. getRuleById ( ruleId, params )` | [`Record`](record.md) |
| `brms. getRuleById ( ruleId, params, ruleDate )` | [`Record`](record.md) |

| Parameters | Type | Description |
|---|---|---|
| `ruleId` | `String` | The Id of a rule stored in BRMS. |
| `params` | `JSON Object` | To send values which are required by the rule.<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | The calling date. Default is the system date. |
