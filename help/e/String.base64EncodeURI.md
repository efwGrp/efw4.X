# String.base64EncodeURI

The `base64EncodeURI` function encodes a String using Base64. The encoded string can be used as an ID.

This function is powered by [base64](https://github.com/dankogai/js-base64).

## Sample

```javascript
var value;
value=("A=B B=C C=D".base64Encode());//value="QT1CIEI9QyBDPUQ=";
value=value.base64Decode();//value="A=B B=C C=D"

value=("A=B B=C C=D".base64EncodeURI());//value="QT1CIEI9QyBDPUQ";
value=value.base64Decode();//value="A=B B=C C=D"
```

## API

| Calling | Returning |
|---|---|
| `string. base64EncodeURI ( )` | `String` |