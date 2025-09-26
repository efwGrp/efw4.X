# properties.get

`get`関数は、`efw.properties`ファイルからデータを取得します。

## サンプル

```javascript
var bln = properties.get("efw.login.check", false);
var str = properties.get("efw.login.key");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `properties. get ( key )` | `String` |
| `properties. get ( key, defaultValue )` | `String` \| `Number` \| `Boolean` （`defaultValue`の型）|

| パラメータ | 型 | 説明 |
|---|---|---|
| `key` | `String` | プロパティを識別します。 |
| `defaultValue` | `String` \| `Number` \| `Boolean` | プロパティが`efw.properties`ファイルで定義されていない場合のデフォルト値。 |