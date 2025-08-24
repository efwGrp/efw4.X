var helloVue_init={};
helloVue_init.paramsFormat={
}
helloVue_init.fire=function(params){
	var ret=new Result()
	.provide({"item1":"I am input",
			"item2":"I am hidden",
			"item3":"I am text",
			"item4":"I am search",
			"item5":"03-000-0000",
			"item6":"htttps://I.am.url.jp",
			"item7":"i@am.url.jp",
			"item8":"I am password",
			"item9":"2023/06/21 10:23:00",
			"item10":"2023-06-21",
			"item11":"2023-06",
			"item12":"2023-W25",
			"item13":"12:00",
			"item14":"2023-06-21T12:00",
			"item15":"1234567890",
			"item16":"100",
			"item17":"#ff0000",
			"item18":true,
			"item19":"1",
			"item20":"I am option 1",
			"item21":["I am option 1","I am option 2"],
			"item22":"I am text area",
			"item20options":[{"value":"","text":""},
							{"value":"I am option 1","text":"option 1"},
							{"value":"I am option 2","text":"option 2"}],
			"item21options":[{"value":"","text":""},
							{"value":"I am option 1","text":"option 1"},
							{"value":"I am option 2","text":"option 2"}],
			"item22datas":
					[{"fd1":"data1-1","fd2":"data1-2","fd3":"data1-3"},
					{"fd1":"data2-1","fd2":"data2-2","fd3":"data2-3"},
					{"fd1":"data3-1","fd2":"data3-2","fd3":"data3-3"}],
		});
	
	return ret;
}
