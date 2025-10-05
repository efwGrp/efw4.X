var MST01_init={};
MST01_init.name="ユーザ一覧初期化";
MST01_init.paramsFormat={};
MST01_init.fire=function(params){
	return (new Result())
	.concat(event.fire("MST01_clear",{}))
	;
};
