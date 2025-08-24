var helloDialog_init={};
helloDialog_init.paramsFormat={
	msg:null
};
helloDialog_init.fire=function(params){
	params.debug();
	return (new Result())
	.runat("#myDialog")
	.withdata({
		".msg":params["msg"]
	});
};
