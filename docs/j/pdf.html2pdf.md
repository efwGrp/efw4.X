# Pdf.html2pdf

`html2pdf` 静的関数は、HTML 文字列を PDF に変換するために用意されます。
この HTML 文字列は HTML5 に準拠していますが、JavaScript やイベントはサポートされていません。
参照リンク css[@page](https://developer.mozilla.org/ja/docs/Web/CSS/@page)
## サンプル

```javascript
	var param1="This is a param";
	Pdf.html2pdf(
		`
		<html>
			<head>
<link type="text/css" rel="stylesheet" href="./jquery-ui/jquery-ui.structure.min.css?v=4.08.000" />
<link type="text/css" rel="stylesheet" href="./jquery-ui/themes/base/theme.css?v=4.08.000" />
		<link type="text/css" rel="stylesheet" href="./efw/efw.css?v=4.08.000" />
				<style>
					@page {
					    size: A4 landscape;
					}
					*{
						/* You should confirm the font-family name by Pdf.getFontName()  */
						font-family:MS Gothic;
					}
				</style>
			</head>
			<body>
				<input type="button" value="${param1}" style="width:200px;height:40px;" class="efw_input_error"/>
				<input type="text" value="あいうえお" style="width:200px;height:40px;"/>
				<table border="1" style="width:100%">
					<tr style="background-color:yellow"><th>あいうえお</th><th>あいうえお</th></tr>
					<tr><td>あいうえお</td><td>あいうえお</td></tr>
				</table>
			</body>
		</html>
		`,
		"http://localhost:8080/helloworld/","output.pdf","fonts");

```

## API

| 呼び出し | 戻り値 |
|---|---|
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath )` | `void` |
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath, fontsPathIsAbs )` | `void` |

| パラメータ | 型 | 説明 |
|---|---|---|
| `html` | `String` | PDF に変換する HTML 文字列。 |
| `baseUrl` | `String` | HTML内のすべての相対URLのベースとなるURL。 |
| `pdfPath` | `String` | 出力 PDF のファイル パス。 |
| `fontsPath` | `String` | フォント ファイルのフォルダー パス。|
| `fontsPathIsAbs` | `Boolean` | fontsPath が絶対パスであるかどうかを指定します。 |
