# Result.append

`append`関数は、直近の`runat`呼び出しで指定された要素にコンテンツを追加します。`runat`ごとに一度しか呼び出すことができません。同じ`runat`内での後続の呼び出しは無効です。

## サンプル

```javascript
var result = new Result();
result
.runat("#table1")
.remove("tr")
.append("<tr><td>{data1}</td><td>{{data2}}</td></tr>");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `result. append ( mask )` | `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `mask` | `String` | 削除されたタグを置き換えるデータプレースホルダーを含むHTMLスニペット。例：<br> ```<tr><td>{data1}</td><td>{{data2}}</td></tr>```<br> `{data1}`は置換され、`data1`フィールドの値でHTMLエンコードされます。`{{field}}`は置換されますが、HTMLエンコード*されません*。 |
