var MST01_clear={};
MST01_clear.name="ユーザ一覧条件クリア";
MST01_clear.paramsFormat={};
MST01_clear.fire=function(params){
	return (new Result())
	.runat("body")
	.withdata({
		"#txt_freeWord":"",
	})
	.concat(event.fire("MST01_search",{
		"#txt_freeWord":"",
		"#paging":{
			".currentPage":0,
			".allPages":0,
			".totalNumber":0,
			".orderBy":"user_id asc"
		},
		"#hdn_selected":"",
	}))
	.focus("#txt_freeWord")
	.eval("$('.SORT').removeClass('SELECTED').removeClass('ASC').removeClass('DESC');")
	.eval("$('[DATA-SORT=user_id]').addClass('SELECTED').addClass('ASC');")
	;
};
