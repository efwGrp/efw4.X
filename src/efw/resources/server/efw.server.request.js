"use strict";
/**** efw4.X Copyright 2024 efwGrp ****/
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
	var url= Packages.efw.framework.getRequest().getHeader("referer");
	function getParam(url,name) {
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	return getParam(url,key);
};

