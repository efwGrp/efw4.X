<H1>String.base64EncodeURI</H1>

The base64EncodeURI function is established to encode a String by base64. The encoded string can be used as an Id.
This function is powered by <a href="https://github.com/dankogai/js-base64">base64</a>.

<h2>Sample</h2>

```javascript
var value;
value=("A=B B=C C=D".base64Encode());//value="QT1CIEI9QyBDPUQ=";
value=value.base64Decode();//value="A=B B=C C=D"

value=("A=B B=C C=D".base64EncodeURI());//value="QT1CIEI9QyBDPUQ";
value=value.base64Decode();//value="A=B B=C C=D"
```

<h2>API</h2>

<table>
<tr><th>Calling</th><th>Returning</th></tr>
<tr><td>{String} . base64EncodeURI ( )</td><td>{String}</td></tr>
</table>
