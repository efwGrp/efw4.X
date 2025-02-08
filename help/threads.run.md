# Threads.run

The `run` function executes all threads in the `threads` object.

## Sample

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
    console.debug("Operation has errors on index: " + errorDataArr[i].index); // Improved error message
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

| Calling | Returning |
|---|---|
| `threads. run ( )` | A `Record` containing all thread objects. |
