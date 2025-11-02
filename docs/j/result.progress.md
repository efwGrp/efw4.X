# Result.progress

`progress` 関数は、クライアント ブラウザーに進行状況ダイアログを表示します。

## サンプル

```javascript
var result = new Result();
result.progress("hello world!",30);efw.wsSend(result);
result.progress("hello world!",100,true);efw.wsSend(result);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. progress ( message, percent )` | `Result` |
| `result. progress ( message, percent, closeFlag )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | 進行状況ダイアログに表示する情報。 |
| `percent` | `Number` | ダイアログ内の進行状況バーの値。 |
| `closeFlag` | `Boolean` | `true` で進行状況ダイアログを閉じる。|
