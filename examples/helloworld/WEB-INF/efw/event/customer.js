var customer={};
customer.POST=function(keys,params){//新規作成
	var token=Packages.efw.framework.getRequest().getHeader("token");
	if("1234567890"!=token){throw new Error("セキュリティエラー");}
	db.change("helloRestAPI","insertRow",{"id":params.id,"name":params.nm});
	return {url:"efwRestAPI/customer/"+params.id}
};
customer.PUT=function(keys,params){//更新
	var token=Packages.efw.framework.getRequest().getHeader("token");
	if("1234567890"!=token){throw new Error("セキュリティエラー");}
	var rt=db.change("helloRestAPI","updateRow",{"id":keys[0],"name":params.nm});
	if (rt==0) throw new Error("更新対象のデータは存在しません。");
	return null;
};
customer.DELETE=function(keys){//削除
	var token=Packages.efw.framework.getRequest().getHeader("token");
	if("1234567890"!=token){throw new Error("セキュリティエラー");}
	var rt=db.change("helloRestAPI","deleteRow",{"id":keys[0]});
	if (rt==0) throw new Error("削除対象のデータは存在しません。");
	return null;
};
customer.GET=function(keys){//取得
	var token=Packages.efw.framework.getRequest().getHeader("token");
	if("1234567890"!=token){throw new Error("セキュリティエラー");}
	return db.select("helloRestAPI","selectRow",{"id":keys[0]}).getSingle();
};
