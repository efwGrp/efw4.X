/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to operate event.
 * 
 * @author Chang Kejun
 */
function EfwServerEvent() {
};
/**
 * The function to fire another event in an event firing.
 * 
 * @param {String}
 *            eventId: required<br>
 * @param {Object}
 *            params: optional<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {String}
 *            server: optional<br>
 *            The url of cors connections to another web server application constructed by Efw.<br>
 *            http://127.0.0.1:8080/efw<br>
 * @returns {Result}
 */
EfwServerEvent.prototype.fire = function(eventId, params, server) {
	if (server==undefined){
		if (params==undefined){
			params={};
		}else if(typeof(params) == "string"){
			server=params;
			params={};
		}
	}
	var result=new Result();
	if (server==undefined){
		var ev=this._get(eventId);
		if (ev==null||ev.from=="file"){
			ev=this._load(eventId);
		}
		result=ev.fire(params);
	}else{
		var servletUrl = "efwServlet";
		var jsonString=""+Packages.efw.event.RemoteEventManager.call(
				server+"/"+servletUrl,
				JSON.stringify({eventId:eventId,params:params})
			);
		var resultJSON=JSON.parse(jsonString);
		if (resultJSON.actions!=null&&resultJSON.values!=null){
			result.actions=resultJSON.actions;
			result.values=resultJSON.values;
		}else{
			result=resultJSON;
		}
	}
	return result;
};
///////////////////////////////////////////////////////////////////////////////

EfwServerEvent.prototype._get = function(eventId){
	var g = Function('return this')();
	return g[eventId];
};
EfwServerEvent.prototype._set = function(eventId, ev){
	var g = Function('return this')();
	g[eventId]=ev;
};
/**
 * The locker for event operating.
 */
EfwServerEvent.prototype._locker = new java.util.concurrent.locks.ReentrantLock();
/**
 * The function to load a event.<br>
 * If the debug mode,load event every time.<br>
 * If the release mode, load event only the first time.<br>
 * If the event is from resource,do not reload it.<br>
 * @param {String}
 *            eventId: required<br>
 * @returns {EventInfo}
 */
EfwServerEvent.prototype._load = function(eventId,loadingGlobal){
	//if the global.js is not exists,warning log.
	if (loadingGlobal){
		if (!absfile.exists(_eventfolder + "/" + eventId + ".js")){
			Packages.efw.framework.initWLog("global.js is not found.");
			return null;
		}
	}
	//--------------------
	/**
	 * This function to set eventinfo about service
	 */
	function setService(ev,preService,preSemaphore){
		if (ev.service!=null){
			if (preService==null)preService={};
			if(ev.service.max!=null && ev.service.max>-1 && ev.service.max!=preService.max){
				ev.semaphore=new java.util.concurrent.Semaphore(ev.service.max); 
			}else if(ev.service.max==preService.max){
				ev.semaphore=preSemaphore;
			}
		}else{
			ev.semaphore=null;
		}
	}
	//--------------------
	try {
		this._locker.lock();
		//if the event hasnot be loaded, load it.
		if(!this._get(eventId)){
			load(_eventfolder + "/" + eventId + ".js");
			var ev=this._get(eventId);
			if (ev){
				ev.from="file";
				if(eventId!="global")setService(ev,null,null);
			}
		}else if (_isdebug){
			var org=this._get(eventId);
			this._set(eventId,null);
			load(_eventfolder + "/" + eventId + ".js");
			var ev=this._get(eventId);
			if (ev){
				ev.from="file";
				setService(ev,org.service,org.semaphore);
			}
		}
	}catch(e){
		if (loadingGlobal){
			Packages.efw.framework.initSLog("global.js cannot be loaded.",e);
		}else{
			Packages.efw.framework.runtimeSLog(e);
		}
		this._set(eventId,null);
	} finally {
		this._locker.unlock();
	}
	return this._get(eventId);
};


