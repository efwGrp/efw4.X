# Result.attach

`attach`関数は、ファイルまたはフォルダのダウンロードを許可します。

## サンプル

```javascript
var result1 = (new Result())
.attach("test1.xls")
.attach("test2.xls");
var result2 = (new Result())
.attach("temp/test1.xls","temp")
.attach("temp/test2.xls","temp");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. attach ( path )` | `Result` |
| `result. attach ( path, zipBasePath )` | `Result` |
| `result. attach ( path, zipBasePath, isAbs )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `path` | `String` | ファイルまたはフォルダのパス。 |
| `zipBasePath` | `String` | ダウンロード用のzipアーカイブを作成するためのルートパス。 |
| `isAbs` | `boolean` | `path`が絶対パスか相対パスか（ストレージの場所からの相対パス）を示す。 |