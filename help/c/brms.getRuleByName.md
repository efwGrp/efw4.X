# brms.getRuleByName

`getRuleByName` 函数用于通过名称从 [innorules](https://www.escco.co.jp/innorules/) 的 BRMS 中调用规则。其返回值是 `Record` 类的实例。

## 示例

```javascript
var record = brms.getRuleByName("ChineseFavorites", {
	"lessThan" : 30
}).sort("years", "asc");
```

## API

| 调用 | 返回值 |
|---|---|
| `brms. getRuleByName ( ruleName, params )` | [`Record`](record.md) |
| `brms. getRuleByName ( ruleName, params, ruleDate )` | [`Record`](record.md) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `ruleName` | `String` | 存储在 BRMS 中的规则名称。 |
| `params` | `JSON 对象` | 发送规则所需的值。<br>```{"param1":value1,"param2":value2,...}``` |
| `ruleDate` | `Date` | 调用日期。默认为系统日期。 |