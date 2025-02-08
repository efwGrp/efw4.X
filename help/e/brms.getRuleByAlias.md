# brms.getRuleByAlias

The `getRuleByAlias` function is established to call a rule by name from the BRMS of [innorules](https://www.escco.co.jp/innorules/).  Its return is an instance of the `Record` class.

## Sample

```javascript
var record = brms.getRuleByAlias("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| Calling | Returning |
|---|---|
| `brms. getRuleByAlias ( ruleAlias, params )` | `Record` |
| `brms. getRuleByAlias ( ruleAlias, params, ruleDate )` | `Record` |

| Parameters | Type | Description |
|---|---|---|
| `ruleAlias` | `String` | The alias of a rule stored in BRMS. |
| `params` | `JSON Object` | To send values which are required by the rule.<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | The calling date. Default is the system date. |

