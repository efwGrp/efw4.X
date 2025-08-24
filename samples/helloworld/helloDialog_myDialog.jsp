<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var myDialog=null;
	//myDialog.p1 is input param.
	$(function(){
		myDialog=$("#myDialog").dialog({
			title : "dialog title",
			autoOpen : false,
			resizable : false,
			height : 300,
			width : 400,
			modal : true,
			open : function(){
				Efw("helloDialog_init",{ msg : myDialog.p1 });
			},
			close : function(){
			},
		});
	});
</script>
<div id="myDialog">
	<label class="msg"></label>
</div>
