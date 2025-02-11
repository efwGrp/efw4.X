# loadWithNewGlobal

`loadWithNewGlobal` 与 `load` 函数类似，它从文件、URL 或脚本对象加载脚本。但是，与 `load` 不同，`loadWithNewGlobal` 创建一个新的 ECMAScript 全局作用域对象，并将脚本加载到其中。加载的脚本的全局定义位于此新的全局作用域中。此外，加载的脚本对内置对象（例如 `String.prototype.indexOf`）所做的修改*不会*反映在调用者的全局作用域中；这些修改仅影响新创建的全局作用域。

## 示例

```javascript
loadWithNewGlobal({
    script: "foo = 333; print(foo)",
    name: "test"
});

// 打印 undefined，因为 "foo" 是在新全局中定义的，而不是在这里
print(typeof foo);
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions