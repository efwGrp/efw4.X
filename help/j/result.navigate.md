# Result.navigate

`navigate` 関数は、クライアントを別の JSP ページにリダイレクトします。この関数は一度しか呼び出すことができません。

## サンプル

```javascript
var result = new Result();
result.navigate("次のページのURL");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. navigate ( url )` | `Result` |
| `result. navigate ( url, params )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `url` | `String` | クライアントがナビゲートするURL。 |
| `params` | `Object` | URLに追加されるパラメータ。<br> ```{param1:value1, param2:value2,...}``` |