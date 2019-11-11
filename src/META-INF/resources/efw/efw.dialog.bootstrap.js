/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to create dialog by bootstrap.
 * 
 * @author Chang Kejun
 */
var EfwDialog = function() {
	//--alert--------------------------------------------------------------
	$("body").append("<div class='modal fade' id='efw_client_alert' data-backdrop='static' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	this._alert = $("#efw_client_alert");
	//--wait---------------------------------------------------------------
	$("body").append("<div class='modal fade' id='efw_client_wait' data-backdrop='static' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	this._wait = $("#efw_client_wait");
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
					$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+key+"</button>");
					isPrimary=false;
				}else{
					$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+key+"</button>");
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
			$(".modal-footer",self._alert).append("<button type='button' class='btn btn-primary' data-dismiss='modal'>"+efw.messages.AlertDialogOK+"</button>");
		}
		$(".modal-title",self._alert).html(title!=null?title:efw.messages.AlertDialogTitle);
		if(callback)self._alert.on("hide.bs.modal", function(){window.setTimeout(callback);});
		$(".modal-body",self._alert).html(message.replace(/\n/g, "<br>"));
		
		self._alert.modal();
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
		if(callback)self._wait.on("hide.bs.modal", function(){window.setTimeout(callback);});
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
		self._wait.modal("show");
	}else{
		window.setTimeout(function(){
			self.wait(message, countdown, title, callback);
		},1000);
	}
};
