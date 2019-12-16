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
Elfinder1 is protected.<br>
<button onclick="elfinder1.setHome('..')">setHome("..")</button><br>
<button onclick="elfinder1.setReadOnly(false)">setReadOnly(false)</button><br>

<efw:elfinder home="" id="elfinder1" protected="true" readonly="true" width="600" height="300"/>
<br>
Elfinder2 is not protected.<br>
<button onclick="elfinder2.setHome('..')">setHome("..")</button> It is DANGEROUS for WWW sites!<br>
<button onclick="elfinder2.setReadOnly(false)">setReadOnly(false)</button><br>

<efw:elfinder home="homefolder" id="elfinder2" protected="false" readonly="true" width="600" height="300"/>

</BODY>
</HTML>
