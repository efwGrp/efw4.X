# 全局事件

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/global.js
////////////////////////////////////////
var global={};
global.fire=function(){
...
};
```

### 事件变量

事件变量必须命名为 "global"，这与文件名相同。

### Fire 方法

请注意不要在全局事件中操作 session 对象。

### 事件返回

全局事件不返回任何内容。