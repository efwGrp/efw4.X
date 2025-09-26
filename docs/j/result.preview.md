# Result.preview

`preview` 関数は、クライアントブラウザーからサーバーファイルをプレビューします。

## サンプル

```javascript
var result = new Result();
result.preview("my.pdf");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. preview ( path )` | `Result` |
| `result. preview ( path , isAbs )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ファイルのパス。 |
| `isAbs` | `boolean` | `path`が絶対パスか相対パスか（ストレージの場所からの相対パス）を示す。 |