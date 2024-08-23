/**** efw4.X Copyright 2021 efwGrp ****/
/**
 * The class to create dialog by bootstrap.
 * 
 * @author Chang Kejun
 */
var EfwDialog = function() {
	//--alert--------------------------------------------------------------
	if (efw.major=="5"){
		$("body").append("<div class='modal hide' id='efw_client_alert' data-bs-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="4"){
		$("body").append("<div class='modal hide' id='efw_client_alert' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="3"){
		$("body").append("<div class='modal' id='efw_client_alert' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="2"){
		$("body").append("<div class='modal hide' id='efw_client_alert' data-backdrop='static' tabindex='-1'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div>");
	}
	this._alert = $("#efw_client_alert");
	this._alert.on("hide.bs.modal", function(){if (efw.dialog._alert._callback) window.setTimeout(efw.dialog._alert._callback);});
	//--wait---------------------------------------------------------------
	if (efw.major=="5"){
		$("body").append("<div class='modal hide' id='efw_client_wait' data-bs-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="4"){
		$("body").append("<div class='modal hide' id='efw_client_wait' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="3"){
		$("body").append("<div class='modal' id='efw_client_wait' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="2"){
		$("body").append("<div class='modal hide' id='efw_client_wait' data-backdrop='static' tabindex='-1'><div class='modal-header'><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div>");
	}
	this._wait = $("#efw_client_wait");
	this._wait.on("hide.bs.modal", function(){if (efw.dialog._wait._callback) window.setTimeout(efw.dialog._wait._callback);});
};
EfwDialog.prototype._alert=null;
EfwDialog.prototype._wait=null;

/**
 * The function to show alert.
 * @param {String} message: required<br>
 * @param {Object} buttons: optional<br>
 * @param {String} title: optional<br>
 * @param {Function} callback: optional<br>
 */
EfwDialog.prototype.alert = function(message, buttons, title, callback) {
	var self=this;
	if (!self._alert.is(":visible")){
		$(".modal-footer",self._alert).html("");
		if(buttons!=null){
			var isPrimary=true;
			for(var key in buttons){
				if(isPrimary){
					if (efw.major=="5"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="4"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="3"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="2"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+key+"</button>");
					}
					isPrimary=false;
				}else{
					if (efw.major=="5"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="4"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="3"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="2"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+key+"</button>");
					}
				}
				$(".modal-footer button:last",self._alert).click(function(){
					var btn=buttons[key];
					return function(){
						if (typeof btn =="function"){
							btn();
						}else{
							window.eval(btn);
						}
					};
				}());
			};
		}else{
			if (efw.major=="5"){
				$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-bs-dismiss='modal'>"+efw.messages.AlertDialogOK+"</button>");
			}else if (efw.major=="4"){
				$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+efw.messages.AlertDialogOK+"</button>");
			}else if (efw.major=="3"){
				$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+efw.messages.AlertDialogOK+"</button>");
			}else if (efw.major=="2"){
				$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+efw.messages.AlertDialogOK+"</button>");
			}
		}
		$(".modal-title",self._alert).html(title!=null?title:efw.messages.AlertDialogTitle);
		$(".modal-body",self._alert).html(message.replace(/\n/g, "<br>"));
		
		self._alert._callback=callback;
		self._alert.modal("show");
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
	if (!self._wait.is(":visible")){
		$(".modal-title",self._wait).html(title!=null?title:efw.messages.WaitDialogTitle);
		$(".modal-body",self._wait).html(message.replace(/\n/g, "<br>"));
		var timer = new easytimer.Timer();
		timer.start({countdown: true, startValues: {seconds: countdown}});
		$(".modal-footer",self._wait).html(timer.getTimeValues().toString());
		timer.addEventListener("secondsUpdated", function (e){
			$(".modal-footer",self._wait).html(timer.getTimeValues().toString());
		});
		timer.addEventListener("targetAchieved", function (e){
			self._wait.modal("hide");
		});
		self._wait._callback=callback;
		self._wait.modal("show");
	}else{
		window.setTimeout(function(){
			self.wait(message, countdown, title, callback);
		},1000);
	}
};
