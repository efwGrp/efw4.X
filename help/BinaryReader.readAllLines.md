# BinaryReader.readAllLines

The function to read all lines into a matrix of arrays.

## Sample

```javascript
//The content of the test.txt file is 
//"123456789012345678901111122222333334444499999777777777722222"
var binaryReader = new BinaryReader("input/test.txt", [5,10,5], ["MS932","MS932","MS932"], 20); 
var array = binaryReader.readAllLines();	

//The array return value is
//[ ["12345","6789012345","67890"]
//  ["11111","2222233333","44444"]
//  ["99999","7777777777","22222"] ]
```

## API

| Calling | Returning |
|---|---|
| `BinaryReader.readAllLines()` | `Array` |