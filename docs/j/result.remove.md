# Result.remove

`remove`関数は、直近の`runat`呼び出しで指定された要素から要素を削除します。`runat`ごとに一度しか呼び出すことができません。同じ`runat`内での後続の呼び出しは無効です。

## サンプル

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. remove ( selector )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `selector` | `String` | 削除する要素を識別するjQueryセレクタ。 |