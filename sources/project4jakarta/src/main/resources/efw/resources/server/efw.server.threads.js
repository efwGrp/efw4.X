"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to operate the multiple threads.
 * 
 * @author Hsu Shang Cheng
 */
function Threads(maxCount) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("Threads");}
	this._threads = [];
	if (maxCount){
		this._maxCount=maxCount;
	}
}

/**
 * The internal variable to keep objects of thread.
 */
Threads.prototype._threads = null;
Threads.prototype._maxCount = 4;

/**
 * Add method to add an thread object for running.
 * 
 * @param {Object}
 *            thread: required<br>
 *           
 * @returns {this}
 */
Threads.prototype.add = function(thread){
	this._threads.push(thread);

	return this;
};

/**
 * Run method to execute all thread objects and wait the complement of all threads
 * 
 * @returns {Record}
 */
Threads.prototype.run = function(){
	var handles = [];
	var semaphore = new java.util.concurrent.Semaphore(this._maxCount);  
	for(var i = 0 ; i<this._threads.length ; i++){
		this._threads[i]._run=this._threads[i].run;
		this._threads[i].run=function(){
			try{
				semaphore.acquire();
				this._run();
			}catch(e){
				java.lang.System.out.println(e);//TODO
				//Packages.efw.framework.runtimeWLog(e);
				//var logs=Packages.efw.framework.getThreadLogs();
			}finally{
				semaphore.release();
			}
		};
		handles[i] = new java.lang.Thread(
			new java.lang.Runnable(this._threads[i])
		);
		handles[i].start();
	}
	for(var i = 0 ; i<this._threads.length ; i++){
		handles[i].join();
	}
	return new Record(this._threads);
};
