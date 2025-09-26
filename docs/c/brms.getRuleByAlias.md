# brms.getRuleByAlias

`getRuleByAlias` 函数用于通过别名从 [innorules](https://www.escco.co.jp/innorules/) 的 BRMS 中调用规则。其返回值是 `Record` 类的实例。

## 示例

```javascript
var record = brms.getRuleByAlias("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| 调用 | 返回值 |
|---|---|
| `brms. getRuleByAlias ( ruleAlias, params )` | [`Record`](record.md) |
| `brms. getRuleByAlias ( ruleAlias, params, ruleDate )` | [`Record`](record.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `ruleAlias` | `String` | 存储在 BRMS 中的规则别名。 |
| `params` | `JSON 对象` | 发送规则所需的值。<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | 调用日期。默认为系统日期。 |