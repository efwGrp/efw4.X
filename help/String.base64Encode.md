# String.base64Encode

The `base64Encode` function encodes a String using Base64. This function is powered by [base64](https://github.com/dankogai/js-base64).

## Sample

```javascript
var value;
value = "A=B B=C C=D".base64Encode(); // value = "QT1CIEI9QyBDPUQ=";
value = value.base64Decode(); // value = "A=B B=C C=D"

// Note: The following line uses base64EncodeURI, not base64Encode
value = "A=B B=C C=D".base64EncodeURI(); // value = "QT1CIEI9QyBDPUQ";
value = value.base64Decode(); // value = "A=B B=C C=D"
```

## API

| Calling | Returning |
|---|---|
| `string. base64Encode ( )` | `String` |