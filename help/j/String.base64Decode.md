# String.base64Decode

`base64Decode` 関数は、Base64 エンコードされた文字列をデコードします。この関数は、[base64](https://github.com/dankogai/js-base64) によって提供されています。

## サンプル

```javascript
var value;
value = "A=B B=C C=D".base64Encode(); // value = "QT1CIEI9QyBDPUQ=";
value = value.base64Decode(); // value = "A=B B=C C=D"

value = "A=B B=C C=D".base64EncodeURI(); // value = "QT1CIEI9QyBDPUQ";
value = value.base64Decode(); // value = "A=B B=C C=D"
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `string. base64Decode ( )` | `String` |