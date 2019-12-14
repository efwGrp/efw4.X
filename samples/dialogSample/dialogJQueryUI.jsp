<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var dialogJQueryUI=null;
	//dialogJQueryUI.p1 is input param.
	$(function(){
		dialogJQueryUI=$("#dialogJQueryUI").dialog({
			title : "dialog title",
			autoOpen : false,
			resizable : false,
			height : 300,
			width : 400,
			modal : true,
			open : function(){
				Efw("dialog_init",{ msg : dialogJQueryUI.p1 });
			},
			close : function(){
			},
		});
	});
</script>
<div id="dialogJQueryUI">
	<label class="msg"></label>
</div>
