# RESTイベント

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/customer.js
////////////////////////////////////////
//Call it by the url http://localhost:8080/restSample/efwRestAPI/customer/u001

var customer = {};
customer.PUT = function(keys, params) {
    // ...
};
customer.POST = function(keys, params) {
    // ...
};
customer.GET = function(keys) {
    // ...
};
customer.DELETE = function(keys) {
    // ...
};
```


### イベント変数

イベント変数は、イベントファイル名と同じである必要があります。この例では、"customer" です。

### PUT、POST、GET、DELETEメソッド

### イベントの戻り値

イベントの戻り値は、void、またはJSONに変換できる任意のオブジェクトである必要があります。

### HTTPステータス

| ステータスコード | 説明 |
|---|---|
| `(404) Not Found` | URLに存在しないイベントID。 |
| `(500) Internal Server Error` | メソッド内で例外が発生した場合。 |
| `(200) OK` | 戻り値がnullでない場合。 |
| `(204) No Content` | 戻り値がnullの場合。 |
