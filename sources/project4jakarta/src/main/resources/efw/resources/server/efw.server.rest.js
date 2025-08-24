"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to visit the rest service
 *
 * @author lndljack
 */
function EfwServerRest() {

}

/**
 * The function to get data from the rest service.
 * @param {String} apiUrl
 * @param {key:value} heads
 * @returns {JsonObject}
 */
EfwServerRest.prototype.get=function(apiUrl, heads){
	var mapHeads=new java.util.HashMap();
	if (heads!=null){
		for(var key in heads){
			mapHeads.put(key,heads[key]);
		}
	}
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"GET","",mapHeads);
    if (strRtnVal==""){
    	return null;
    }else{
        return JSON.parse(strRtnVal);
    }
};

/**
 * The function to post data to the rest service.
 * @param {String} apiUrl
 * @param {id:string} params
 * @param {key:value} heads
 * @returns {JsonObject}
 */
EfwServerRest.prototype.post=function(apiUrl, params, heads){
	var mapHeads=new java.util.HashMap();
	if (heads!=null){
		for(var key in heads){
			mapHeads.put(key,heads[key]);
		}
	}
    var strJson = JSON.stringify(params);
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"POST",strJson,mapHeads);
    if (strRtnVal==""){
    	return null;
    }else{
        return JSON.parse(strRtnVal);
    }
};

/**
 * The function to put data to the rest service.
 * @param {String} apiUrl
 * @param {id:string} params
 * @param {key:value} heads
 * @returns {JsonObject}
 */
EfwServerRest.prototype.put=function(apiUrl, params, heads){
	var mapHeads=new java.util.HashMap();
	if (heads!=null){
		for(var key in heads){
			mapHeads.put(key,heads[key]);
		}
	}
    var strJson = JSON.stringify(params);
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"PUT",strJson,mapHeads);
    if (strRtnVal==""){
    	return null;
    }else{
        return JSON.parse(strRtnVal);
    }
};

/**
 * The function to delete data from the rest service.
 * @param {String} apiUrl
 * @param {key:value} heads
 * @returns {JsonObject}
 */
EfwServerRest.prototype.delete=function(apiUrl, heads){
	var mapHeads=new java.util.HashMap();
	if (heads!=null){
		for(var key in heads){
			mapHeads.put(key,heads[key]);
		}
	}
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"DELETE","",mapHeads);
    if (strRtnVal==""){
    	return null;
    }else{
        return JSON.parse(strRtnVal);
    }
};
/**
 * The function to get response code after rest calling.
 * @returns {JsonObject}
 */
EfwServerRest.prototype.getStatus=function(){
	return 0 + Packages.efw.rest.RestManager.getStatus();
}