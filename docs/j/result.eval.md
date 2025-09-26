# Result.eval

`eval`関数は、クライアント側でJavaScriptスクリプトを実行します。複数回呼び出すことができます。

## サンプル

```javascript
var result = new Result()
.eval("$('#table1 tr:even').css('background-color','green');")
.eval("$('#table1 tr:odd').css('background-color','yellow');");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. eval ( script )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `script` | `String` | Webページ上で実行されるJavaScriptコード。 |
