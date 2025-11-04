var helloWsMode_broadcast_receive={};
helloWsMode_broadcast_receive.paramsFormat={
	"textareaid":null
}
helloWsMode_broadcast_receive.fire=function(params){
	var textareaid=params.textareaid;
	session.set("receive_to_"+textareaid+"_status","true");
	var data={};
	while(true){
		if (session.get("receive_to_"+textareaid+"_status")=="true"){
			if (context.get("broadcast_status")=="true"){
				var content=context.get("broadcast_content");
				data["#"+textareaid]=content;
			}else{
				data["#"+textareaid]="放送が開始てしていません。";
			}
			java.lang.Thread.sleep(1000);
			efw.wsSend(new Result().runat("body").withdata(data));
		}else{
			break;
		}
	}
	var data={};
	data["#"+textareaid]="受信は停止しました。";
	return new Result().runat("body").withdata(data);
	
}