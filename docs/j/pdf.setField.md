# Excel.setCell

`setCell`関数は、セルに値、スタイルなどを設定するために使用されます。

## サンプル

```javascript
var pdf = new Pdf("mytemplate.pdf");
pdf
.setField("field1","helloworld")
.save("my.pdf").close();
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `pdf. setField ( fieldName, fieldValue )` | `Pdf` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `fieldName` | `String` | 項目名称. |
| `fieldValue` | `String` | 項目に設定する値。 |
