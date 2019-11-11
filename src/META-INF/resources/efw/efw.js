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
$(function() {
	//--behavior---------------------------------------------------------------
	window.onhelp = efwClientInputBehavior.prototype.unDohelp;
	$(document).on("keydown",efwClientInputBehavior.prototype.DoShortcut);
	$(document).on("focus",":text,:password,:radio,:checkbox,select,textarea",efwClientInputBehavior.prototype.DoFocus);
	$(document).on("blur",":text,:password,:radio,:checkbox,select,textarea",efwClientInputBehavior.prototype.DoBlur);
	$(document).on("focus","[data-format]",efwClientInputBehavior.prototype.DoFormatFocus);
	$(document).on("blur","[data-format]",efwClientInputBehavior.prototype.DoFormatBlur);
	//--loading----------------------------------------------------------------
	$("body").append("<div id='efw_loading' data-ajaxcnt='0'></div>");
	$("#efw_loading").hide();
	$(document).bind("ajaxSend",function(){
		var cnt=new Number($("#efw_loading").attr("data-ajaxcnt"));
		$("#efw_loading").attr("data-ajaxcnt",++cnt);
		if (cnt>0){
			$("#efw_loading").show();
		}
	});
	$(document).bind("ajaxComplete",function(){
		var cnt=new Number($("#efw_loading").attr("data-ajaxcnt"));
		$("#efw_loading").attr("data-ajaxcnt",--cnt);
		if (cnt<=0){
			$("#efw_loading").hide();
		}
	});
	//--dialog-----------------------------------------------------------------
	efw.dialog=new EfwDialog();
	//--messages---------------------------------------------------------------
	efw.messages=new EfwClientMessages();
});

