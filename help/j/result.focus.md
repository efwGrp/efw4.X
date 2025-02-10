# Result.focus

`focus`関数は、クライアント側の指定された要素にフォーカスを設定します。一度しか呼び出すことができません。

## サンプル

```javascript
var result = new Result();
result.focus("#text1");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. focus ( selector )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `selector` | `String` | フォーカスを受け取る要素を識別するjQueryセレクター。 |