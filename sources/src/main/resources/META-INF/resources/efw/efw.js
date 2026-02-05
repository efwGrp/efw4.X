/**** efw4.X Copyright 2025 efwGrp ****/
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
 * Efw(eventId,wsMode)<br>
 * Efw(eventId,manualParams,wsMode)<br>
 * Efw(eventId,sever,wsMode)<br>
 * Efw(eventId,manualParams,sever,wsMode)<br>
 */
var Efw = function(eventId,manualParams,server,wsMode) {
	if(eventId!=undefined){
		var eventParams={"eventId":eventId,wsMode:false};
		if(typeof manualParams =="string") {
			eventParams.server=manualParams;
			if (typeof server=="boolean"){
				eventParams.wsMode=server;
			}
		}else if(typeof manualParams =="boolean") {
			eventParams.wsMode=manualParams;
		}else{
			eventParams.manualParams=manualParams;
			if (typeof server=="boolean"){
				eventParams.wsMode=server;
			}else{
				eventParams.server=server;
				if (typeof wsMode=="boolean"){
					eventParams.wsMode=wsMode;
				}
			}
		}
		return (new EfwClient()).fire(eventParams);
	}
};

Efw.prototype.baseurl = ".";
Efw.prototype.mode = "";
Efw.prototype.theme = "";
Efw.prototype.major = "";
Efw.prototype.dialog = null;
Efw.prototype.messages = null;
Efw.prototype.lang = "en"; 
Efw.prototype.isDownloading = false; 

/**
 * To get the type of the object.
 */
Efw.prototype._type = function(obj){
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

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
 * Add events for input behaviors.
 */
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
	});
	$(document).bind("ajaxStop",function(){
		$("#efw_loading").hide();
	});
	//--dialog-----------------------------------------------------------------
	efw.dialog=new EfwDialog();
	//--messages---------------------------------------------------------------
	efw.messages=new EfwClientMessages();
});

