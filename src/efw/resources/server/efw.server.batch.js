"use strict";
/**** efw3.X Copyright 2019 efwGrp ****/
/**
 * The class for batch result.
 * 
 * @author Chang Kejun
 */
function Batch() {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("Batch");}
	this.errorlevel=0;
	this.logs=[];
	this.echos=[];
};

/**
 * The error level for batch.
 */
Batch.prototype.errorlevel=null;
/**
 * The array to keep logs.
 */
Batch.prototype.logs = null;
/**
 * The array to keep echos.
 */
Batch.prototype.echos = null;

/**
 * The function to concatenate to another batch result.
 * 
 * @param {Batch} batch: required<br>
 * @returns {Batch}
 */
Batch.prototype.concat = function(batch) {
	if(batch){
		if (this.errorlevel<batch.errorlevel)this.errorlevel=batch.errorlevel;
		if(batch.logs){
			this.logs = this.logs.concat(batch.logs);
		}
		if(batch.echos){
			this.echos = this.echos.concat(batch.echos);
		}
	}
	return this;
};
/**
 * The function to set error level.
 * 
 * @param {Number} errorlevel: required<br>
 * @returns {Batch}
 */
Batch.prototype.exit=function(errorlevel){
	this.errorlevel=errorlevel;
	return this;
};
/**
 * The function to log a message.
 * 
 * @param {String} message: required<br>
 * @returns {Batch}
 */
Batch.prototype.log=function(message){
	this.logs.push(message);
	return this;
};
/**
 * The function to echo a message.
 * 
 * @param {String} message: required<br>
 * @returns {Batch}
 */
Batch.prototype.echo=function(message){
	this.echos.push(message);
	return this;
};