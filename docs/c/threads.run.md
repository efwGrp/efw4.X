# Threads.run

`run` 函数执行 `threads` 对象中的所有线程。

## 示例

```javascript
var threads = new Threads(4);
threads.add({ index: 0, successed: false, run: operate });
threads.add({ index: 1, successed: false, run: operate });
threads.add({ index: 2, successed: false, run: operate });
threads.add({ index: 3, successed: false, run: operate });

var errorData = threads.run().seek("successed", "eq", false);
if (errorData.length !== 0) {
 var errorDataArr = errorData.getArray();
 for (var i = 0; i < errorDataArr.length; i++) {
  console.debug("Operation has errors on index: " + errorDataArr[i].index); // 改进的错误信息
 }
}

function operate() {
 if (this.index > 2) {
  this.successed = false;
 } else {
  this.successed = true;
 }
}
```
## API

| 调用 | 返回值 |
|---|---|
| `threads.run()` | 包含所有线程对象的 `Record`。 |