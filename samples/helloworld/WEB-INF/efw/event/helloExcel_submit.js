var helloExcel_submit={};
helloExcel_submit.paramsFormat={
	mode:null,
};
helloExcel_submit.fire=function(params){
	if (params.mode=="sheet"){
		//ファイル作成時、テンプレートをコピー作成
		var excel=new Excel("excel/IamExcelTemplate.xlsx")
			.createSheet("newSheet1","templateSheet")
			.createSheet("newSheet2","templateSheet")
			.createSheet("newSheet3","templateSheet")
			.setSheetOrder("newSheet3",1)
			.setSheetOrder("newSheet2",2)
			.setSheetOrder("newSheet1",3)
			.setActiveSheet("newSheet1")
			.showSheet("newSheet1")
			.hideSheet("newSheet2")
			.removeSheet("templateSheet");
		var sheetNames=excel.getSheetNames();
		var maxRows=excel.getMaxRow("newSheet1");
		excel
			//印刷範囲が変わって、ページ数が変わる
			.setPrintArea("newSheet1",0,5,0,5)
			.setPrintArea("newSheet3",0,10,0,20)
			.save("myExcel.xlsx")
			.close();
		return new Result()
			.alert("sheets["+sheetNames.join(",")+"]")
			.alert("newSheet1 maxRows="+maxRows)
			.attach("myExcel.xlsx").deleteAfterDownload();
	}else if (params.mode=="rowcol"){
		var excel=new Excel("excel/IamExcelTemplate.xlsx")
			.createSheet("newSheet1","templateSheet")
			.addRow("newSheet1",0).setCell("newSheet1","A1","I am here")
			.addRow("newSheet1",0,5)
			.delRow("newSheet1",6)
			.hideRow("newSheet1",1,3)
			.hideCol("newSheet1",1,3)
			.showRow("newSheet1",2)
			.showCol("newSheet1",2)
			.setActiveSheet("newSheet1")
			.save("myExcel.xlsx")
			.close();
		return new Result()
			.attach("myExcel.xlsx").deleteAfterDownload();
	}else if (params.mode=="data"){
		var excel=new Excel("excel/IamExcelTemplate.xlsx")
			.createSheet("newSheet1","templateSheet")
			.setCell("newSheet1","A2","I am A2","templateSheet","A1")
			.setCell("newSheet1","A3","I am A3","templateSheet","A1")
			.setCell("newSheet1","A4","I am google","templateSheet","A1")
			.setLink("newSheet1","A4","https://www.google.co.jp")
			.setCell("newSheet1","M2",123,"templateSheet","M1")
			.setCell("newSheet1","O2",234,"templateSheet","O1")
			.setCell("newSheet1","Q2",null,"templateSheet","Q1")//計算式自動的に適用する
		
			.setCell("newSheet1","D2",new Date(),"templateSheet","D1")
			.setActiveSheet("newSheet1")
			.save("myExcel.xlsx")
			.close();
		excel=new Excel("myExcel.xlsx")
		var ary=excel.getArray("newSheet1",2,2,{
			data1:"M",
			data2:"O",
			data3:["Q","#,##0.00"],//数字をフォーマットして文字列を取得する方法をテストする
			data4:["D","yyyy/MM/dd"],//日付をフォーマットして文字列を取得する方法をテストする
			data5:function(row){//コールバックfunctionをテストする
				return excel.getValue("newSheet1","D"+row);
			}
		});
		
		var obj=excel.getSingle("newSheet1",{
			data1:"M1",
			data2:"O1",
			data3:"Q1",
		});
		var v=excel.getValue("newSheet1","A1");
		
		return new Result()
			.attach("myExcel.xlsx").deleteAfterDownload()
			.alert("ary="+JSON.stringify(ary))
			.alert("obj="+JSON.stringify(obj))
			.alert("v="+v);
	}else if (params.mode=="shape"){
		var excel=new Excel("excel/IamExcelTemplate.xlsx")
			.createSheet("newSheet1","templateSheet")
			.setActiveSheet("newSheet1")
			.encircle("newSheet1","I1","templateSheet","myMaru",0.16,0.5,0.33,1)
			.encircle("newSheet1","I1","templateSheet","myMaru",0.86,0.5,0.33,1)
			.addShape("newSheet1","I2","templateSheet","myBox","I am box")
			.addShape("newSheet1","I3","templateSheet","myBox",null,10,10,20,20)
			.addShape("newSheet1","I3","templateSheet","myBox",null,-10,-10,20,20)
			.addShapeInRange("newSheet1","I4","K6","templateSheet","myBox","I am box",10,10,10,10)
			.replacePicture("newSheet1","inkan","excel/1.png")
			//myBoxの文字色はコピーされていない。
			;
		var isSyowa=excel.isEncircled("newSheet1","I1",0.16,0.5);
		var isTaisyo=excel.isEncircled("newSheet1","I1",0.5,0.5);
		var isReiwa=excel.isEncircled("newSheet1","I1",0.86,0.5);
		excel
			.save("myExcel.xlsx")
			.close();
		
		return new Result()
			.attach("myExcel.xlsx").deleteAfterDownload()
			.alert("昭和="+isSyowa +" 大正="+isTaisyo+" 令和="+isReiwa);
		
	}else if (params.mode=="formula"){
		var excel=new Excel("excel/IamExcelTemplate.xlsx")
			.setActiveSheet("formulaTest")
			.setCell("formulaTest","E2",null,"formulaTest","E1")
			.setCell("formulaTest","E3",null,"formulaTest","E1")
			.setCell("formulaTest","E4",null,"formulaTest","E1")
			.setCell("formulaTest","E5",null,"formulaTest","E1")
			.setCell("formulaTest","B7",null,"formulaTest","A7")
			.setCell("formulaTest","C7",null,"formulaTest","A7")
			.save("myExcel.xlsx")
			.close();
		;
		return new Result()
			.attach("myExcel.xlsx").deleteAfterDownload();

	}
}