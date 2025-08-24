var helloPdf_fillFeild={};
helloPdf_fillFeild.paramsFormat={
};
helloPdf_fillFeild.fire=function(params){

	var pdf=new Pdf("pdf_field_test.pdf");
	pdf.setField("text_field","あい１２12森森");
	pdf.setField("text_field_multi","あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお");
	pdf.setField("check_box","1");
	pdf.setField("radio_group","2");
	pdf.setField("dropdown_list","2");
	pdf.setField("date_field","2025/01/02");
	pdf.save("ccccc.pdf");
	return new Result().preview("ccccc.pdf");
}
