# efw.dialog.progress

`progress` 関数は、進捗ダイアログを呼び出すために用意されています。
これは、Result.progress メソッドの基本関数です。

## サンプル

```html
<script>
	function btnClick(){
		efw.dialog.progress("hello world ! ",20);
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| 呼び出し |
|---|
| `efw. dialog. progress ( message, percent )` |
| `efw. dialog. progress ( message, percent, closeFlag )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | 進行状況ダイアログに表示する情報。 |
| `percent` | `Number` | ダイアログ内の進行状況バーの値。 |
| `closeFlag` | `Boolean` | `true`で進行状況ダイアログを閉じる。 |
