var helloWsMode_broadcast_start={};
helloWsMode_broadcast_start.service={
	max:1,
	message:"放送はすでに起動しました。",
}
helloWsMode_broadcast_start.paramsFormat={}
helloWsMode_broadcast_start.fire=function(params){
	context.set("broadcast_status","true");
	efw.wsSend(new Result()
		.runat("body").withdata({
		"#txt_broadcast1":"放送を開始します。"
		})
	);
	while(true){
		if (context.get("broadcast_status")=="true"){
			context.set("broadcast_content","hello,the time is "+new Date().format("yyyy/MM/dd HH:mm:ss"));
			java.lang.Thread.sleep(1000);
		}else{
			context.remove("broadcast_content");
			break;
		}
	}
	return new Result()
	.runat("body").withdata({
	"#txt_broadcast1":"放送は終了しました。"
	});
}