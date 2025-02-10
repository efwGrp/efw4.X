# session.get

`get` 関数は、現在のセッションからデータを取得します。

## サンプル

```javascript
var userId = session.get("USER_ID");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `session. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | セッション情報を識別するために使用するキー。 |