<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw wsMode Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp" mode="jquery-ui"/>
	<script>
		function prepare(){
			Cookies.set('progress_cookie', "hello cookie by client");
			window.location="?p=hello_by_request";
		}
	</script>
</HEAD>
<BODY>
<h1>WebSocketモードテスト</h1>
<h2>進捗ダイアログ</h2>
<button type="button" onclick="prepare()">準備</button>
<button type="button" onclick="Efw('helloWsMode_progress_test',true)">テスト（websoketモード）</button>
<button type="button" onclick="Efw('helloWsMode_progress_test',false)">テスト（通常モード）</button><br><br>
<textarea id="spn_progress" style="width:500px;height:100px;"></textarea><br>
※websocketモードではsessionのgetとsetはOKです。<br>
cookieのgetはOKです。setはNGです。<br>
requestのgetはOKです。<br>
wsモードではない場合、wsSendが送信できないためfalseを戻します。<br>
もしブラウザーを閉じる場合、wsSendがエラーが発生するからfalseを戻します。<br><br>


<h2>放送(Broadcast)試験</h2>
<button type="button" onclick="Efw('helloWsMode_broadcast_start',true)">放送起動</button>
<button type="button" onclick="Efw('helloWsMode_broadcast_stop')">放送終了</button>　
<button type="button" onclick="Efw('helloWsMode_broadcast_receive',{textareaid:'txt_broadcast2'},true)">受信開始</button>
<button type="button" onclick="Efw('helloWsMode_broadcast_bye',{textareaid:'txt_broadcast2'})">受信停止</button>　
<button type="button" onclick="Efw('helloWsMode_broadcast_receive',{textareaid:'txt_broadcast3'},true)">受信開始</button>
<button type="button" onclick="Efw('helloWsMode_broadcast_bye',{textareaid:'txt_broadcast3'})">受信停止</button><br><br>
<textarea id="txt_broadcast1" style="width:250px;height:100px;"></textarea>
<textarea id="txt_broadcast2" style="width:250px;height:100px;"></textarea>
<textarea id="txt_broadcast3" style="width:250px;height:100px;"></textarea>
<br>

</BODY>
</HTML>
