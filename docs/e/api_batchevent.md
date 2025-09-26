# Batch Event

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/myBatchEvent.js
////////////////////////////////////////
var myBatchEvent={};
myBatchEvent.paramsFormat = { 
                                "sysDate" : "format:yyyy/MM/dd;display-name:sysDate;"
                            };
myBatchEvent.fire         = function ( params ) {
                                //return;
                                //return { "param" : params.sysDate };
                                return (new Batch())
                                .echo("hello world!")
                                .exit(1);
                            };
```

### Event Variable
The event variable must be the same as the event file name. In the sample, it is "myBatchEvent".

### Params Format
Same as [Web Event](api_webevent.md).

### Check Style
Same as [Web Event](api_webevent.md).

### Fire Method

### Event Return
The event return must be void, an instance of [Batch](batch.new.md), or anything that can be converted to JSON.