# load

加载并评估来自文件、URL 或脚本对象的脚本。

## 示例

```javascript
// 可以从文件、URL 加载脚本

load("foo.js"); // 从当前目录的文件 "foo.js" 加载脚本
load("[http://www.example.com/t.js](http://www.example.com/t.js)"); // 从给定 URL 加载脚本文件

// 从对象的属性加载脚本。

// 对象应具有 "script" 和 "name" 属性。
//   "script" 属性包含脚本的字符串代码。
//   "name" 属性指定用于报告脚本错误的名称。
// 这几乎与标准的 "eval" 相同，只是它将一个名称与脚本字符串关联起来以进行调试。

load({ script: "print('hello')", name: "myscript.js"})

// load 也可以从伪 URL 加载，例如 "nashorn:"、"fx:"、"classpath:"

// "nashorn:" 伪 URL 方案
// 用于 Nashorn 的内置脚本。

// 加载 Nashorn 的解析器支持脚本 - 在全局范围内定义 'parse' 函数

load("nashorn:parser.js");

// 加载 Mozilla 兼容性脚本 - 它定义了全局函数，
// 例如 Rhino 兼容性的 importPackage、importClass。

load("nashorn:mozilla_compat.js");

// "fx:" 伪 URL 方案，用于 JavaFX 支持脚本
// "classpath:" 伪 URL 方案，用于从 jjs 类路径 jar 和目录加载脚本

load("classpath:foo.js"); // 加载在 jjs -classpath 目录中找到的第一个 foo.js
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions
