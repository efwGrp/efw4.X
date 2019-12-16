<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var dialogShortcut=null;
	$(function(){
		dialogShortcut=$("#dialogShortcut").dialog({
			title : "dialog title",
			autoOpen : false,
			resizable : false,
			height : 300,
			width : 400,
			modal : true,
			open : function(){
			},
			close : function(){
			},
		});
	});
</script>
<div id="dialogShortcut">
	<label>To open a dialog will block the shortcuts in main window.</label><br><br>
	<button data-shortcut="F1" onclick="alert('dialogShortcut F1')">F1 Key</button>
	<button data-shortcut="F2" onclick="alert('dialogShortcut F2')">F2 Key</button>
	<button data-shortcut="F3" onclick="alert('dialogShortcut F3')">F3 Key</button>
	<button data-shortcut="F4" onclick="alert('dialogShortcut F4')">F4 Key</button>
</div>
