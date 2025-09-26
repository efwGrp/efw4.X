# rest.get

`get`関数は、GETメソッドを使用してREST APIを呼び出します。`null`またはJSONオブジェクトを返します。

## サンプル

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `rest. get ( apiUrl )` | `null` または `JSON` |
| `rest. get ( apiUrl, heads )` | `null` または `JSON` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `apiUrl` | `String` | REST APIのURL |
| `heads` | `JSON Object` | 追加のリクエストヘッダー |