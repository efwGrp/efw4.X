# efw.dialog.alert

`alert`関数は、指定されたボタンを持つクライアント側のアラートを呼び出すために用意されています。これは、`Result.alert`と`Result.confirm`の基本関数です。

## サンプル

```html
<script>
	function btnClick(){
		efw.dialog.alert("入力を保存します。OKですか？",{
				OK:function(){Efw("myPage_save");},
				Close:null,
			},
			"保存しますか？",
		)
	}
</script>
<input type="button" value="送信" onclick="btnClick()">
```
## API

| 呼び出し |
|---|
| `efw. dialog. alert ( message )` |
| `efw. dialog. alert ( message, buttons )` |
| `efw. dialog. alert ( message, buttons, title )` |
| `efw. dialog. alert ( message, buttons, title, callback )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | アラートダイアログに表示する情報。 |
| `buttons` | `Object` | ボタンとそのクリックアクションを定義します。<br>```{buttonName1: script1, buttonName2: script2}```<br>スクリプトは、ボタンがクリックされた後、クライアント側で実行されます。 |
| `title` | `String` | アラートダイアログのタイトル。 |
| `callback` | `Function` | アラートダイアログが閉じた後に呼び出されるコールバック関数。 |