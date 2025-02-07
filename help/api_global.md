# Global Event

```javascript
////////////////////////////////////////
//web/WEB-INF/efw/event/global.js
////////////////////////////////////////
var global={};
global.fire=function(){
...
};
```

### Event Variable
The event variable must be named "global," which is the same as the file name.

### Fire Method
Be careful not to operate on the session object in the global event.

### Event Return
The global event does not return anything.
