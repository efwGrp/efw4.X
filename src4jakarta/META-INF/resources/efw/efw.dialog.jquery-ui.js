/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to create dialog by jquery-ui.
 * 
 * @author Chang Kejun
 */
var EfwDialog = function() {
	//--alert--------------------------------------------------------------
	$("body").append("<div id='efw_client_alert' style='display:none'><p></p></div>");
	this._alert = $("#efw_client_alert").dialog({
		modal : true,
		width : 500,
		title : "Message",
		autoOpen: false
	});
	//--wait---------------------------------------------------------------
	$("body").append("<div id='efw_client_wait' style='display:none'><p></p><div style='text-align:right'></div></div>");
	this._wait = $("#efw_client_wait").dialog({
		dialogClass:"no-close",
		modal : true,
		width : 500,
		title : "Message",
		autoOpen: false
	});
	//--preview------------------------------------------------------------
	$("body").append("<div id='efw_client_preview' style='display:none'></div>");
	this._preview = $("#efw_client_preview").dialog({
		modal : true,
		height : 500,
		title : "Preview",
		autoOpen: false
	});
};
EfwDialog.prototype._alert=null;
EfwDialog.prototype._wait=null;
EfwDialog.prototype._preview=null;
/**
 * The function to show alert.
 * @param {String} message: required<br>
 * @param {Object} buttons: optional<br>
 * @param {String} title: optional<br>
 * @param {Function} callback: optional<br>
 */
EfwDialog.prototype.alert = function(message, buttons, title, callback) {
	var self=this;
	if (!self._alert.dialog("isOpen")){
		var dialogButtons={};
		if(buttons!=null){
			for(var key in buttons){
				dialogButtons[key]=function(){
					var btn=buttons[key];
					return function(){
						self._alert.dialog("close");
						if (typeof btn =="function"){
							btn();
						}else{
							window.eval(btn);
						}
					};
				}();
			};
		}else{
			dialogButtons[efw.messages.AlertDialogOK]=function(){
				self._alert.dialog("close");
			};
		}
		self._alert.dialog("option", "buttons", dialogButtons);
		self._alert.dialog("option", "title", title!=null?title:efw.messages.AlertDialogTitle);
		if(callback){
			self._alert.dialog("option", "beforeClose", function(){window.setTimeout(callback);});
		}else{
			self._alert.dialog("option", "beforeClose", null);
		}
		$("#efw_client_alert p").html(message.replace(/\n/g, "<br>"));
		
		self._alert.dialog("open");
	}else{
		window.setTimeout(function(){
			self.alert(message, buttons, title, callback);
		},1000);
	}
};

/**
 * The function to show wait.
 * @param {String} message: required<br>
 * @param {String} title: optional<br>
 * @param {Function} callback: optional<br>
 */
EfwDialog.prototype.wait = function(message, countdown, title, callback) {
	var self=this;
	if (!self._wait.dialog("isOpen")){
		self._wait.dialog("option", "title", title!=null?title:efw.messages.WaitDialogTitle);
		if(callback)self._wait.dialog("option", "beforeClose", function(){window.setTimeout(callback);});
		$("#efw_client_wait p").html(message.replace(/\n/g, "<br>"));
		var timer = new easytimer.Timer();
		timer.start({countdown: true, startValues: {seconds: countdown}});
		$("#efw_client_wait div").html(timer.getTimeValues().toString());
		timer.addEventListener("secondsUpdated", function (e){
			$("#efw_client_wait div").html(timer.getTimeValues().toString());
		});
		timer.addEventListener("targetAchieved", function (e){
			self._wait.dialog("close");
		});
		self._wait.dialog("open");
	}else{
		window.setTimeout(function(){
			self.wait(message, countdown, title, callback);
		},1000);
	}
};

/**
 * The function to show preview.
 * @param {String} previewUrl: required<br>
 * @param {String} fileName: optional<br>
 */
EfwDialog.prototype.preview = function(previewUrl,fileName) {
	var self=this;
	if (!self._preview.dialog("isOpen")){
		var ary=fileName.split("/");
		var fileName=ary[ary.length-1];
		var ary=fileName.split(".");
		var ext=ary[ary.length-1].toLowerCase();
		self._preview.dialog("option", "title", efw.messages.PreviewDialogTitle+" : "+fileName);
		self._preview.dialog("option", "height", $(window).height()*0.95 );
		self._preview.dialog("option", "width", $(window).width()*0.95 );
		$("#efw_client_preview").css("overflow","hidden");
		if (previewUrl.indexOf("?")==-1){
			previewUrl+="?";
		}else{
			previewUrl+="&";
		}
		previewUrl+="dt="+new Date().getTime();
		//画像かどうか判断する
		if(ext=="tiff"||ext=="svg"||ext=="png"||ext=="jpeg"||ext=="jpg"||ext=="gif"){
			//ヘッダがあるからheightを90%にする
			$("#efw_client_preview").html('<img src="'+previewUrl+'" style="max-width:100%;max-height:100%;">');
		}else{
			$("#efw_client_preview").html('<object data="'+previewUrl+'" style="width:100%;height:100%;"></object>');
		}

		self._preview.dialog("open");
	}else{
		window.setTimeout(function(){
			self._preview(previewUrl,fileName);
		},1000);
	}
};