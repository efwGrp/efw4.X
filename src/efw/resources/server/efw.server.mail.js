"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
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
 */
EfwServerMail.prototype.send = function(groupId, mailId, params) {
	var hashMapParams = new java.util.HashMap();
	for ( var key in params) {
		var vl = "" + params[key];
		hashMapParams.put(key, vl);
	}
	Packages.efw.mail.MailManager.send(groupId, mailId, hashMapParams);
};
