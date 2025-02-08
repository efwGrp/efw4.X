# efw.dialog.wait

`wait`関数は、待機用のカウントダウンダイアログを呼び出すために用意されています。Web Eventサービスの基本関数です。

## サンプル

```html
<script>
	function btnClick(){
		efw.dialog.wait("30秒後に実行します。",30,
			"30秒間待機",
			function(){Efw("mySeach");}
		)
	}
</script>
<input type="button" value="送信" onclick="btnClick()">
```
## API

| 呼び出し |
|---|
| `efw. dialog. wait ( message, countdown )` |
| `efw. dialog. wait ( message, countdown, title )` |
| `efw. dialog. wait ( message, countdown, title, callback )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | `String` | 待機ダイアログに表示する情報。 |
| `countdown` | `Number` | 待機する秒数。 |
| `title` | `String` | 待機ダイアログのタイトル。 |
| `callback` | `Function` | 待機ダイアログが閉じた後に呼び出されるコールバック関数。 |