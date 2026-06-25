var helloConcurrencyLimit_test2={};
helloConcurrencyLimit_test2.paramsFormat={};
helloConcurrencyLimit_test2.service={
	max:1,
	retriable:true,
}
helloConcurrencyLimit_test2.fire=function(params){
	java.lang.Thread.sleep(3000);
}