"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
/**
 * Eval script in another engine context,and return several values.
 */
(function(context){
	//name:{max:10,scs:[{running:true,_sc:objSimpleScriptContext},]}
	var pool={};
	var _locker = Packages.efw.script.ScriptManager.getLocker();
	//param={name:"",max:9,initializer:"",script:"",context:{},engine:"",returnVar:""}
	
	function loadWithGlobalPool(param){
		var name=param.name;
		var max=new Number(param.max);
		var initializer=param.initializer;
		var script=param.script;
		var context=param.context;
		var engine=param.engine;
		var returnVar=param.returnVar;
		if (name==null)name="default";
		if (isNaN(max))max=10;
		if (initializer==null)initializer="";
		if (script==null)script="";
		if (engine==null||engine==""){
			engine="nashorn";
		}else{
			engine=engine.toLowerCase();
			if (engine!="nashorn"&&engine!="javet"){
				throw new Error("Please use one of the next engines [ nasorn | javet ].");
			}
		}
		var borrowed=null;
		_locker.lock();
		try{
			while(true){
				if (pool[name]==null){
					pool[name]={max:max,scs:[]};
				}
				var scs=pool[name].scs;
				var max=pool[name].max;
				for(var i=0;i<scs.length;i++){
					var sc=scs[i];
					if (sc.running==false){
						borrowed=sc;
						scs.splice(i,1);
						scs.push(borrowed);
						break;
					}
				}
				if (borrowed!=null){
					borrowed.running=true;
					break;
				}else if (scs.length<max){
					if (engine=="nashorn"){
						borrowed={running:true,_sc:new javax.script.SimpleScriptContext()};
						var _sc=borrowed._sc;
						_sc.setAttribute("_isdebug", _isdebug, javax.script.ScriptContext.ENGINE_SCOPE);
						_sc.setAttribute("_eventfolder", _eventfolder, javax.script.ScriptContext.ENGINE_SCOPE);
						var innerScript="";
						innerScript+="load('classpath:efw/resources/server/efw.server.format.js');\n";
						innerScript+="load('classpath:efw/resources/server/nashorn-ext-for-es6.min.js');\n";
						innerScript+="load('classpath:efw/resources/server/nashorn-ext-for-efw.js');\n";
						Packages.efw.script.ScriptManager.se().eval(innerScript,_sc);
						for(var key in context){
							_sc.setAttribute(key, context[key], javax.script.ScriptContext.ENGINE_SCOPE);
						}
						Packages.efw.script.ScriptManager.se().eval(initializer,_sc);
						scs.push(borrowed);
					}else if (engine=="javet"){
						borrowed={running:true,_sc:Packages.com.caoccao.javet.interop.V8Host.getNodeInstance().createV8Runtime()};
						var _sc=borrowed._sc;
						var g=_sc.getGlobalObject();
						g.set("_isdebug",_isdebug);
						g.set("_eventfolder",_eventfolder);
						for(var key in context){
							g.set(key,context[key]);
						}
						g.close();
						_sc.getExecutor(initializer).executeVoid();
						_sc.await();
						scs.push(borrowed);
					}
					break;
				}else{
					java.lang.Thread.sleep(50);
				}
			}
		}finally{
			_locker.unlock();
		}
		try{
			var _sc=borrowed._sc;
			if (engine=="nashorn"){
				for(var key in context){
					_sc.setAttribute(key, context[key], javax.script.ScriptContext.ENGINE_SCOPE);
				}
				if (returnVar==null){
					return Packages.efw.script.ScriptManager.se().eval(script,_sc);
				}else{
					Packages.efw.script.ScriptManager.se().eval(script,_sc);
					return Packages.efw.script.ScriptManager.se().eval(returnVar+";",_sc);
				}
			}else if (engine=="javet"){
				var g=_sc.getGlobalObject();
				for(var key in context){
					g.set(key,context[key]);
				}
				g.close();
				_sc.getExecutor(script).executeVoid();
				_sc.await();
				return _sc.getExecutor(returnVar+";").executeObject();
			}
		}finally{
			borrowed.running=false;
		}
	}
	function closeTimer4doDestroy(){
		_timer.cancel();
		for(var key in pool){
			var scs=pool[key].scs;
			if (scs!=null){
				for(var i=0;i<scs.length;i++){
					Packages.efw.script.ScriptManager.se().eval("closeTimer4doDestroy();",scs[i]._sc);
				}
			}
		}
	}
	context.loadWithGlobalPool=loadWithGlobalPool;
	efw.doDefaultDestroy=closeTimer4doDestroy;
})(new Function('return this')());
