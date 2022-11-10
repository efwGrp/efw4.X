var gotonext_asAdmin={};
gotonext_asAdmin.paramsFormat={};

gotonext_asAdmin.fire=function(params){
	session.set("USER_ID","admin");
	session.set("USER_NM","管理者");
	return new Result()
	.navigate("next.jsp");
}