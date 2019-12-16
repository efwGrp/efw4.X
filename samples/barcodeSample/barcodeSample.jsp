<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw"%>
<HTML>
<HEAD>
<TITLE>test</TITLE>
<META CONTENT="TEXT/HTML;CHARSET=UTF-8" HTTP-EQUIV="CONTENT-TYPE">
<efw:Client/>
</HEAD>
<BODY>
<table>
	<tr><th>Type</th><th>Description</th></tr>
	<tr><td>qrcode</td><td>QR Code</td><td><img src="drawServlet?type=qrcode&msg=hellword" style="height:100px"></td></tr>
	<tr><td>codabar</td><td>Codabar</td><td><img src="drawServlet?type=codabar&msg=0123456789" style="height:100px"></td></tr>
	<tr><td>code39</td><td>Code 39</td><td><img src="drawServlet?type=code39&msg=0123456789" style="height:100px"></td></tr>
	<tr><td>code128</td><td>Code 128</td><td><img src="drawServlet?type=code128&msg=0123456789" style="height:100px"></td></tr>
	<tr><td>2of5</td><td>Interleaved 2 of 5</td><td><img src="drawServlet?type=2of5&msg=0123456789" style="height:100px"></td></tr>
	<tr><td>itf14</td><td>ITF-14</td><td><img src="drawServlet?type=itf14&msg=01234567891231" style="height:100px"></td></tr>
	<tr><td>ean13</td><td>EAN-13</td><td><img src="drawServlet?type=ean13&msg=1234567890128" style="height:100px"></td></tr>
	<tr><td>ean8</td><td>EAN-8</td><td><img src="drawServlet?type=ean8&msg=12345670" style="height:100px"></td></tr>
	<tr><td>upca</td><td>UPC-A</td><td><img src="drawServlet?type=upca&msg=012345678905" style="height:100px"></td></tr>
	<tr><td>upce</td><td>UPC-E</td><td><img src="drawServlet?type=upce&msg=01234565" style="height:100px"></td></tr>
	<tr><td>postnet</td><td>POSTNET</td><td><img src="drawServlet?type=postnet&msg=0123456789" style="width:400px"></td></tr>
	<tr><td>rmcbc</td><td>Royal Mail Customer Barcode</td><td><img src="drawServlet?type=rmcbc&msg=0123456789" style="width:400px"></td></tr>
	<tr><td>usps4cb</td><td>USPS Intelligent Mail</td><td><img src="drawServlet?type=usps4cb&msg=0123456709498765432101234567891" style="width:400px"></td></tr>
	<tr><td>pdf417</td><td>PDF417</td><td><img src="drawServlet?type=pdf417&msg=0123456789" style="width:400px"></td></tr>
	<tr><td>datamatrix</td><td>DataMatrix</td><td><img src="drawServlet?type=datamatrix&msg=0123456789" style="height:100px"></td></tr>
</table>
</BODY>
</HTML>
