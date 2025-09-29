# 批量事件

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/myBatchEvent.js
////////////////////////////////////////
var myBatchEvent={};
myBatchEvent.paramsFormat = {
                "sysDate" : "format:yyyy/MM/dd;display-name:sysDate;"
              };
myBatchEvent.fire    = function ( params ) {
                //return;
                //return { "param" : params.sysDate };
                return (new Batch())
                .echo("hello world!")
                .exit(1);
                  };
```

### 事件变量

事件变量必须与事件文件名相同。在示例中，它是 "myBatchEvent"。

### 参数格式

与 [Web 事件](api_webevent.md) 相同。

### 检查样式

与 [Web 事件](api_webevent.md) 相同。

### Fire 方法

### 事件返回

事件返回值必须为空、[Batch](batch.new.md) 的实例，或任何可以转换为 JSON 的内容。