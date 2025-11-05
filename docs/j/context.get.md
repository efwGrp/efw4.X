# context.get

`get` 関数は、コンテキストからデータを取得します。

## サンプル

```javascript
var content = context.get("BROADCAST_CONTENT");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `context. get ( key )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Object` \| `Array` \| ... |

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | コンテキスト情報を識別するために使用するキー。 |