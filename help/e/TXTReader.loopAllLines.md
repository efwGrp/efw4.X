# TXTReader.loopAllLines

The `loopAllLines` function iterates over all lines in the text file, calling a callback function for each line.

## Sample

```javascript
// The content of the test.txt file is:
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
txtReader.loopAllLines(callback); // The callback function will be executed three times.

function callback(aryField, index) {
  // ... your code here ...
}
```

## API

| Calling | Returning |
|---|---|
| `txtReader. loopAllLines ( callback )` | `void` |  *(Technically, many `loop` functions in JS return the original object.  However, it's more accurate here to say `void` as the primary purpose isn't to use the return value.)*

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `callback ( aryField, index )` | `Function` | The function to be executed for each line. <br> `aryField`: The array of field values for the current line. <br> `index`: The line number (starting from 0). |