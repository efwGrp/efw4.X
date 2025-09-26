# new Result

构造函数创建一个新的 `Result` 对象，用于从事件返回数据。

## 示例

```javascript
var result = new Result();
var result = new Result(true);
```

## API

| 调用 | 返回值 |
|---|---|
| `new Result ( )` | `Result` |
| `new Result ( withoutI18nTranslation )` | `Result` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `withoutI18nTranslation` | `Boolean` | 如果为真，则 `Result` 实例将不支持多种语言。 |
