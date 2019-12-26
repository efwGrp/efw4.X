/**
 *			http://localhost:8080/restSample/efwRestAPI/customer/u001		DELETE method
 * 			500 Internal Server Error	その他のサーバに起因するエラーにより処理続行できない場合
 *
 *			http://localhost:8080/restSample/efwRestAPI/customerXXXX/u001	GET method
 * 			404 Not Found				イベントが見つからない
 *
 *			http://localhost:8080/restSample/efwRestAPI/customer/u001		GET method
 * 			200 OK						GET POST PUT DELETE方法成功の戻り値、結果リソースと一緒に送信
 *
 *			http://localhost:8080/restSample/efwRestAPI/customer/u001		PUT method
 * 			204 No Content				GET POST PUT DELETE方法成功の戻り値、結果リソースと一緒に送信しない
 **/
var customer={};
customer.PUT=function(keys,params){
	keys.debug("PUT keys");
	params.debug("PUT params");
};
customer.POST=function(keys,params){
	keys.debug("POST keys");
	params.debug("POST params");
	return {"id":keys[0],"nm":"customer name"};
};
customer.GET=function(keys){
	keys.debug("GET keys");
	return {"id":keys[0],"nm":"customer name"};
};
customer.DELETE=function(keys){
	keys.debug("DELETE keys");
	throw new Error("DELETE テスト");
};
