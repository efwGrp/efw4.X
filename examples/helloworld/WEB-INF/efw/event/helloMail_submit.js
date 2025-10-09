var helloMail_submit={};
helloMail_submit.paramsFormat={
	"#txtTo":null,
	"#txtName":null,
	"#txtCC":null,
	"#txtBCC":null,
	"#txtMDN":null,
	"#txtFrom":null,
	"#selImportance":null,
	"#chkInBackground":null,
};
helloMail_submit.fire=function(params){
	var inbackground=false;
	if (params["#chkInBackground"]=="1"){
		inbackground=true;
	}
	mail.send("mails","freeMail",{
		to:params["#txtTo"],
		nm:params["#txtName"],
		cc:params["#txtCC"],
		bcc:params["#txtBCC"],
		mdn:params["#txtMDN"],
		from:params["#txtFrom"],
		importance:params["#selImportance"],
		body:"test body ",
		//以下の設定により添付ファイル送信を実現できる
		attachment:"pdf_field_test.pdf|excel/IamExcelTemplate.xlsx",
		}.debug("xxxxxxxxxxxxxxxx"),inbackground);
}
