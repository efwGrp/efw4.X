# rest.post

`post`関数は、POSTメソッドを使用してREST APIを呼び出します。JSONオブジェクトを返します。

## サンプル

```javascript
var params={"nm":"customer name 1"};
var ret = rest.post("http://localhost:8080/restSample/efwRestAPI/customer/u001",params);
// {"id":"u001","nm":"customer name 1"}
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `rest. post ( apiUrl, params )` | `null` または `JSON` |
| `rest. post ( apiUrl, params, heads )` | `null` または `JSON` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `apiUrl` | `String` | REST APIのURL |
| `params` | `JSON Object` | REST APIに送信するデータ |
| `heads` | `JSON Object` | 追加のリクエストヘッダー |