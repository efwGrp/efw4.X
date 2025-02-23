"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */

// /////////////////////////////////////////////////////////////////////////////
function doDestroy(){
	/**
	 * Run by servlet destory.
	 */
	try{
		if (event._load("destroy",true)){
			efw.server.fire(event._get("destroy"));
		}
	}catch(e){
		if (e instanceof Error)e=""+e;
		Packages.efw.framework.runtimeSLog("destory event failed.",e);
		throw e;//destoryエラーの場合
	}finally{
		closeTimer4doDestroy();
	}
}
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
	var currentAuthBean=Packages.efw.efwCorsFilter.getCurrentAuthBean();
	
	//イベント維持の呼び出しならからを戻す
	if (eventId=="efw_keepConnectionAlive") return JSON.stringify(new Result());

	//イベント取得できない場合、エラーを画面に出す。該当エラーはよく発生する。
	var ev=event._get(eventId);
	//if event is not loaded or it is in debug mode
	if (ev==null||(ev.from=="file" && _isdebug)){
		ev=event._load(eventId);
	}
	if (ev==null){
		eventId=eventId.replace(/</g,"&lt;").replace(/>/g,"&gt;");//to encode the error eventid for showing in alert dialog.
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":""+messages.get("EventIsNotExistsMessage",lang)});
		var systemErrorUrl=""+currentAuthBean.systemErrorUrl;
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
				ret = efw.server.checkAuth(eventId, lang);
				if (ret == null){
					ret = efw.server.checkStyle(ev, params, lang);
					if (ret == null){
						if (semaphore==null){
							Packages.efw.framework.accessLog(session.get(currentAuthBean.loginKey),req);//操作履歴のため。
							ret = efw.server.fire(ev, params);
						}else if(semaphore.tryAcquire()){
							semaphoreNeedRelease=true;
							Packages.efw.framework.accessLog(session.get(currentAuthBean.loginKey),req);//操作履歴のため。
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
			if(ret.withoutI18nTranslation){
				return JSON.stringify(ret);
			}else{
				return messages.translate(JSON.stringify(ret),lang);
			}
		}
	}catch(e){
		if (e instanceof Error)e=""+e;
		Packages.efw.framework.runtimeSLog(e);
		var errorMsg=""+Packages.efw.framework.getUsefulInfoFromException(e);
		errorMsg=errorMsg.replace(/</g,"&lt;").replace(/>/g,"&gt;");//to encode the error message for showing in alert dialog.
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":errorMsg});
		var systemErrorUrl=""+currentAuthBean.systemErrorUrl;
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
			var g = new Function('return this')();
			for(var i in g){
				if (  efw.contains(i)
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
				java.lang.System.out.println(ret.echos[i]);
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
		if (e instanceof Error)e=""+e;
		Packages.efw.framework.runtimeSLog(e);
		return;//exception return;
	}finally{
		closeTimer4doDestroy();
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
		var currentAuthBean=Packages.efw.efwCorsFilter.getCurrentAuthBean();
		Packages.efw.framework.accessLog(session.get(currentAuthBean.loginKey),eventId+"/"+keys.join("/"));//操作履歴のため。
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
		if (e instanceof Error)e=""+e;
		Packages.efw.framework.runtimeSLog(e);
		db._rollbackAll();
		throw e;//500 Internal Server Error
	}finally{
		db._closeAll();
	}
};