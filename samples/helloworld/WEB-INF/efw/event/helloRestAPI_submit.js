var helloRestAPI_submit={};
helloRestAPI_submit.paramsFormat={
	mode:null,
	"#customerId":null,
	"#customerName":null,
	"#token":null,
};
helloRestAPI_submit.fire=function(params){
	if (params.mode=="0"){
		db.change("helloRestAPI","createTbl",{});
		return new Result().alert("テーブルを作成しました。");
	}else if (params.mode=="9"){
		db.change("helloRestAPI","dropTbl",{});
		return new Result().alert("テーブルを削除しました。");
	}
	var url="http://localhost:8080/helloworld/efwRestAPI/customer";
	try{
		var ret=null;
		if (params.mode=="1"){//新規追加の場合
			ret=rest.post(url,
				{id:params["#customerId"],nm:params["#customerName"]},
				{token:params["#token"]});
		}else if (params.mode=="2"){//更新の場合
			ret=rest.put(url+"/"+params["#customerId"],
				{nm:params["#customerName"]},
				{token:params["#token"]});
		}else if (params.mode=="3"){//削除の場合
			ret=rest.delete(url+"/"+params["#customerId"],{token:params["#token"]});
		}else if (params.mode=="4"){//取得の場合
			ret=rest.get(url+"/"+params["#customerId"],{token:params["#token"]});
		}
		return new Result()
		.runat("body")
		.withdata({
			"textarea":rest.getStatus()+"\n"+JSON.stringify(ret),
		});
	}catch(e){//失敗の場合
		return new Result()
		.runat("body")
		.withdata({
			"textarea":rest.getStatus()+"\n"+e.getMessage(),
		});
	}
}
