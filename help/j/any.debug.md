# any.debug

`debug`関数は、任意のオブジェクトの情報をコンソールに出力するために提供されています。

`any = { String | Number | Boolean | Date | Array | Function | Object | Excel | Record | Result }`

## サンプル

```javascript
"hello world!".debug("テスト1");
(123).debug("テスト1");
(true).debug("テスト1");
(new Date()).debug("テスト2");

return (new Result()).runat().withData({
	"#userId" : "Wang"
}.debug("テスト3")).debug("テスト4");
```

## API

| 呼び出し | 戻り値 |
|---|---|
| `any. debug ( label )` | `String` \| `Number` \| `Boolean` \| `Date` \| `Array` \| `Function` \| `Object` \| `Excel` \| `Record` \| `Result` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `label` | `String` | デバッグ情報の前に出力されるラベル。 |