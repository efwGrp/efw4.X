/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */

// /////////////////////////////////////////////////////////////////////////////
/**
 * The ajax service function<br>
 * It will be called by efwServlet
 * 
 * @param req:
 *            JSON String from client
 * @returns: JSON String to client
 */
function doLambdaPost(req) {
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
			var ret = efw.server.checkStyle(ev, params, lang);
			if (ret == null){
				if (semaphore==null){
					Packages.efw.framework.accessLog(null,req);//操作履歴のため。
					ret = efw.server.fire(ev, params);
				}else if(semaphore.tryAcquire()){
					semaphoreNeedRelease=true;
					Packages.efw.framework.accessLog(null,req);//操作履歴のため。
					ret = efw.server.fire(ev, params);
				}else{
					ret=(new Result()).error("EventIsBusyException",service);
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
		var errorMsg=""+Packages.efw.framework.getUsefulInfoFromException(e);
		errorMsg=errorMsg.replace(/</g,"&lt;").replace(/>/g,"&gt;");//to encode the error message for showing in alert dialog.
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":errorMsg});
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
					||i=="rest"
					||i=="mail"
					||i=="cookie"
					||i=="barcode"
					||i=="Master_lock"
					||i=="Event_lock"
					||i=="TXTReader_lock"
					||i=="CSVReader_lock"
					||i=="BinaryReader_lock"
					||i=="Base64"
					||i=="messages"
					||i=="langs"
					||i=="context"//only rhino
					||i=="JavaAdapter"//only rhino
					||i=="global"//global event
					||typeof g[i]=="function"//common function
					||(g[i]!=null&&g[i].fire!=null)//event js
					||(g[i]!=null&&(g[i].PUT!=null||g[i].GET!=null||g[i].POST!=null||g[i].DELETE!=null))//restAPI js
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
