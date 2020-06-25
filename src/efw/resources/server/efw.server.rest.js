/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to visit the rest service
 *
 * @author lndljack
 */
function EfwServerRest() {

}

/**
 * The function to get data from the rest service.
 * @param {String} strUrl
 * @returns {JsonObject}
 */
EfwServerRest.prototype.get=function(apiUrl){
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"GET","");
    return JSON.parse(strRtnVal);
};

/**
 * The function to post data to the rest service.
 * @param {String} strUrl
 * @param {id: string} params
 * @returns {JsonObject}
 */
EfwServerRest.prototype.post=function(apiUrl, params){
    var strJson = JSON.stringify(params);
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"POST",strJson);
    return JSON.parse(strRtnVal);
};

/**
 * The function to put data to the rest service.
 * @param {String} strUrl
 * @param {id: string} params
 * @returns {JsonObject}
 */
EfwServerRest.prototype.put=function(apiUrl, params){
    var strJson = JSON.stringify(params);
    var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"PUT",strJson);
    return JSON.parse(strRtnVal);
};

/**
 * The function to delete data from the rest service.
 * @param {String} strUrl
 * @returns {JsonObject}
 */
EfwServerRest.prototype.delete=function(apiUrl){
	var strRtnVal = Packages.efw.rest.RestManager.visit(apiUrl,"DELETE","");
    return JSON.parse(strRtnVal);
};
/**
 * The function to get response code after rest calling.
 * @returns {JsonObject}
 */
EfwServerRest.prototype.getStatus=function(){
	return 0 + Packages.efw.rest.RestManager.getStatus();
}