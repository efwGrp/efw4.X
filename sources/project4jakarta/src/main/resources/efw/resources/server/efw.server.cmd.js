"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to execute a cmd line.
 * 
 * @author Chang kejun
 */
function EfwServerCmd() {}

/**
 * Execute method to run a command line of os.
 * If the command line status is not 0, throw a Exception with the error message.
 * 
 * @param {Array}
 *            params: required<br>
 * 
 * @returns {status}
 */
EfwServerCmd.prototype.execute = function(params){
	if (params==null && !(params instanceof Array) )params=[];
	Packages.efw.cmd.CmdManager.execute(Java.to(params, Java.type("java.lang.String[]")));
};

