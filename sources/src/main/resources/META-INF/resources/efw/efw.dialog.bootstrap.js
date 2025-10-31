/**** efw4.X Copyright 2025 efwGrp ****/
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
	}
	this._wait = $("#efw_client_wait");
	this._wait.on("hide.bs.modal", function(){if (efw.dialog._wait._callback) window.setTimeout(efw.dialog._wait._callback);});
	//--preview------------------------------------------------------------
	if (efw.major=="5"){
		$("body").append("<div class='modal hide' id='efw_client_preview' data-bs-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'></div></div></div></div>");
	}else if (efw.major=="4"){
		$("body").append("<div class='modal hide' id='efw_client_preview' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'></div></div></div></div>");
	}else if (efw.major=="3"){
		$("body").append("<div class='modal' id='efw_client_preview' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div></div></div></div>");
	}
	this._preview = $("#efw_client_preview");
	//--progress------------------------------------------------------------
	if (efw.major=="5"){
		$("body").append("<div class='modal hide' id='efw_client_alert' data-bs-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="4"){
		$("body").append("<div class='modal hide' id='efw_client_alert' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="3"){
		$("body").append("<div class='modal' id='efw_client_alert' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h5 class='modal-title'>Message</h5></div><div class='modal-body'></div><div class='modal-footer'></div></div></div></div>");
	}
	if (efw.major=="5"){
		$("body").append("<div class='modal hide' id='efw_client_progress' data-bs-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'><p></p><progress style='width:100%' max='100' value='0'></progress></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="4"){
		$("body").append("<div class='modal hide' id='efw_client_progress' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p></p><progress style='width:100%' max='100' value='0'></progress></div><div class='modal-footer'></div></div></div></div>");
	}else if (efw.major=="3"){
		$("body").append("<div class='modal' id='efw_client_progress' data-backdrop='static' tabindex='-1'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Message</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p></p><progress style='width:100%' max='100' value='0'></progress></div><div class='modal-footer'></div></div></div></div>");
	}
	this._progress = $("#efw_client_progress");
};
EfwDialog.prototype._alert=null;
EfwDialog.prototype._wait=null;
EfwDialog.prototype._preview=null;
EfwDialog.prototype._progress=null;
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
					}
					isPrimary=false;
				}else{
					if (efw.major=="5"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="4"){
						$(".modal-footer",self._alert).append("<button type='button' class='btn btn-secondary' data-dismiss='modal'>"+key+"</button>");
					}else if (efw.major=="3"){
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
/**
 * The function to show preview.
 * @param {String} previewUrl: required<br>
 * @param {String} fileName: optional<br>
 */
EfwDialog.prototype.preview = function(previewUrl,fileName) {
	var self=this;
	if (!self._preview.is(":visible")){
		var ary=fileName.split("/");
		var fileName=ary[ary.length-1];
		var ary=fileName.split(".");
		var ext=ary[ary.length-1].toLowerCase();
		$(".modal-title",self._preview).html(efw.messages.PreviewDialogTitle+" : "+fileName);
		var bodyHeight=$("body").css("height");
		$("body").css("height","100%");
		$(".modal-dialog",self._preview).css("height",$(window).height()*0.95);
		$(".modal-dialog",self._preview).css("max-height",$(window).height()*0.95);
		$(".modal-dialog",self._preview).css("width",$(window).width()*0.95);
		$(".modal-dialog",self._preview).css("max-width",$(window).width()*0.95);
		$(".modal-dialog",self._preview).css("margin-left","auto");
		$(".modal-content",self._preview).css("height","100%");
		$(".modal-body",self._preview).css("overflow","hidden");
		$("body").css("height",bodyHeight);
		if (previewUrl.indexOf("?")==-1){
			previewUrl+="?";
		}else{
			previewUrl+="&";
		}
		previewUrl+="dt="+new Date().getTime();
		//画像かどうか判断する
		if(ext=="tiff"||ext=="svg"||ext=="png"||ext=="jpeg"||ext=="jpg"||ext=="gif"){
			//ヘッダがあるからheightを90%にする
			$(".modal-body",self._preview).html('<img src="'+previewUrl+'" style="max-width:100%;max-height:100%;">');
		}else{
			$(".modal-body",self._preview).html('<object data="'+previewUrl+'" style="width:100%;height:100%;"></object>');
		}
		self._preview.modal("show");
	}else{
		window.setTimeout(function(){
			self._preview(previewUrl,fileName);
		},1000);
	}
};
/**
 * The function to show progress.
 * @param {String} message: required<br>
 * @param {Number} percent: required<br>
 */
EfwDialog.prototype.progress = function(message, percent) {
	var self=this;
	if (!self._progress.is(":visible")){
		$(".modal-title",self._progress).html(efw.messages.ProgressDialogTitle);
		$(".modal-body p",self._progress).html(message.replace(/\n/g, "<br>"));
		$("progress",self._progress).val(percent);
		self._progress.modal("show");
	}else{
		$(".modal-body p",self._progress).html(message.replace(/\n/g, "<br>"));
		$("progress",self._progress).val(percent);
	}
};
