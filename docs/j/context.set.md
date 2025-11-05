# context.set

`set` 関数は、コンテキストにデータを格納します。

## サンプル

```javascript
context.set("BROADCAST_CONTENT", "hello the time is "
	+new Date().format("yyyy/MM/dd HH:mm:ss"));
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `context. set ( key, value )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | コンテキスト情報を識別するために使用するキー。 |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | コンテキストに格納する情報。 |