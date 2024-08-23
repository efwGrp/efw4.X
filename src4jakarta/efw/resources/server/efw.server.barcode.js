"use strict";
/**** efw3.X Copyright 2019 efwGrp ****/
/**
 * The class to operate barcode files.
 * 
 * @author Chang Kejun
 */
function EfwServerBarcode() {
};
/**
 * The function to decode a barcode from an image file.<br> 
 * @param {String} imagePath: required<br>
 * @returns {String|null}
 */
EfwServerBarcode.prototype.decode = function(imagePath) {
	var msg=Packages.efw.barcode.BarCodeManager.decode(imagePath);
	if (msg==null){
		return msg;
	}else{
		return ""+msg;
	}
};
