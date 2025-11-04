var helloWsMode_progress_test={};
helloWsMode_progress_test.service={
	max:1,
	retriable:true,
}
helloWsMode_progress_test.paramsFormat={
	h1:null,
};
helloWsMode_progress_test.fire=function(params){
	efw.wsSend(new Result().progress("hello progress",0));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.runat("body")
		.withdata({"#spn_progress":"params:"+JSON.stringify(params)})
		.progress("get params",10));
	java.lang.Thread.sleep(1000);
	session.set("progress_session","I am here 1 "+new Date().format("yyyy-MM-dd HH:mm:ss"));
	efw.wsSend(new Result()
		.progress("set session in webSocket mode",20));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.runat("body")
		.withdata({"#spn_progress":"progress_session:"+session.get("progress_session")})
		.progress("get session in webSocket mode",30));
	java.lang.Thread.sleep(1000);
	cookie.set("progress_cookie","I am here 2"+new Date().format("yyyy-MM-dd HH:mm:ss"));
	efw.wsSend(new Result()
		.progress("set cookie (it will not work in webSocket mode)",40));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.runat("body")
		.withdata({"#spn_progress":"progress_cookie:"+cookie.get("progress_cookie")})
		.progress("get cookie in webSocket mode",50));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.progress("hello progress",60));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.progress("hello progress",70));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.progress("hello progress",80));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.progress("hello progress",90));
	java.lang.Thread.sleep(1000);
	efw.wsSend(new Result()
		.progress("hello progress",100,true)
		.runat("body")
		.withdata({"#spn_progress":"params:"+JSON.stringify(params)
			+"\nprogress_session:"+session.get("progress_session")
			+"\nprogress_cookie:"+cookie.get("progress_cookie")}));
	java.lang.Thread.sleep(1000);
	return new Result().alert("Over");
}
