# Web Event

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/myWebEvent.js
////////////////////////////////////////
var myWebEvent={};
myWebEvent.service={
    max:10,
    message:'system is busy,please wait a while',
    retriable:true,
    interval:20,
};
myWebEvent.paramsFormat = { 
    "#txt_teststring" : "display-name:Test String;max-length:10;",
    "#txt_testnumber" : "format:#,##0.00;required:true;display-name:Test Number;min:-10.00;max:1,000.00",
    "#txt_testdate"   : function(){
        var date1=new Date();
        var date2=new Date();
        date2.setDate(date1.getDate()+6);
        return "format:yyyy-MM-dd;required:true;display-name:Test Date;"
            +"min:"+date1.format("yyyy-MM-dd")+";"
            +"max:"+date2.format("yyyy-MM-dd")+";" ; // Fixed typo here
    },
    "#txt_password"   :"secure:true",//the secure value will be encoded before sending.
    ... 
};
myWebEvent.fire         = function ( requestParams ) {
    return (new Result()).alert("hello world! Your entries are correct.");
};
```


### Event Variable
The event variable must be the same as the event file name. In the sample, it is "myWebEvent".

### Service Definition

```javascript
myWebEvent.service = {
    max: 10,
    message:'System busy please wait.',
    retriable:true,
    interval:20,
};
```

| Parameters | Description | Attention |
|---|---|---|
| `max` | The max requests count can be execute at the same time. | "max" is required for events with service definition. |
| `message` | The message when the max requests count is reached. | "message" is optional. |
| `retriable` | The event will try to re-execute automatically or not. | The default value is `false`. |
| `interval` | The interval for re-execution. | The default value is 30 seconds. "interval" is enabled only when "retriable" is `true`. |

### Params Format

```javascript
myWebEvent.paramsFormat = {
    selector1 : null,
    selector2 : "checkStyle",
    selector3 : function(){ return "checkStyle"; },
    { selector4 : ... , },
    [ { selector5 : ... , } ],
};
```

### Params Format - Selector Rules

To reference jQuery about the rules of selectors.

| Type | Description | Normal | Abnormal |
|---|---|---|---|
| `selector : null` | To get a single input data from the client by the jQuery selector without input checking. | If one HTML tag is matched to the selector, the `value` attribute or `text` attribute will be used as the input data for the `fire` method. | Error if multiple tags are matched to the selector. |
| `selector : "checkStyle"` | To get a single input data from the element matched by the jQuery selector with input checking. | If the input data matches the check style, it will be used. | Error if multiple tags are matched to the selector.<br>Error if the input data does not match the check style. |
| `selector : function(){ return "checkStyle"; }` | To get a single input data from the element with input checking matched by the jQuery selector which is created by a function. | If the input data matches the check style, it will be used. | Error if multiple tags are matched to the selector.<br>Error if the input data does not match the check style. |
| `selector : {...}` | To get several input datas stored in the element matched by the selector. | If one element is matched to the selector, it will be used. And the selector will be the context for the sub-selectors. | Error if multiple tags are matched to the selector. |
| `selector : [{...}]` | To get an array of input datas stored in the element matched by the selector. | Multiple elements matched to the selector will be the context for the sub-selectors. | - |


### Check Style

| Item | Value | Description | Error |
|---|---|---|---|
| `display-name` | `String` | The element name which will be shown in the check error message. |  |
| `max-length` | `Number` | The max length for an element. | `MaxLengthOverMessage` |
| `format` | `String` | The number format or date format expected for an element. | `NumberIsReuqiredMessage` or `DateIsReuqiredMessage` |
| `min` | `String` | The min (formatted) value for an element. | `MinOrMaxOverMessage` or `MinOverMessage` |
| `max` | `String` | The max (formatted) value for an element. | `MinOrMaxOverMessage` or `MaxOverMessage` |
| `required` | `Boolean` | Whether the element is required. | `IsRequiredMessage` |
| `accept` | `String` | The extension file-names separated by "," which will be accepted as uploading files. | `NotAcceptMessage` |
| `secure` | `String` | Whether the element value should be encoded. |  |

### Fire Method

### Event Return

The event return must be void or an instance of [Result](result.new.md).

### i18n Message Key

For multi-language support, you can set message keys in the following items.

*   `display-name` in check style.
*   Any string value in the `Result` object.

 See details in the next Sample.
```js
var helloI18n_submit={};
helloI18n_submit.paramsFormat={};
helloI18n_submit.fire=function(params){
	return new Result()
	.alert("{here} {language} {testservermsg}");
}
```