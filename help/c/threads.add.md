# Threads.add

`add` 函数向 `threads` 对象添加一个线程。

## 示例

```javascript
var threads = new Threads(4);
threads.add({ index: 0, successed: false, run: operate });
threads.add({ index: 1, successed: false, run: operate });
threads.add({ index: 2, successed: false, run: operate });
threads.add({ index: 3, successed: false, run: operate });

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
| `threads.add(thread)` | `Threads` |

## 参数

| 参数 | 类型 | 描述 |
|---|---|---|
| `thread` | `object` | 要添加的线程。它必须有一个名为 `run` 的函数。 |