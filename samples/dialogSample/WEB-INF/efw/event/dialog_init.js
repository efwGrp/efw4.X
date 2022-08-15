var dialog_init={};
dialog_init.paramsFormat={
	msg:null
};
dialog_init.fire=function(params){
	params.debug();
	return (new Result())
	.runat("#dialogJQueryUI,#dialogBootstrap,#dialogBootstrap5")
	.withdata({
		".msg":params["msg"]
	});
};
