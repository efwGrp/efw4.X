var helloBatch={};
helloBatch.paramsFormat={
	"sysDate":"format:yyy/MM/dd;display-name:sysdate"
};
helloBatch.fire=function(params){
	var ret= new Batch().echo("開始 "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//Excelテスト
	//-------------------------------------
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
		.save("myExcel_CreatedByBatch.xlsx")
		.close();
	ret.echo("Excelテスト 実行済み "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//PDFテスト 埋め込み
	//-------------------------------------
	var pdf=new Pdf("pdf_field_test.pdf");
	pdf.setField("text_field","あい１２12森森");
	pdf.setField("text_field_multi","あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお");
	pdf.setField("check_box","1");
	pdf.setField("radio_group","2");
	pdf.setField("dropdown_list","2");
	pdf.setField("date_field","2025/01/02");
	pdf.save("ccccc_CreatedByBatch.pdf");
	ret.echo("PDFテスト埋め込み 実行済み "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//PDFテスト HTML2pdf
	//-------------------------------------
	Pdf.getFontNames("fonts").debug("****fonts****");
	var vl1="あいうえお";
	var vl2="森森森森森";
	Pdf.html2pdf(
		`
		<html>
			<head>
<link type="text/css" rel="stylesheet" href="./jquery-ui/jquery-ui.structure.min.css?v=4.08.000" />
<link type="text/css" rel="stylesheet" href="./jquery-ui/themes/base/theme.css?v=4.08.000" />
		<link type="text/css" rel="stylesheet" href="./efw/efw.css?v=4.08.000" />
				<style>
					@page {
					    size: A4 landscape;
					}
					*{
						font-family:MS Gothic;
					}
				</style>
			</head>
			<body>
				<input type="text" value="${vl1}" style="width:200px;height:40px;" class="efw_input_error"/>
				<input type="text" value="${vl2}" style="width:200px;height:40px;"/>
				<table border="1" style="width:100%">
					<tr style="background-color:yellow"><th>あいうえお</th><th>あいうえお</th></tr>
					<tr><td>あいうえお</td><td>あいうえお</td></tr>
				</table>
				<img src="a.jpg" width="10%" style="position:absolute;top:60px;left:700px;" />
			</body>
		</html>
		`,
		"http://localhost:8080/helloworld/","hhhhh_CreatedByBatch.pdf","fonts");
	ret.echo("PDFテスト HTML2pdf 実行済み "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//TXTテスト
	//-------------------------------------
	file.remove("text&csv/seperated_CreatedByBatch1");
	file.makeDir("text&csv/seperated_CreatedByBatch1");
	var ary=new BinaryReader(
	    "text&csv/myText.txt",//読み取るファイル
	    [10,10],//項目ごとのバイト数
	    ["MS932","MS932"],//項目ごとの文字コード
	    20//１つレイアウトのバイト数
	).readAllLines();//全部レコードを一括で読み取る
	for(var i=0;i<ary.length;i++){
	    //IDで保存先を特定する。
	    var writer= new CSVWriter("text&csv/seperated_CreatedByBatch1/"+ary[i][0]+".csv", ",", "\"", "MS932");
	    writer.writeLine(ary[i]);//レコードを書き込む
	    writer.close();
	}
	ret.echo("TXTテスト 実行済み "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//CSVテスト
	//-------------------------------------
	file.remove("text&csv/seperated_CreatedByBatch2");
	file.makeDir("text&csv/seperated_CreatedByBatch2");
	var ary=new CSVReader(
	    "text&csv/myText3.csv",//読み取るファイル
	    ",", "\"",
	    "MS932"//項目ごとの文字コード
	).readAllLines();//全部レコードを一括で読み取る
	for(var i=0;i<ary.length;i++){
	    //IDで保存先を特定する。
	    var writer= new CSVWriter("text&csv/seperated_CreatedByBatch2/"+ary[i][0]+".csv", ",", "\"", "MS932");
	    writer.writeLine(ary[i]);//レコードを書き込む
	    writer.close();
	}
	ret.echo("CSVテスト 実行済み "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//DBテスト
	//-------------------------------------
	ret.echo("DBテスト 開始 "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	db.change("helloDB","createTbl",{});
	var rsLen=db.select("helloDB","selectAll",{}).length;
	ret.echo("レコードのサイズ："+rsLen);
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
	ret.echo("挿入行数："+cnt+" data="+JSON.stringify(obj));
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
	ret.echo("更新行数："+cnt+" data="+JSON.stringify(obj));
	var cnt=db.change("helloDB","deleteRow",{
		id:"001"
	});
	var rsLen=db.select("helloDB","selectAll",{}).length;
	ret.echo("削除行数："+cnt+" レコードのサイズ："+rsLen);
	db.change("helloDB","dropTbl",{tbl:"tbl_hello"});
	ret.echo("DBテスト 完了 "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//デフォルトは自動commitですが、jdbc/efwとjdbc/againは同じDBですから
	//手動commitにしたいとロックされる
	db.commitAll();
	//DBテスト 別DBC
	//-------------------------------------
	ret.echo("DBテスト別JDBC 開始 "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	db.change("helloDB","createTbl",{},"jdbc/again");
	var rsLen=db.select("helloDB","selectAll",{},"jdbc/again").length;
	ret.echo("レコードのサイズ："+rsLen);
	var cnt=db.change("helloDB","insertRow",{
		id:"001",
		name:"Efw",
		birthday:new Date("2016/01/01"),
		years:new Date("2016/01/01").getYears()
	},"jdbc/again");
	var obj=db.select("helloDB","selectAll",{},"jdbc/again")
	.map({//マップ関数のテスト
		id:"id",
		name:"name",
		birthday:["birthday","yyyy/MM/dd"],
		years:function(data){
			return data.years+"才";
		}
	}).getSingle();
	ret.echo("挿入行数："+cnt+" data="+JSON.stringify(obj));
	var cnt=db.change("helloDB","updateName",{
		id:"001",
		name:"Escco Framework",
		tbl:"tbl_hello"
	},"jdbc/again");
	var obj=db.select("helloDB","selectAll",{},"jdbc/again")
	.map({//マップ関数のテスト
		id:"id",
		name:"name",
		birthday:["birthday","yyyy/MM/dd"],
		years:function(data){
			return data.years+"才";
		}
	}).getSingle();
	ret.echo("更新行数："+cnt+" data="+JSON.stringify(obj));
	var cnt=db.change("helloDB","deleteRow",{
		id:"001"
	},"jdbc/again");
	var rsLen=db.select("helloDB","selectAll",{},"jdbc/again").length;
	ret.echo("削除行数："+cnt+" レコードのサイズ："+rsLen);
	db.change("helloDB","dropTbl",{tbl:"tbl_hello"},"jdbc/again");
	ret.echo("DBテスト別JDBC 完了 "+new Date().format("yyyy/MM/dd HH:mm:ss"));
	//RestAPIテスト
	//-------------------------------------
	db.change("helloRestAPI","createTbl",{});
	db.commitAll();//RestAPIに利用されるためここでcommitする
	var url="http://localhost:8080/helloworld/efwRestAPI/customer";
	var restret=rest.post(url,{id:"batchuser",nm:"created"},{token:"1234567890"});
	db.change("helloRestAPI","dropTbl",{});
	db.commitAll();//RestAPIに利用されるためここでcommitする
	ret.echo("REST API ："+JSON.stringify(restret));
	//Mailテスト
	//-------------------------------------
	mail.send("mails","freeMail",{
		to:"[your account]@gmail.com",
		nm:"hello",
		cc:"",
		bcc:"",
		mdn:"",
		from:"",
		//以下の設定により添付ファイル送信を実現できる
		attachment:"pdf_field_test.pdf;excel/IamExcelTemplate.xlsx",
	});
	ret.echo("Mailテスト 完了 "+new Date().format("yyyy/MM/dd HH:mm:ss"));

	return ret;
};