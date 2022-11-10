var gotonext_asNobody={};
gotonext_asNobody.paramsFormat={};

gotonext_asNobody.fire=function(params){
	session.invalidate();
	return new Result()
	.navigate("next.jsp");
}