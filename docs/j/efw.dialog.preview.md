# efw.dialog.preview

`preview` 関数は、プレビューダイアログを呼び出すために用意されています。
これは、Result.preview メソッドの基本関数です。

## サンプル

```html
<script>
	function btnClick(){
		efw.dialog.preview("a.jpg","a.jpg");
	}
</script>
<input type="button" value="preview" onclick="btnClick()">
```
## API

| 呼び出し |
|---|
| `efw. dialog. preview ( previewUrl, fileName )` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `previewUrl` | `String` | プレビューされるファイルの URL。|
| `fileName` | `String` | ファイルのフル名前。 |