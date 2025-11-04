var helloWsMode_broadcast_stop={};
helloWsMode_broadcast_stop.paramsFormat={}
helloWsMode_broadcast_stop.fire=function(params){
	context.set("broadcast_status","false");
	return new Result()
	.runat("body").withdata({
	"#txt_broadcast1":"放送を終了します。"
	});
}