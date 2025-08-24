var helloPdf_html2pdf={};
helloPdf_html2pdf.paramsFormat={};
helloPdf_html2pdf.fire=function(params){
	Pdf.getFontNames("fonts").debug("****fonts****");
	var vl1="あいうえお";
	var vl2="森森森森森";
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
						font-family:MS Gothic;
					}
				</style>
			</head>
			<body>
				<input type="text" value="${vl1}" style="width:200px;height:40px;" class="efw_input_error"/>
				<input type="text" value="${vl2}" style="width:200px;height:40px;"/>
				<table border="1" style="width:100%">
					<tr style="background-color:yellow"><th>あいうえお</th><th>あいうえお</th></tr>
					<tr><td>あいうえお</td><td>あいうえお</td></tr>
				</table>
				<img src="a.jpg" width="10%" style="position:absolute;top:60px;left:700px;" />
			</body>
		</html>
		`,
		"http://localhost:8080/helloworld/","hhhhh.pdf","fonts");
	
	return new Result().preview("hhhhh.pdf");

}
