# properties.get

`get` 函数从 `efw.properties` 文件检索数据。

## 示例

```javascript
var bln = properties.get("efw.login.check", false);
var str = properties.get("efw.login.key");
```

## API

| 调用 | 返回值 |
|---|---|
| `properties. get ( key )` | `String` |
| `properties. get ( key, defaultValue )` | `String` \| `Number` \| `Boolean` (与 `defaultValue` 的类型相同) |

| 参数 | 类型 | 描述 |
|---|---|---|
| `key` | `String` | 标识属性。 |
| `defaultValue` | `String` \| `Number` \| `Boolean` | 如果 `efw.properties` 文件中未定义该属性，则使用的默认值。 |