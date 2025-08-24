var helloVue_send={};
helloVue_send.paramsFormat={
	data:null
}
helloVue_send.fire=function(params){
	var data=params.data;
	data.item1="I am input AAAAA";
	var ret=new Result()
	.provide(data);
	
	return ret;
}
