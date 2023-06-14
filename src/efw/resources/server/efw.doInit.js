"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The global variables created from java.
///////////////////////////////////////////////////////////////////////////////
/**
 * The event folder absolute path.
 */
//var _eventfolder;
/**
 * The boolean flag to show the mode is debug or not.
 */
//var _isdebug;
/**
 * The javascript engine.
 */
///////////////////////////////////////////////////////////////////////////////
//The class of efw
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 */
function Efw() {
};
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * Add clone function to JSON for deep copy
 */
JSON.clone = function(obj,execFuncFlag) {//TODO
	if (obj === null || obj === undefined) { // null copy
		return obj;
	} else if (typeof obj == "function") { // function executed value
		if (execFuncFlag){
			return obj();
		}else{
			return obj;
		}
	} else if (typeof obj !== "object") { // simple value copy
		return obj;
	}
	var oClone;
	switch (obj.constructor) {
	case RegExp:
		oClone = new RegExp(obj.source, "g".substr(0, Number(obj.global)) + "i".substr(0, Number(obj.ignoreCase)) + "m".substr(0, Number(obj.multiline)));
		break;
	case Date:
		oClone = new Date(obj.getTime());
		break;
	case String:
		oClone = "" + obj;
		break;
	case Boolean:
		oClone = false && obj;
		break;
	case Number:
		oClone = 0 + obj;
		break;
	case Array:
		oClone = [];
		for (var sProp in obj) {
			if (sProp=="debug") continue;// debug function is skipped
			oClone[sProp] = JSON.clone(obj[sProp],execFuncFlag); 
		}
		break;
	// etc.
	default:
		oClone = {};
		for (var sProp in obj) {
			if (sProp=="debug") continue;// debug function is skipped
			oClone[sProp] = JSON.clone(obj[sProp],execFuncFlag); 
		}
	}
	return oClone;
};
/**
 * Load all classes
 */
load("classpath:efw/resources/server/efw.server.messages.js");
load("classpath:efw/resources/server/efw.server.js");
load("classpath:efw/resources/server/efw.server.format.js");
load("classpath:efw/resources/server/efw.server.properties.js");
load("classpath:efw/resources/server/efw.server.session.js");
load("classpath:efw/resources/server/efw.server.db.js");
load("classpath:efw/resources/server/efw.server.event.js");
load("classpath:efw/resources/server/efw.server.file.js");
load("classpath:efw/resources/server/efw.server.brms.js");
load("classpath:efw/resources/server/efw.server.mail.js");
load("classpath:efw/resources/server/efw.server.record.js");
load("classpath:efw/resources/server/efw.server.result.js");
load("classpath:efw/resources/server/efw.server.excel.js");
load("classpath:efw/resources/server/efw.server.batch.js");
load("classpath:efw/resources/server/efw.server.cookie.js");
load("classpath:efw/resources/server/efw.server.barcode.js");
load("classpath:efw/resources/server/efw.server.csv.js");
load("classpath:efw/resources/server/efw.server.txt.js");
load("classpath:efw/resources/server/efw.server.binary.js");
load("classpath:efw/resources/server/efw.server.threads.js");
load("classpath:efw/resources/server/efw.server.debug.js");
load("classpath:efw/resources/server/efw.server.rest.js");
load("classpath:efw/resources/server/efw.server.cmd.js");
load("classpath:efw/resources/server/efw.doHandles.js");

/**
 * create instances.
 */
var efw = new Efw();
var properties = new EfwServerProperties();
var session = new EfwServerSession();
var db = new EfwServerDb();
var event = new EfwServerEvent();
var file = new EfwServerFile(false);
var absfile = new EfwServerFile(true);
var brms = new EfwServerBRMS();
var mail = new EfwServerMail();
var cookie = new EfwServerCookie();
var barcode = new EfwServerBarcode();
var messages = new EfwServerMessages();
var rest = new EfwServerRest();
var cmd = new EfwServerCmd();

efw.server = new EfwServer();
// /////////////////////////////////////////////////////////////////////////////
// The initialization of system.
// /////////////////////////////////////////////////////////////////////////////

load("classpath:efw/resources/elfinder/init.js");

/**
 * Run global event.
 */
if (event._load("global",true)){
	try{
		efw.server.fire(event._get("global"));
	}catch(e){
		Packages.efw.framework.initSLog("Global event failed.",e);
		throw e;//globalエラーの場合、初期化失敗
	}
}
