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
//var _engine;// Oracle Nashorn 1.8 or graalvm 1.8
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
load("classpath:efw/resources/server/base64.min.js");
load("classpath:efw/resources/server/efw.server.csv.js");
load("classpath:efw/resources/server/efw.server.txt.js");
load("classpath:efw/resources/server/efw.server.threads.js");
load("classpath:efw/resources/server/efw.server.debug.js");
load("classpath:efw/resources/server/efw.server.rest.js");

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
// /////////////////////////////////////////////////////////////////////////////
/**
 * The ajax service function<br>
 * It will be called by efwServlet
 * 
 * @param req:
 *            JSON String from client
 * @returns: JSON String to client
 */
function doPost(req) {
	var reqJson = JSON.parse(req); // parse request string to json object
	var eventId = reqJson.eventId; // get eventId from json object
	var params = reqJson.params; // get params from json object
	var lang = reqJson.lang; // get lang from json object
	var service = null;
	var semaphore = null;// the semmaphore to control event maxrequests
	var semaphoreNeedRelease=false;// the flag about semmaphore release

	//イベント取得できない場合、エラーを画面に出す。該当エラーはよく発生する。
	var ev=event._get(eventId);
	//if event is not loaded or it is in debug mode
	if (ev==null||(ev.from=="file" && _isdebug)){
		ev=event._load(eventId);
	}
	if (ev==null){
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":""+messages.get("EventIsNotExistsMessage",lang)});
		var systemErrorUrl=properties.get("efw.system.error.url","error.jsp");
		if (systemErrorUrl!=""){
			result.navigate(systemErrorUrl);
		}
		return messages.translate(JSON.stringify(result),lang);
	}else{
		service=ev.service;
		semaphore=ev.semaphore;
	}

	try{
		if (params == null) {
			return messages.translate(JSON.stringify(JSON.clone(ev.paramsFormat,true)),lang);
		} else {
			//login check
			var ret = efw.server.checkLogin(eventId, lang);
			if (ret==null){
				// auth check
				ret = efw.server.checkAuth(eventId);
				if (ret == null){
					ret = efw.server.checkStyle(ev, params, lang);
					if (ret == null){
						if (semaphore==null){
							Packages.efw.framework.accessLog(session.get(properties.get("efw.login.key")),req);//操作履歴のため。
							ret = efw.server.fire(ev, params);
						}else if(semaphore.tryAcquire()){
							semaphoreNeedRelease=true;
							Packages.efw.framework.accessLog(session.get(properties.get("efw.login.key")),req);//操作履歴のため。
							ret = efw.server.fire(ev, params);
						}else{
							ret=(new Result()).error("EventIsBusyException",service);
						}
					}
				} 
			}
			// if it is null, return blank array to client as a success
			if (ret == null) ret=new Result();
			
			var arylst=Packages.efw.framework.getThreadLogs();
			ret.threadLogs=[];
			if(arylst!=null){
				for(var i=0;i<arylst.size();i++){
					ret.threadLogs.push(arylst.get(i));
				}
			}
			// change data to string and return it to client
			return messages.translate(JSON.stringify(ret),lang);
		}
	}catch(e){
		Packages.efw.framework.runtimeSLog(e);
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":""+Packages.efw.framework.getUsefulInfoFromException(e)});
		var systemErrorUrl=properties.get("efw.system.error.url","error.jsp");
		if (systemErrorUrl!=""){
			result.navigate(systemErrorUrl);
		}
		var arylst=Packages.efw.framework.getThreadLogs();
		result.threadLogs=[];
		if(arylst!=null){
			for(var i=0;i<arylst.size();i++){
				result.threadLogs.push(arylst.get(i));
			}
		}
		return messages.translate(JSON.stringify(result),lang);
	}finally{
		if(semaphoreNeedRelease){
			semaphore.release();
		}
		//remove all uploaded files when event over
		Packages.efw.file.FileManager.removeUploadFiles();
		// to find javascript global pollution when debug mode and second calling.
		if (_isdebug && params!=null){
			var g = Function('return this')();
			for(var i in g){
				if (i=="_eventfolder"
					||i=="_isdebug"
					||i=="_engine"
					||i=="efw"
					||i=="properties"
					||i=="session"
					||i=="db"
					||i=="event"
					||i=="file"
					||i=="absfile"
					||i=="brms"
					||i=="mail"
					||i=="cookie"
					||i=="barcode"
					||i=="Master_lock"
					||i=="Event_lock"
					||i=="TXTReader_lock"
					||i=="CSVReader_lock"
					||i=="Base64"
					||i=="messages"
					||i=="langs"
					||i=="context"//only rhino
					||i=="JavaAdapter"//only rhino
					||i=="global"//global event
					||typeof g[i]=="function"//common function
					||(g[i]!=null&&g[i].fire!=null&&g[i].paramsFormat!=null)
				){
					//default global object is ok
				}else{
					// you should do something if the comment is printed out.
					Packages.efw.framework.runtimeWLog("[" + i + "] is a variable without var keyword.It is Not Recommended.");
				}
			}				
		}
	}
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The service function<br>
 * It will be called by efwBatch
 * 
 * @param req:
 *            JSON String from batch
 * @returns: JSON String to batch
 */
function doBatch(req) {
	var reqJson = JSON.parse(req); // parse request string to json object
	var eventId = reqJson.eventId; // get eventId from json object
	var params = reqJson.params; // get params from json object
	var lang = reqJson.lang; // get lang from json object
	try{
		var ev=event._get(eventId);
		//if event is not loaded or it is in debug mode
		if (ev==null||(ev.from=="file" && _isdebug)){
			ev=event._load(eventId);
		}
		if (ev==null){
			return;//Event Is Not Exists this error will show trace info by load function.
		}
		var ret = efw.server.checkStyle(ev, params);
		if (ret!=null){
			java.lang.System.out.println(ret.actions.alert.join("\n"));// params error, return;
			return;
		}
		ret = efw.server.fire(ev, params);
		if(ret==null){
			return;
		}else if(ret.errorlevel!=null){//batch objectの戻り値の場合
	    	for(var i=0;i<ret.logs.length;i++){
	    		Packages.efw.framework.runtimeWLog(ret.logs[i]);
	    	}
	    	for(var i=0;i<ret.echos.length;i++){
	    		java.lang.System.System.out.println(ret.echos[i]);
	    	}
	    	if(ret.errorlevel>0){
	    		java.lang.System.exit(ret.errorlevel);
	    	}
	    	return;//event return is normal
		}else{
			java.lang.System.out.println(JSON.stringify(ret));
			return;//event return has errorlevel
		}
	}catch(e){
		Packages.efw.framework.runtimeSLog(e);
		return;//exception return;
	}
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The service function<br>
 * It will be called by efwRestAPI
 * 
 * @param req:
 *            JSON String from batch
 * @param httpMethod:
 *            PUT GET POST DELETE
 * @returns: 　https://qiita.com/uenosy/items/ba9dbc70781bddc4a491
 * 			500 Internal Server Error	その他のサーバに起因するエラーにより処理続行できない場合
 * 			404 Not Found				イベントが見つからない
 * 			200 OK						GET PUT POST方法成功の戻り値、結果リソースと一緒に送信
 * 			204 No Content				PUT POST DELETE方法成功の戻り値、結果リソースと一緒に送信しない
 * 
 */
function doRestAPI(eventId,reqkeys,httpMethod,reqParams) {
	reqParams=reqParams.replace(/\r?\n/g, "");//to delete \r\n
	var params = reqParams==""?{}:JSON.parse(reqParams); // parse request string to json object. if blank then {}
	var keys = JSON.parse(reqkeys);// parse keys string to json array
	var lang = params==null?"en":params.lang; // get lang from json object

	//イベント取得できない場合、エラーを画面に出す。該当エラーはよく発生する。
	var ev=event._get(eventId);
	//if event is not loaded or it is in debug mode
	if (ev==null||(ev.from=="file" && _isdebug)){
		ev=event._load(eventId);
	}
	if (ev==null){
		Packages.efw.framework.getResponse().setStatus(java.net.HttpURLConnection.HTTP_NOT_FOUND);//404 Not Found 見つからない
		return;
	}

	try{
		Packages.efw.framework.accessLog(session.get(properties.get("efw.login.key")),eventId+"/"+keys.join("/"));//操作履歴のため。
		var ret;
		if (httpMethod=="PUT"){
			ret=ev.PUT(keys,params);
		}else if (httpMethod=="POST"){
			ret=ev.POST(keys,params);
		}else if (httpMethod=="GET"){
			ret=ev.GET(keys);
		}else if (httpMethod=="DELETE"){
			ev.DELETE(keys);
		}
		
		db._commitAll();
		// if it is null, return blank array to client as a success
		if (ret != null){//200 201
			Packages.efw.framework.getResponse().setStatus(java.net.HttpURLConnection.HTTP_OK);//200 OK
		}else{//204
			Packages.efw.framework.getResponse().setStatus(java.net.HttpURLConnection.HTTP_NO_CONTENT);//204 No Content
		}
		
		db._commitAll();
		// change data to string and return it to client
		if (ret != null){//200 201
			return JSON.stringify(ret);
		}else{
			return;
		}
	}catch(e){
		Packages.efw.framework.runtimeSLog(e);
		db._rollbackAll();
		throw e;//500 Internal Server Error
	}finally{
		db._closeAll();
	}
};