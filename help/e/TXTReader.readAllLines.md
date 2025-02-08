# TXTReader.readAllLines

The `readAllLines` function reads all lines from a text file into an array of arrays (a matrix).

## Sample

```javascript
// The content of the test.txt file is:
// 12345678901234567890
// 11111222223333344444
// 99999777777777722222

var regFieldsDef = "(.{5})(.{10})(.{5})";
var txtReader = new TXTReader("input/test.txt", regFieldsDef, "MS932");
var array = txtReader.readAllLines();

// The returned array is:
// [
//   ["12345", "6789012345", "67890"],
//   ["11111", "2222233333", "44444"],
//   ["99999", "7777777777", "22222"]
// ]
```

## API

| Calling | Returning |
|---|---|
| `txtReader. readAllLines ( )` | `Array` |
