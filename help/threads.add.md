# Threads.add

The `add` function adds a thread to the `threads` object.

## Sample

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

| Calling | Returning |
|---|---|
| `threads. add ( thread )` | `Threads` |

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `thread` | `object` | The thread to be added. It must have a function named `run`. |