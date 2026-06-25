var helloConcurrencyLimit_test3={};
helloConcurrencyLimit_test3.paramsFormat={};
helloConcurrencyLimit_test3.service={}
helloConcurrencyLimit_test3.fire=function(params){
	var _locker = Packages.efw.context.ContextManager.getLocker();
	var br = null;
	try {
		var intNum = 0;
		try {
			var startdate=new Date();
			_locker.lock();
			br = new java.io.FileInputStream(Packages.efw.file.FileManager.get("text&csv/myText.txt"));
			java.lang.Thread.sleep(10000);
		} finally {
			_locker.unlock();
		}
	} finally {
		try {
			br.close();
		} catch (e) {
		}
	}
	var enddate=new Date();
	
	return new Result().alert("開始:"+startdate.format("yyyy/MM/dd HH:mm:ss")+" "+enddate.format("yyyy/MM/dd HH:mm:ss"))
	
}