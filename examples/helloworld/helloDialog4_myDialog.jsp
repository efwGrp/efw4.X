<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script>
	var myDialog=null;
	//myDialog.p1 is input param.
	$(function(){
		myDialog=$("#myDialog");
		myDialog.on("show.bs.modal", function(){
			Efw("helloDialog_init",{ msg : myDialog.p1 });
		});
		myDialog.on("hide.bs.modal", function(){
		});
	});
</script>

<div class="modal fade" id="myDialog" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
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