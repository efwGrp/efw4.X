<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<title>barcode テスト</title>
	<efw:Client lang="jp"/>
	<style>img{vertical-align:middle}</style>
	
</HEAD>
<BODY>
qrcode　<img src="drawServlet?type=qrcode&msg=hellword" height="150px">　
codabar　<img src="drawServlet?type=codabar&msg=0123456789" height="60px">　
code39　<img src="drawServlet?type=code39&msg=0123456789" height="60px">　
code128　<img src="drawServlet?type=code128&msg=0123456789" height="60px">　
2of5　<img src="drawServlet?type=2of5&msg=0123456789" height="60px">　
itf14　<img src="drawServlet?type=itf14&msg=01234567891231" height="60px">　
ean13　<img src="drawServlet?type=ean13&msg=1234567890128" height="60px">　
ean8　<img src="drawServlet?type=ean8&msg=12345670" height="60px">　
upca　<img src="drawServlet?type=upca&msg=012345678905" height="60px">　
upce　<img src="drawServlet?type=upce&msg=01234565" height="60px">　
rmcbc　<img src="drawServlet?type=rmcbc&msg=0123456789" height="60px">　
postnet　<img src="drawServlet?type=postnet&msg=0123456789" height="60px">　
usps4cb　<img src="drawServlet?type=usps4cb&msg=0123456709498765432101234567891" height="60px">　
pdf417　<img src="drawServlet?type=pdf417&msg=0123456789" height="60px">　
datamatrix　<img src="drawServlet?type=datamatrix&msg=0123456789" height="150px">　

</BODY>
</HTML>
