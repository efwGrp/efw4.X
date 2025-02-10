# Result.alert

`alert`関数は、アラートダイアログを表示します。`alert`を複数回呼び出すと、アラートメッセージが連結されます。

## サンプル

```javascript
var result = new Result();
result.alert("good morning!").alert("good night!");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. alert ( message )` | `Result` |
| `result. alert ( message, title )` | `Result` |
| `result. alert ( message, params )` | `Result` |
| `result. alert ( message, title, params )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | アラートダイアログに表示するメッセージ。プレースホルダーを使用できます。<br> ```xxxx{param1}yyy{param2}yy``` <br>メッセージ内で"{param}"を定義できます。これは、`params`オブジェクト内の対応する値に置き換えられます。 |
| `params` | `Object` | メッセージ内の"{param}"プレースホルダーを置き換えるために使用されるパラメータ。例：<br> ```{param1: value1, param2: value2 }``` |
| `title` | `String` | アラートダイアログのタイトル |