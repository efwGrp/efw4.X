# rest.delete

`delete`関数は、DELETEメソッドを使用してREST APIを呼び出します。`null`またはJSONオブジェクトを返します。

## サンプル

```javascript
var ret = rest.delete("http://localhost:8080/restSample/efwRestAPI/customer/u001");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `rest. delete ( apiUrl )` | `null` または `JSON` |
| `rest. delete ( apiUrl, heads )` | `null` または `JSON` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `apiUrl` | `String` | REST APIのURL |
| `heads` | `JSON Object` | 追加のリクエストヘッダー |