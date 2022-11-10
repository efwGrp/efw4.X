var gotonext_asUser={};
gotonext_asUser.paramsFormat={};

gotonext_asUser.fire=function(params){
	session.set("USER_ID","user");
	session.set("USER_NM","ユーザ");
	session.set("USER_AUTH","user");
	return new Result()
	.navigate("next.jsp");
}