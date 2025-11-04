var helloWsMode_broadcast_bye={};
helloWsMode_broadcast_bye.paramsFormat={
	"textareaid":null
}
helloWsMode_broadcast_bye.fire=function(params){
	var textareaid=params.textareaid;
	session.set("receive_to_"+textareaid+"_status","false");
	var data={};
	data["#"+textareaid]="受信を停止します。";
	return new Result().runat("body").withdata(data);
	
}