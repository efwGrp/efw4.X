# Web 事件

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
    "#txt_testdate"   : function(){
        var date1=new Date();
        var date2=new Date();
        date2.setDate(date1.getDate()+6);
        return "format:yyyy-MM-dd;required:true;display-name:Test Date;"
            +"min:"+date1.format("yyyy-MM-dd")+";"
            +"max:"+date2.format("yyyy-MM-dd")+";" ; // Fixed typo here
    },
    "#txt_password"   :"secure:true",//the secure value will be encoded before sending.
    ... 
};
myWebEvent.fire         = function ( requestParams ) {
    return (new Result()).alert("hello world! Your entries are correct.");
};
```


### 事件变量

事件变量必须与事件文件名相同。在示例中，它是 "myWebEvent"。

### 服务定义

```javascript
myWebEvent.service = {
    max: 10,
    message:'系统繁忙，请稍候。',
    retriable:true,
    interval:20,
};
```

| 参数 | 描述 | 注意事项 |
|---|---|---|
| `max` | 可以同时执行的最大请求数。 | 对于有服务定义的事件，"max" 是必需的。 |
| `message` | 当达到最大请求数时显示的消息。 | "message" 是可选的。 |
| `retriable` | 事件是否会自动尝试重新执行。 | 默认值为 `false`。 |
| `interval` | 重新执行的间隔。 | 默认值为 30 秒。"interval" 仅当 "retriable" 为 `true` 时启用。 |

### 参数格式

```javascript
myWebEvent.paramsFormat = {
    selector1 : null,
    selector2 : "checkStyle",
    selector3 : function(){ return "checkStyle"; },
    { selector4 : ... , },
    [ { selector5 : ... , } ],
};
```

### 参数格式 - 选择器规则

要引用 jQuery 关于选择器规则的信息。

| 类型 | 描述 | 正常情况 | 异常情况 |
|---|---|---|---|
| `selector : null` | 通过 jQuery 选择器从客户端获取单个输入数据，不进行输入检查。 | 如果一个 HTML 标签与选择器匹配，则使用 `value` 属性或 `text` 属性作为 `fire` 方法的输入数据。 | 如果多个标签与选择器匹配，则会出错。 |
| `selector : "checkStyle"` | 通过 jQuery 选择器从匹配的元素获取单个输入数据，并进行输入检查。 | 如果输入数据与检查样式匹配，则会使用它。 | 如果多个标签与选择器匹配，则会出错。<br>如果输入数据与检查样式不匹配，则会出错。 |
| `selector : function(){ return "checkStyle"; }` | 通过 jQuery 选择器从匹配的元素获取单个输入数据，并进行输入检查，检查样式由函数创建。 | 如果输入数据与检查样式匹配，则会使用它。 | 如果多个标签与选择器匹配，则会出错。<br>如果输入数据与检查样式不匹配，则会出错。 |
| `selector : {...}` | 获取存储在与选择器匹配的元素中的多个输入数据。 | 如果一个元素与选择器匹配，则会使用它。并且选择器将作为子选择器的上下文。 | 如果多个标签与选择器匹配，则会出错。 |
| `selector : [{...}]` | 获取存储在与选择器匹配的元素中的输入数据数组。 | 与选择器匹配的多个元素将作为子选择器的上下文。 | - |

### 检查样式

| 项目 | 值 | 描述 | 错误信息 |
|---|---|---|---|
| `display-name` | `String` | 将在检查错误消息中显示的元素名称。 |  |
| `max-length` | `Number` | 元素的最大长度。 | `MaxLengthOverMessage` |
| `format` | `String` | 元素期望的数字格式或日期格式。 | `NumberIsReuqiredMessage` 或 `DateIsReuqiredMessage` |
| `min` | `String` | 元素的最小（格式化）值。 | `MinOrMaxOverMessage` 或 `MinOverMessage` |
| `max` | `String` | 元素的最大（格式化）值。 | `MinOrMaxOverMessage` 或 `MaxOverMessage` |
| `required` | `Boolean` | 是否需要该元素。 | `IsRequiredMessage` |
| `accept` | `String` | 以“,”分隔的扩展文件名，这些文件名将被接受作为上传文件。 | `NotAcceptMessage` |
| `secure` | `String` | 元素值是否应该被编码。 |  |

### Fire 方法

### 事件返回

事件返回值必须为空或 [Result](result.new.md) 的实例。

### i18n 消息键

为了支持多语言，您可以在以下项目中设置消息键。

*   检查样式中的 `display-name`。
*   `Result` 对象中的任何字符串值。

详细信息请参阅下一个示例。

```js
var helloI18n_submit={};
helloI18n_submit.paramsFormat={};
helloI18n_submit.fire=function(params){
	return new Result()
	.alert("{here} {language} {testservermsg}");
}
```