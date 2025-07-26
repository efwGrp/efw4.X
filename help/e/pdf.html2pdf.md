# Pdf.html2pdf

The `html2pdf` static function is used to convert a html string to pdf.
This html string is HTML5 compliant but does not support javascript or any event.
The reference link for css [@page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
## Sample

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
				<input type="text" value="abcdefg" style="width:200px;height:40px;"/>
				<table border="1" style="width:100%">
					<tr style="background-color:yellow"><th>abcdefg</th><th>abcdefg</th></tr>
					<tr><td>abcdefg</td><td>abcdefg</td></tr>
				</table>
			</body>
		</html>
		`,
		"http://localhost:8080/helloworld/","output.pdf","fonts");

```

## API

| Calling | Returning |
|---|---|
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath )` | `void` |
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath, fontsPathIsAbs )` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `html` | `String` | The HTML string you want to convert to pdf. |
| `baseUrl` | `String` | The URL that serves as the base for all relative URLs in the html. |
| `pdfPath` | `String` | The file path for the output pdf. |
| `fontsPath` | `String` | The folder path for font files. |
| `fontsPathIsAbs` | `Boolean` | Specifies whether the fontsPath is an absolute path. |
