<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var dialogBootstrap=null;
	//dialogBootstrap.p1 is input param.
	$(function(){
		dialogBootstrap=$("#dialogBootstrap");
		dialogBootstrap.on("show.bs.modal", function(){
			Efw("dialog_init",{ msg : dialogBootstrap.p1 });
		});
		dialogBootstrap.on("hide.bs.modal", function(){
		});
	});
</script>

<div class="modal fade" id="dialogBootstrap" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">dialog title</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			</div>
			<div class="modal-body"><label class="msg"></label></div>
			<div class="modal-footer"></div>
		</div>
	</div>
</div>