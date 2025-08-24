<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="TEXT/HTML;CHARSET=UTF-8">
	<TITLE>efw Dialog Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp"  mode="bootstrap" major="5"/>
	<script>
		function testAlert(){
			efw.dialog.alert("I am here");
		}
		function testConfirm(){
			efw.dialog.alert(
			"alertテストしています。",
			{
				"はい":function(){alert("「はい」を押しました。");},
				"いいえ":function(){alert("「いいえ」を押しました。");},
			},
			"alertテスト",
			function(){ alert("テスト完了");}
			)
		}
		function testWait(){
			efw.dialog.wait(
			"５秒待ってください。",
			5,
			"waitテスト",
			function(){ alert("テスト完了");}
			)
		}
		function testPreview(){
			efw.dialog.preview("a.jpg","a.jpg");
		}
		function testDialog(){
			myDialog.p1='hello world! '+new Date();
			myDialog.modal('show');
		}
	</script>
</HEAD>
<BODY>
<h1>ダイアログテスト</h1>
<button onclick="testAlert()">Alertテスト</button>
<button onclick="testConfirm()">Confirmテスト</button>
<button onclick="testWait()">Waitテスト</button>
<button onclick="testPreview()">Previewテスト</button>
<button onclick="testDialog()">Dialogテスト</button>
<efw:part path="helloDialog5_myDialog.jsp"/>
</BODY>
</HTML>
