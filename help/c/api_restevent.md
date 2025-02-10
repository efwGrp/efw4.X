# Rest 事件

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/customer.js
////////////////////////////////////////
//通过 URL http://localhost:8080/restSample/efwRestAPI/customer/u001 调用

var customer={};
customer.PUT=function(keys,params){
...
};
customer.POST=function(keys,params){
...
};
customer.GET=function(keys){
...
};
customer.DELETE=function(keys){
...
};
```


### 事件变量

事件变量必须与事件文件名相同。在示例中，它是 "customer"。

### PUT POST GET DELETE 方法

### 事件返回

事件返回值必须为空或任何可以转换为 JSON 的内容。

### HTTP 状态

| 状态码 | 描述 |
|---|---|
| `( 404 ) Not Found` | URL 中任何不存在的事件 ID。 |
| `( 500 ) Internal Server Error` | 方法中的任何异常。 |
| `( 200 ) OK` | 返回值不为空。 |
| `( 204 ) No Content` | 返回值为空。 |