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

///////////////////////////////////////////////////////////////////////////////
//The class of efw
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 */
function Efw() {};
/**
 */
Efw.prototype._keys=[];
/**
 * Register a key in efw to bypass global pollution checks
 */
Efw.prototype.register=function(key){
	Efw.prototype._keys.push(key);
}
/**
 * Check a key is exists in efw context or not.
 */
Efw.prototype.contains=function(key){
	if (Efw.prototype._keys.indexOf(key)>-1){
		return true;
	}else{
		return false;
	}
}
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * Load all classes
 */
load("classpath:efw/resources/server/efw.server.format.js");
load("classpath:efw/resources/server/nashorn-ext-for-es6.min.js");
load("classpath:efw/resources/server/nashorn-ext-for-efw.js");
load("classpath:efw/resources/server/efw.server.messages.js");
load("classpath:efw/resources/server/efw.server.js");
load("classpath:efw/resources/server/efw.server.properties.js");
load("classpath:efw/resources/server/efw.server.session.js");
load("classpath:efw/resources/server/efw.server.request.js");
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
load("classpath:efw/resources/server/efw.server.rest.js");
load("classpath:efw/resources/server/efw.server.cmd.js");
load("classpath:efw/resources/server/efw.server.pdf.js");
load("classpath:efw/resources/server/efw.doHandles.js");
/**
 * create instances.
 */
var efw = new Efw();efw.register("efw");
var properties = new EfwServerProperties();efw.register("properties");
var session = new EfwServerSession();efw.register("session");
var request = new EfwServerRequest();efw.register("request");
var db = new EfwServerDb();efw.register("db");
var event = new EfwServerEvent();efw.register("event");
var file = new EfwServerFile(false);efw.register("file");
var absfile = new EfwServerFile(true);efw.register("absfile");
var brms = new EfwServerBRMS();efw.register("brms");
var mail = new EfwServerMail();efw.register("mail");
var cookie = new EfwServerCookie();efw.register("cookie");
var barcode = new EfwServerBarcode();efw.register("barcode");
var messages = new EfwServerMessages();efw.register("messages");
var rest = new EfwServerRest();efw.register("rest");
var cmd = new EfwServerCmd();efw.register("cmd");
efw.register("_eventfolder");
efw.register("_isdebug");
efw.register("window");
efw.register("navigator");
efw.register("self");
efw.register("console");
efw.register("_timer");
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
		if (e instanceof Error)e=""+e;
		Packages.efw.framework.initSLog("Global event failed.",e);
		throw e;//globalエラーの場合、初期化失敗
	}
}
