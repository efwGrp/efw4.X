# session.set

`set` 関数は、現在のセッションにデータを格納します。

## サンプル

```javascript
session.set("USER_ID", "Wang");
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `session. set ( key, value )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | セッション情報を識別するために使用するキー。 |
| `value` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... | セッションに格納する情報。 |