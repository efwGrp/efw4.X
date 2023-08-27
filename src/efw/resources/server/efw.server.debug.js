"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
String.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return ""+this;
};
Object.defineProperty(String.prototype,"debug",{enumerable:false});
Number.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return 0+this;
};
Object.defineProperty(Number.prototype,"debug",{enumerable:false});
Boolean.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return this && true;
};
Object.defineProperty(Boolean.prototype,"debug",{enumerable:false});
Date.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println(JSON.stringify(this));
	return new Date(this.getTime());
};
Object.defineProperty(Date.prototype,"debug",{enumerable:false});
Array.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an array.");
	java.lang.System.out.println(JSON.stringify(this));
	return this;
};
Object.defineProperty(Array.prototype,"debug",{enumerable:false});
Function.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is a function.");
	return this;
};
Object.defineProperty(Function.prototype,"debug",{enumerable:false});
Object.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an object.");
	try{
		java.lang.System.out.println(JSON.stringify(this));
	}catch(e){
		java.lang.System.out.println(""+Packages.efw.framework.getUsefulInfoFromException(e));
	}
	return this;
};
Object.defineProperty(Object.prototype,"debug",{enumerable:false});
///////////////////////////////////////////////////////////////////////////////
Record.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Record class.");
	java.lang.System.out.println("records:"+JSON.stringify(this.values));
	return this;
};
Object.defineProperty(Record.prototype,"debug",{enumerable:false});
Result.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Result class.");
	java.lang.System.out.println("result values:"+JSON.stringify(this.values));
	java.lang.System.out.println("result actions:"+JSON.stringify(this.actions));
	return this;
};
Object.defineProperty(Result.prototype,"debug",{enumerable:false});
Excel.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Excel class.");
	return this;
};
Object.defineProperty(Excel.prototype,"debug",{enumerable:false});
