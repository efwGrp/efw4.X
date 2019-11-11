/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to keep messages in server.
 * 
 * @author Chang Kejun
 */
var EfwServerMessages = function() {
};
EfwServerMessages.prototype.get=function(messageId,lang){
	if (messageId=="NumberType") return Packages.efw.i18n.I18nManager.get(lang,messageId,"number");
	if (messageId=="DateType") return Packages.efw.i18n.I18nManager.get(lang,messageId,"date");
	if (messageId=="StringType") return Packages.efw.i18n.I18nManager.get(lang,messageId,"string");
	if (messageId=="SessionTimeoutException") return Packages.efw.i18n.I18nManager.get(lang,messageId,"Session timeout. Please log in again.");
	if (messageId=="NumberIsReuqiredMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"Please enter {display-name} with a valid number.");
	if (messageId=="DateIsReuqiredMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"Please enter {display-name} with a valid date.");
	if (messageId=="IsRequiredMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"Please enter {display-name}.");
	if (messageId=="MaxLengthOverMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"{display-name} cannot be greater than {max-length} words.");
	if (messageId=="MinOrMaxOverMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"{display-name} is {data-type} between {min} and {max}.");
	if (messageId=="MinOverMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"{display-name} is {data-type} not less than {min}.");
	if (messageId=="MaxOverMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"{display-name} is {data-type} no larger than {max}.");
	if (messageId=="NotAcceptMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"Please select the correct file for {display-name}.");
	if (messageId=="EventIsNotExistsMessage") return Packages.efw.i18n.I18nManager.get(lang,messageId,"The event cannot be loaded because there is no file or JavaScript language violation.");
	return Packages.efw.i18n.I18nManager.get(lang,messageId,messageId);
};
EfwServerMessages.prototype.translate = function(jsonString,lang) {
	if(lang==null){
		return jsonString;
	}else{
		var keys=jsonString.match(/\{[\w]+\}/g);
		if (keys!=null){
			for(var i=0;i<keys.length;i++){
				var key=keys[i];
				key=key.substr(1,key.length-2);
				var msg=Packages.efw.i18n.I18nManager.get(lang,key,"");
				if(msg==""){
					//do nothing if without defines
				}else{
					jsonString=jsonString.replace("{"+key+"}",msg);
				}
			}
		}
	}
	return jsonString;
};

