# 新しい Result

コンストラクタ関数は、イベントからのデータを返すために使用される新しい `Result` オブジェクトを作成します。

## サンプル

```javascript
var result = new Result();
var result = new Result(true);
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `new Result ( )` | `Result` |
| `new Result ( withoutI18nTranslation )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `withoutI18nTranslation` | `Boolean` | trueの場合該当`Result`インスタンスに多国語対応を実施しません。 |
