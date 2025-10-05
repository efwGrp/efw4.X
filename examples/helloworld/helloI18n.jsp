<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<%
		//ほかの画面はセッション情報から、言語コードを受取るから大丈夫です。
		//ログイン画面だけですが、言語を選択する場合jspの更新が必要です。
		String lang=request.getParameter("lang");
		if (lang==null||"".equals(lang))lang="en";
	%>
	<efw:Client lang="<%=lang%>"/>
	<!-- タイトルは本来ならば上のほうですが、clientの次にしないと言語が特定できないため、場所を移動する -->
	<title><efw:msg key="here"/></title>
	<script>
		//ログイン画面の場合、選択した言語をselectタグに再表示する方法です。
		$(function(){
			$("#selLang").val("<%=lang%>");
		});
		function changeI18n(self){
			window.location="helloI18n.jsp?lang="+self.value;
		}
	</script>
</HEAD>
<BODY>
	<efw:msg key="language"/>
	<select id="selLang" onchange="changeI18n(this)">
		<option value=""></option>
		<option value="cn">cn</option>
		<option value="jp">jp</option>
		<option value="en">en</option>
	</select><br>
	<efw:msg key="comment"/><br>
	<button onclick="Efw('helloI18n_submit')"><efw:msg key="testservermsg"/></button><br>
</BODY>
</HTML>
