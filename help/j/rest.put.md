# rest.put

`put`関数は、PUTメソッドを使用してREST APIを呼び出します。JSONオブジェクトを返します。

## サンプル

```javascript
var params={"nm":"customer name 1"};
var ret = rest.put("http://localhost:8080/restSample/efwRestAPI/customer/u001",params);
// {"id":"u001","nm":"customer name 1"}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `rest. put ( apiUrl, params )` | `null` または `JSON` |
| `rest. put ( apiUrl, params, heads )` | `null` または `JSON` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `apiUrl` | `String` | REST APIのURL |
| `params` | `JSON Object` | REST APIに送信するデータ |
| `heads` | `JSON Object` | 追加のリクエストヘッダー |