# String.base64Encode

`base64Encode` 函数使用 Base64 编码字符串。此函数由 [base64](https://github.com/dankogai/js-base64) 提供支持。

## 示例

```javascript
var value;
value = "A=B B=C C=D".base64Encode(); // value = "QT1CIEI9QyBDPUQ=";
value = value.base64Decode(); // value = "A=B B=C C=D"

// 注意：下一行使用 base64EncodeURI，而不是 base64Encode
value = "A=B B=C C=D".base64EncodeURI(); // value = "QT1CIEI9QyBDPUQ";
value = value.base64Decode(); // value = "A=B B=C C=D"
```

## API

| 调用 | 返回值 |
|---|---|
| `string. base64Encode ( )` | `String` |