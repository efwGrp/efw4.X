"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to send mail.
 * 
 * @author Chang Kejun
 */
function EfwServerMail() {
};
/**
 * The function to send mail.
 * 
 * @param {String}
 *            groupId: required<br>
 * @param {String}
 *            mailId: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Boolean}
 *            inBackground: optional<br>
 */
EfwServerMail.prototype.send = function(groupId, mailId, params, inBackground) {
	var hashMapParams = new java.util.HashMap();
	for ( var key in params) {
		var vl = "" + params[key];
		hashMapParams.put(key, vl);
	}
	if (inBackground){
		Packages.efw.mail.MailManager.sendInBackground(groupId, mailId, hashMapParams);
	}else{
		Packages.efw.mail.MailManager.send(groupId, mailId, hashMapParams);
	}
};
