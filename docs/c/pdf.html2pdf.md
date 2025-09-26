# Pdf.html2pdf

`html2pdf` 静态函数用于将 html 字符串转换为 pdf。
此 html 字符串符合 HTML5 标准，但不支持 javascript 或任何事件。
参考链接 css[@page](https://developer.mozilla.org/en-US/docs/Web/CSS/@page)
## 示例

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

| 调用 | 返回值 |
|---|---|
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath )` | `void` |
| `Pdf. html2pdf ( html, baseUrl, pdfPath, fontsPath, fontsPathIsAbs )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `html` | `String` | 您想要转换为 pdf 的 HTML 字符串。 |
| `baseUrl` | `String` | 作为 html 中所有相对 URL 基础的 URL。 |
| `pdfPath` | `String` | 输出 pdf 的文件路径。 |
| `fontsPath` | `String` | 字体文件的文件夹路径。 |
| `fontsPathIsAbs` | `Boolean` | 指定fontsPath是否是绝对路径。 |
