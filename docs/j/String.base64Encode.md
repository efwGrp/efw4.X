# String.base64Encode

`base64Encode` 関数は、Base64 を使用して文字列をエンコードします。この関数は、[base64](https://github.com/dankogai/js-base64) によって提供されています。

## サンプル

```javascript
var value;
value = "A=B B=C C=D".base64Encode(); // value = "QT1CIEI9QyBDPUQ=";
value = value.base64Decode(); // value = "A=B B=C C=D"

// 注：次の行では、base64Encode ではなく base64EncodeURI を使用しています。
value = "A=B B=C C=D".base64EncodeURI(); // value = "QT1CIEI9QyBDPUQ";
value = value.base64Decode(); // value = "A=B B=C C=D"
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `string. base64Encode ( )` | `String` |