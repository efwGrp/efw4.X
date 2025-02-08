# Rest Event

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/customer.js
////////////////////////////////////////
//Call it by the url http://localhost:8080/restSample/efwRestAPI/customer/u001

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


### Event Variable
The event variable must be the same as the event file name. In the sample, it is "customer".

### PUT POST GET DELETE Method

### Event Return
The event return must be void or anything that can be converted to JSON.

### HTTP Status

| Status Code | Description |
|---|---|
| `( 404 ) Not Found` | Any non-existent event ID in the URL. |
| `( 500 ) Internal Server Error` | Any exception in methods. |
| `( 200 ) OK` | The return value is not null. |
| `( 204 ) No Content` | The return value is null. |
