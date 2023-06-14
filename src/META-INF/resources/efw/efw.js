/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * efw framework client library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 * Efw(eventId)<br>
 * Efw(eventId,manualParams)<br>
 * Efw(eventId,sever)<br>
 * Efw(eventId,manualParams,sever)<br>
 */
var _efw_keepConnectionAlive_servers={};
var Efw = function(eventId,manualParams,server) {
	if(eventId!=undefined){
		var eventParams={"eventId":eventId};
		if(typeof manualParams =="string") {
			eventParams.server=manualParams;
		}else{
			eventParams.manualParams=manualParams;
			eventParams.server=server;
		}
		(new EfwClient()).fire(eventParams);
		if (eventParams.server!=null) _efw_keepConnectionAlive_servers[eventParams.server]=eventParams.server;
	}
};

Efw.prototype.baseurl = ".";
Efw.prototype.dialog = null;
Efw.prototype.messages = null;
Efw.prototype.lang = "en"; 
// /////////////////////////////////////////////////////////////////////////////
// The initialization of system.
// /////////////////////////////////////////////////////////////////////////////
/**
 * efw is an instance of Efw.<br>
 * all using of framework base functions in your program should be started from
 * it.
 */
var efw = new Efw();
/**
 * Enable cors.
 */
jQuery.support.cors = true;
/**
 * Add events for input behaviors.
 */
var _efw_keepConnectionAlive_handle=null;
$(function() {
	//--behavior---------------------------------------------------------------
	window.onhelp = efwClientInputBehavior.prototype.unDohelp;
	$(document).on("keydown",efwClientInputBehavior.prototype.DoShortcut);
	var strSelectors=":text,:password,:radio,:checkbox,select,textarea"
		+",[type='search']"
		+",[type='tel']"
		+",[type='url']"
		+",[type='email']"
		+",[type='datetime']"
		+",[type='date']"
		+",[type='month']"
		+",[type='week']"
		+",[type='time']"
		+",[type='datetime-local']"
		+",[type='number']"
		+",[type='file']"
		+",[type='SEARCH']"
		+",[type='TEL']"
		+",[type='URL']"
		+",[type='EMAIL']"
		+",[type='DATETIME']"
		+",[type='DATE']"
		+",[type='MONTH']"
		+",[type='WEEK']"
		+",[type='TIME']"
		+",[type='DATETIME-LOCAL']"
		+",[type='NUMBER']"
		+",[type='FILE']"
//color range hidden submit image reset button
	;
	$(document).on("focus",strSelectors,efwClientInputBehavior.prototype.DoFocus);
	$(document).on("blur",strSelectors,efwClientInputBehavior.prototype.DoBlur);
	$(document).on("focus","[data-format]",efwClientInputBehavior.prototype.DoFormatFocus);
	$(document).on("blur","[data-format]",efwClientInputBehavior.prototype.DoFormatBlur);
	//--loading----------------------------------------------------------------
	$("body").append("<div id='efw_loading'></div>");
	$("#efw_loading").hide();
	$(document).bind("ajaxStart",function(){
		$("#efw_loading").show();
		_efw_keepConnectionAlive_handle=window.setInterval(
		function(){
			try{
				Efw("efw_keepConnectionAlive");
				for(var server in _efw_keepConnectionAlive_servers){
					Efw("efw_keepConnectionAlive",server);
				}
			}catch(e){
				window.clearInterval(_efw_keepConnectionAlive_handle);
				_efw_keepConnectionAlive_servers={};
			}
		},30000);
	});
	$(document).bind("ajaxStop",function(){
		$("#efw_loading").hide();
		window.clearInterval(_efw_keepConnectionAlive_handle);
		_efw_keepConnectionAlive_servers={};
	});
	//--dialog-----------------------------------------------------------------
	efw.dialog=new EfwDialog();
	//--messages---------------------------------------------------------------
	efw.messages=new EfwClientMessages();
	//--isDownloading----------------------------------------------------------
	efw.isDownloading=false;
});

