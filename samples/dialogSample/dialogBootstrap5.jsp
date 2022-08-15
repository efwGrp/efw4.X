<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var dialogBootstrap5=null;
	//dialogBootstrap5.p1 is input param.
	$(function(){
		dialogBootstrap5=$("#dialogBootstrap5");
		dialogBootstrap5.on("show.bs.modal", function(){
			Efw("dialog_init",{ msg : dialogBootstrap5.p1 });
		});
		dialogBootstrap5.on("hide.bs.modal", function(){
		});
	});
</script>

<div class="modal hide" id="dialogBootstrap5" data-bs-backdrop="static" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">dialog title</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body"><label class="msg"></label></div>
			<div class="modal-footer"></div>
		</div>
	</div>
</div>
