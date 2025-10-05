<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %> 
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE"CONTENT="TEXT/HTML;CHARSET=UTF-8">       
	<TITLE>efw Action Test</TITLE>
	<!-- Efwクライアントの取り込み-->
	<efw:Client lang="jp"/>
</HEAD>
<BODY>
<h1>各種類の画面アクションを一括テスト</h1>
<fieldset><legend>ファンクションキーとショートカットキー</legend>
	<button data-shortcut="F1" onclick="Efw('ActionTest_run',{btn:'F1'})">F1</button>
	...
	<button data-shortcut="F12" onclick="Efw('ActionTest_run',{btn:'F12'})">F12</button>　
	<button data-shortcut="CTRL+A" onclick="Efw('ActionTest_run',{btn:'CTRL+A'})">CTRL+A</button>
	...
	<button data-shortcut="CTRL+Z" onclick="Efw('ActionTest_run',{btn:'CTRL+Z'})">CTRL+Z</button>　
	<button data-shortcut="ALT+S" onclick="Efw('ActionTest_run',{btn:'ALT+S'})">ALT+S</button>
	...
	<button data-shortcut="ALT+Z" onclick="Efw('ActionTest_run',{btn:'ALT+Z'})">ALT+Z</button>
	※ALT+Aはchromeに利用されているからALT+Sにしました。
</fieldset><br>
<fieldset><legend>アクション</legend>
	<button onclick="Efw('ActionTest_run',{btn:'Show'})">Show</button>
	<button onclick="Efw('ActionTest_run',{btn:'Hide'})">hide</button>
	<button onclick="Efw('ActionTest_run',{btn:'Enable'})">Enable</button>
	<button onclick="Efw('ActionTest_run',{btn:'Disable'})">Disable</button>
</fieldset><br>
<fieldset><legend>入力エラー関連</legend>
	<input type="text" id="theText">
	<button onclick="Efw('ActionTest_run',{btn:'Confirm'})">Confirm</button>
	<button onclick="Efw('ActionTest_run',{btn:'Alert'})">Alert</button>
	<button onclick="Efw('ActionTest_run',{btn:'HighlightText'})">Highlight Text</button>
	<button onclick="Efw('ActionTest_run',{btn:'HighlightNone'})">Highlight None</button>
	<button onclick="Efw('ActionTest_run',{btn:'Focus'})">Focus</button>
</fieldset><br>
<fieldset><legend>ダウンロード</legend>
	<button onclick="Efw('ActionTest_run',{btn:'Create'})">Create Folder&Files</button>
	<button onclick="Efw('ActionTest_run',{btn:'DownloadFolder'})">Download Folder</button>
	<button onclick="Efw('ActionTest_run',{btn:'DownloadFiles'})">Download Files</button>
	<button onclick="Efw('ActionTest_run',{btn:'DldSvDlt'})">Download SaveAs & Delete</button>
</fieldset>
<efw:elFinder id="elfinder1" home="" readonly="true" height="200" width="700"/>
<fieldset><legend>画面遷移</legend>
	<button onclick="Efw('ActionTest_run',{btn:'Navigate'})">Navigate</button>
</fieldset>
</BODY>
</HTML>
