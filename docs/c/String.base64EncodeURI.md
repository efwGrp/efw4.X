# String.base64EncodeURI

`base64EncodeURI` 函数使用 Base64 编码字符串。编码后的字符串可以用作 ID。

此函数由 [base64](https://github.com/dankogai/js-base64) 提供支持。

## 示例

```javascript
var value;
value=("A=B B=C C=D".base64Encode());//value="QT1CIEI9QyBDPUQ=";
value=value.base64Decode();//value="A=B B=C C=D"

value=("A=B B=C C=D".base64EncodeURI());//value="QT1CIEI9QyBDPUQ";
value=value.base64Decode();//value="A=B B=C C=D"
```

## API

| 调用 | 返回值 |
|---|---|
| `string. base64EncodeURI ( )` | `String` |