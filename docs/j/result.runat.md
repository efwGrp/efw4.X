# Result.runat

`runat` 関数は、後続の操作（`remove`、`append`、`withdata`など）が適用されるWebページ上のターゲット要素を指定します。基本的に、これらの操作のコンテキストを設定します。

## サンプル

```javascript
var result = new Result();
result.runat("#table1");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. runat ( )` | `Result` |
| `result. runat ( selector )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `selector` | `String` | データを表示する要素を識別するjQueryセレクタ。デフォルトは`"body"`です。 |