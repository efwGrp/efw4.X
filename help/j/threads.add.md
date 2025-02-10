# Threads.add

`add`関数は、`threads`オブジェクトにスレッドを追加します。

## サンプル

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

| 呼び出し | 戻り値 |
|---|---|
| `threads. add ( thread )` | `Threads` |

## パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `thread` | `object` | 追加されるスレッド。`run`という名前の関数を持っている必要があります。 |