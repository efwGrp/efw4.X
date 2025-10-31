"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate request.
 * 
 * @author Chang Kejun
 */
function EfwServerRequest() {
};
/**
 * The function to get data from request.
 * 
 * @param {String}
 *            key: the request key.
 * @returns {Any}
 */
EfwServerRequest.prototype.get = function(key) {
	//この機能はhttpの場合有効。Websocketの場合refererというheaderがないので無効です。
	var url= Packages.efw.framework.getRequest().getHeader("referer");
	function getParam(url,name) {
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    var value= decodeURIComponent(results[2].replace(/\+/g, " "));
		//禁則文字の定義を取得する
		var characters = Packages.efw.properties.PropertiesManager.getProperty(
			Packages.efw.properties.PropertiesManager.EFW_FORBIDDEN_CHARACTERS,"");
		var replacement= Packages.efw.properties.PropertiesManager.getProperty(
			Packages.efw.properties.PropertiesManager.EFW_FORBIDDEN_REPLACEMENT,"");
		characters=characters.split("");
		replacement=replacement.split("");
		//禁則文字対応
		for (var i=0;i<characters.length;i++){
			var chr=characters[i];
			var rpl=replacement[i];
			if (rpl==null)rpl="";
			value=value.replace(new RegExp("["+chr+"]","g"),rpl);
		}
	    return value;
	}
	return getParam(url,key);
};
///////////////////////////////////////////////////////////////////////////////
/**
 * create instances.
 */
var request = new EfwServerRequest();
