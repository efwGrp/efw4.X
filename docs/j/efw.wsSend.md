# efw.wsSend

`wsSend` 関数は、イベント実行中にクライアントに結果を送信するために用意されています。
この関数は、Efw 関数が Websocket モードの場合にのみ呼び出すことができます。

送信が成功した場合は `true` を返し、そうでない場合は `false` を返します。

## サンプル

```javascript
efw.wsSend(new Result().progress("hello world!",30));
efw.wsSend(new Result().progress("hello world!",100,true));
```
## API

| 呼び出し | 戻り値 |
|---|---|
| `efw. wsSend ( result )` | `Boolean` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `result` | `Result` | 送信する結果オブジェクト。 |