var helloDB_submit={};
helloDB_submit.paramsFormat={
	mode:null,
};
helloDB_submit.fire=function(params){
	var msg="";
	if (params.mode=="create"){
		db.change("helloDB","createTbl",{});
		var rsLen=db.select("helloDB","selectAll",{}).length;
		msg="レコードのサイズ："+rsLen;
	}else if (params.mode=="insert"){
		var cnt=db.change("helloDB","insertRow",{
			id:"001",
			name:"Efw",
			birthday:new Date("2016/01/01"),
			years:new Date("2016/01/01").getYears()
		});
		var obj=db.select("helloDB","selectAll",{})
		.map({//マップ関数のテスト
			id:"id",
			name:"name",
			birthday:["birthday","yyyy/MM/dd"],
			years:function(data){
				return data.years+"才";
			}
		}).getSingle();
		msg="挿入行数："+cnt+" data="+JSON.stringify(obj);
	}else if (params.mode=="update"){
		var cnt=db.change("helloDB","updateName",{
			id:"001",
			name:"Escco Framework",
			tbl:"tbl_hello"
		});
		var obj=db.select("helloDB","selectAll",{})
		.map({//マップ関数のテスト
			id:"id",
			name:"name",
			birthday:["birthday","yyyy/MM/dd"],
			years:function(data){
				return data.years+"才";
			}
		}).getSingle();
		msg="更新行数："+cnt+" data="+JSON.stringify(obj);
	}else if (params.mode=="delete"){
		var cnt=db.change("helloDB","deleteRow",{
			id:"001"
		});
		var rsLen=db.select("helloDB","selectAll",{}).length;
		msg="削除行数："+cnt+" レコードのサイズ："+rsLen;
	}else if (params.mode=="drop"){
		db.change("helloDB","dropTbl",{tbl:"tbl_hello"});
	}

	return new Result().runat("body").withdata({"#divRet":msg});

}