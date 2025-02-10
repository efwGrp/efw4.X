# rest.getStatus

`getStatus`関数は、REST API呼び出し後のHTTPステータスコードを取得します。整数を返します。

## サンプル

```javascript
var ret = rest.get("http://localhost:8080/restSample/efwRestAPI/customer/u001");
// {"id":"u001","nm":"customer name"}
var status = rest.getStatus();
// 200
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `rest. getStatus ( )` | `number` |