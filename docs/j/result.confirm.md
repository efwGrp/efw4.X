# Result.confirm

`confirm`関数は、確認ダイアログを表示します。一度しか呼び出すことができません。後続の呼び出しは無効です。ただし、`alert`が呼び出された場合、アラートメッセージは確認メッセージの*前に*確認ダイアログに表示されます。

## サンプル

```javascript
var result = new Result();
result.confirm("Let's do it,OK?" ,{"OK":"window.location='doit.jsp';","CANCEL":null});
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. confirm ( message, buttons )` | `Result` |
| `result. confirm ( message, buttons, title )` | `Result` |
| `result. confirm ( message, buttons, params )` | `Result` |
| `result. confirm ( message, buttons, title, params )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | 確認ダイアログに表示するメッセージ。プレースホルダーを使用できます。<br> ```xxxx{param1}yyy{param2}yy```<br> メッセージ内で"{param}"を定義できます。これは、`params`オブジェクト内の対応する値に置き換えられます。 |
| `buttons` | `Object` | ボタンとそのクリックアクションを定義します。<br> ```{buttonName1: script1, buttonName2: script2}```<br> スクリプトは、ボタンがクリックされた後、クライアント側で実行されます。 |
| `params` | `Object` | メッセージ内の"{param}"プレースホルダーを置き換えるために使用されるパラメータ。例：<br>```{param1: value1,param2: value2}``` |
| `title` | `String` | 確認ダイアログのタイトル |