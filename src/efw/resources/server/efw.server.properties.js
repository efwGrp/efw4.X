/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to operate efw.properties file.
 * 
 * @author Chang Kejun
 */
function EfwServerProperties() {
};
/**
 * The function to get String value from efw.properties file.
 * 
 * @param {String}
 *            key: required<br>
 * @param {String}
 *            defaultValue: optional<br>
 * @returns {any}
 */
EfwServerProperties.prototype.get = function(key, defaultValue) {
	var dv;
	if (defaultValue == null) {
		dv = null;
	} else {
		dv = defaultValue + "";
	}
	var value=""+Packages.efw.properties.PropertiesManager.getProperty(key, dv);
	if(defaultValue==null){
		return value;
	}else if(typeof defaultValue=="string"){
		return value;
	}else if(typeof defaultValue=="number"){
		return 0+new Number(value);
	}else if(typeof defaultValue=="boolean"){
		return true && java.lang.Boolean.parseBoolean(value);
	}else{
		return value;
	}
};
