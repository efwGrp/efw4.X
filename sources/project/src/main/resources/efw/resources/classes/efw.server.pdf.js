"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate Pdf.<br>
 * @param {String}
 *            path: required<br>
 * Even you want to create a new pdf file, you must create it from a template file.
 * @author Chang Kejun
 */
function Pdf(path) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("Pdf");}
	this._pdf = Packages.efw.pdf.PdfManager.open(path);
};
/**
 * The function to save the pdf object to a file.
 * @param {String} path: required. <br>
 * The relative path and file name to the storage folder.
 */
Pdf.prototype.save = function(path) {
	this._pdf.save(path);
	return this;
};
/**
 * The function to close the handle to free the pdf file.
 */
Pdf.prototype.close = function() {
	Packages.efw.pdf.PdfManager.close(this._pdf.getKey());
};
/**
 * The inner function to close all handles to free pdf files.
 */
Pdf.prototype._closeAll = function() {
	Packages.efw.pdf.PdfManager.closeAll();
};
/**
 * The inner object to keep the operating pdf.
 */
Pdf.prototype._pdf = null;

/**
 * The function to set the value in the form field.
 */
Pdf.prototype.setField = function(fieldName,fieldValue) {
	if (fieldValue==null)fieldValue="";
	this._pdf.setField(fieldName,fieldValue);
	return this;
}
/**
 * The function to convert the html string to a pdf.
 */
Pdf.html2pdf = function(html,baseUrl,pdfPath,fontsPath,fontsPathIsAbs){
	var fl = fontsPathIsAbs
			?Packages.efw.file.FileManager.getByAbsolutePath(fontsPath)
			:Packages.efw.file.FileManager.get(fontsPath);
	Packages.efw.pdf.PdfManager.html2pdf(html,baseUrl,pdfPath,fl);
};
/**
 * The function to get a names array of all fonts contained in the path.
 */
Pdf.getFontNames = function(fontsPath,fontsPathIsAbs){
	var fl = fontsPathIsAbs
			?Packages.efw.file.FileManager.getByAbsolutePath(fontsPath)
			:Packages.efw.file.FileManager.get(fontsPath);
	var ary=Packages.efw.pdf.PdfManager.getFontNames(fl);
	var ret=[];
	for (var i=0;i<ary.length;i++){
		ret.push(""+ary[i]);
	}
	return ret;
}
/**
 * The function to show the debug info about the Pdf.
 * @param {String} label: optional<br>
 * @returns {Pdf}
 */
Pdf.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Pdf class.");
	return this;
};
