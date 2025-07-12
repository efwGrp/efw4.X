"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to read Binary file.<br>
 * @param {String}
 *			path: required<br>
 * @param {Array}
 *			aryFieldsDef: required<br>
 * @param {Array}
 *			aryEncoding: required<br>
 * @param {Number}
 *			rowSize: required<br>
 * @param {Number}
 *			skipRows: optional<br>
 * @param {Number}
 *			rowsToRead: optional<br>
 * @author Chang kejun
 */
function BinaryReader(path, aryFieldsDef, aryEncoding, rowSize, skipRows, rowsToRead ) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("BinaryReader");}
	this._path = path;
	this._aryFieldsDef = aryFieldsDef;
	this._aryEncoding = aryEncoding;
	this._rowSize = rowSize;
	if (skipRows != null){this._skipRows = skipRows;}
	if (rowsToRead != null){this._rowsToRead = rowsToRead;}
};
/**
 * Binary locker for openning reader
 */
BinaryReader.prototype._locker = new java.util.concurrent.locks.ReentrantLock();
/**
 * The attr to keep the path.
 */
BinaryReader.prototype._path = null;
/**
 * The attr to keep the aryFieldsDef.
 */
BinaryReader.prototype._aryFieldsDef = null;
/**
 * The attr to keep the aryEncoding.
 */
BinaryReader.prototype._aryEncoding = null;
/**
 * The attr to keep the rowSize.
 */
BinaryReader.prototype._rowSize = null;
/**
* The attr to keep the skipRows.
 */
BinaryReader.prototype._skipRows = -1;
/**
* The attr to keep the rowsToRead.
 */
BinaryReader.prototype._rowsToRead = -1;
/**
 * The function to read all lines into a matrix of arrays.
 * 
 * @returns {Array}
 */
BinaryReader.prototype.readAllLines = function(){
	var aryLines = [];
	this.loopAllLines(callback);
	function callback(aryField,intNum){
		aryLines.push(aryField);
	}
	return aryLines;
};
/**
 * The function to loop all lines for callback function calling.
 * 
 * @param {Function}
 *            callback: required<br>
 */
BinaryReader.prototype.loopAllLines = function(callback){
	var br=null;
	if (callback == null) {return;}
	try{
		var intNum = 0;
		try{
			this._locker.lock();
			br = new java.io.FileInputStream(Packages.efw.file.FileManager.get(this._path));
			if (this._skipRows!=-1){
				br.skip(new java.lang.Long(""+(this._skipRows*this._rowSize)).longValue());
			}
		}finally{
			this._locker.unlock();
		}
		var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize);//ファイルから読み込むバファー
		var bufs=[];
		for(var i=0;i<this._aryFieldsDef.length;i++){
			if (this._aryEncoding[i]=="Cp939WithoutShiftInOut"){
				bufs[i]=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]+2);
				bufs[i][0]=14;//shift in 
				bufs[i][this._aryFieldsDef[i]+2-1]=15;//shift out
			}else{
				bufs[i]=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			}
		}
		while (br.read(buf) == this._rowSize) {
			var fromP=0;
			var aryField=[];
			for(var i=0;i<this._aryFieldsDef.length;i++){
				if (this._aryEncoding[i]=="Cp939WithoutShiftInOut"){
					java.lang.System.arraycopy(buf, fromP, bufs[i], 1, this._aryFieldsDef[i]);
					aryField.push(new java.lang.String(bufs[i],"Cp939"));
				}else if (this._aryEncoding[i]=="S9"){
					java.lang.System.arraycopy(buf, fromP, bufs[i], 0, this._aryFieldsDef[i]);
					var tmpS9=""+new java.lang.String(bufs[i],"Cp930");
					var retS9="";
					for(var indexS9=0;indexS9<tmpS9.length;indexS9++){
						var c=tmpS9[indexS9];
						if (c=="{"){retS9+="0";}
						else if (c=="0"){retS9+="0";}
						else if (c=="A"){retS9+="1";}
						else if (c=="1"){retS9+="1";}
						else if (c=="B"){retS9+="2";}
						else if (c=="2"){retS9+="2";}
						else if (c=="C"){retS9+="3";}
						else if (c=="3"){retS9+="3";}
						else if (c=="D"){retS9+="4";}
						else if (c=="4"){retS9+="4";}
						else if (c=="E"){retS9+="5";}
						else if (c=="5"){retS9+="5";}
						else if (c=="F"){retS9+="6";}
						else if (c=="6"){retS9+="6";}
						else if (c=="G"){retS9+="7";}
						else if (c=="7"){retS9+="7";}
						else if (c=="H"){retS9+="8";}
						else if (c=="8"){retS9+="8";}
						else if (c=="I"){retS9+="9";}
						else if (c=="9"){retS9+="9";}
						else if (c=="}"){retS9="-"+retS9+"0";}
						else if (c=="J"){retS9="-"+retS9+"1";}
						else if (c=="K"){retS9="-"+retS9+"2";}
						else if (c=="L"){retS9="-"+retS9+"3";}
						else if (c=="M"){retS9="-"+retS9+"4";}
						else if (c=="N"){retS9="-"+retS9+"5";}
						else if (c=="O"){retS9="-"+retS9+"6";}
						else if (c=="P"){retS9="-"+retS9+"7";}
						else if (c=="Q"){retS9="-"+retS9+"8";}
						else if (c=="R"){retS9="-"+retS9+"9";}
						else{retS9+=c;}
					}
					aryField.push(retS9.trim());
				}else{
					java.lang.System.arraycopy(buf, fromP, bufs[i], 0, this._aryFieldsDef[i]);
					aryField.push(new java.lang.String(bufs[i],this._aryEncoding[i]));
				}
				fromP+=this._aryFieldsDef[i];
			}
			if (this._rowsToRead!=-1 && intNum>=this._rowsToRead){
				break;
			}else{
				callback(aryField, intNum+(this._skipRows!=-1?this._skipRows:0));
				intNum++;
			}
		}
	}finally{
		try{
			br.close();
		}catch(e){
		}
	}
};
////////////////////////////////////////////////////////////////////////////////
/**
 * The class to write binary file.<br>
 * @param {String}
 *			path: required<br>
 * @author Chang Kejun
 */
function BinaryWriter(path,aryFieldsDef,aryEncoding,rowSize) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("BinaryWriter");}
	this._path = path;
	this._aryFieldsDef = aryFieldsDef;
	this._aryEncoding = aryEncoding;
	this._rowSize = rowSize;
	this._printWriter = Packages.efw.binary.BinaryManager.open(path);
};
/**
 * The attr to keep the path.
 */
BinaryWriter.prototype._path = null;
/**
 * The attr to keep the aryFieldsDef.
 */
BinaryWriter.prototype._aryFieldsDef = null;
/**
 * The attr to keep the aryEncoding.
 */
BinaryWriter.prototype._aryEncoding = null;
/**
 * The attr to keep the rowSize.
 */
BinaryWriter.prototype._rowSize = null;
/**
 * The attr to keep the java writter.
 */
BinaryWriter.prototype._printWriter = null;
/**
 * The function to close the java writter.
 */
BinaryWriter.prototype.close = function(){
	Packages.efw.binary.BinaryManager.close(this._path);
};
/**
 * The inner function to close the java writter.
 */
BinaryWriter.prototype._closeAll = function(){
	Packages.efw.binary.BinaryManager.closeAll();
};
/**
 * The function to write all lines into the file.
 * @param {Array}
 *            aryLines: required<br>
 */
BinaryWriter.prototype.writeAllLines = function(aryLines){
	var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize*aryLines.length);//ファイルから読み込むバファー

	for (var i = 0; i < aryLines.length; i++) {
		var buf4row=this._join(aryLines[i]);
		java.lang.System.arraycopy(buf4row, 0, buf, this._rowSize*i, this._rowSize);
	}
	file.writeAllBytes(this._path,buf);
};
/**
 * The function to write an array into the file.
 * @param {Array}
 *            aryLine: required<br>
 */
BinaryWriter.prototype.writeLine = function(aryLine){
	var buf = this._join(aryLine);
	this._printWriter.write(buf);
};
/**
 * The inner function to join an array into a buffer
 * @param {Array}
 *            aryLine: required<br>
 * @returns {String}
 */
BinaryWriter.prototype._join = function(aryLine){
	var bufs=[];
	for(var i=0;i<this._aryFieldsDef.length;i++){
		if (this._aryEncoding[i]=="Cp939WithoutShiftInOut"){
			bufs[i]=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]+2);
			bufs[i][0]=14;//shift in 
			bufs[i][this._aryFieldsDef[i]+2-1]=15;//shift out
			var buf4item=new java.lang.String(""+aryLine[i]).getBytes("Cp939");
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 1, this._aryFieldsDef[i]);
			
		}else if (this._aryEncoding[i]=="S9"){
			bufs[i]=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			var buf4item=new java.lang.String(""+aryLine[i]).getBytes("Cp930");
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 0, this._aryFieldsDef[i]);
			
		}else{
			bufs[i]=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._aryFieldsDef[i]);
			var buf4item=new java.lang.String(""+aryLine[i]).getBytes(this._aryEncoding[i]);
			java.lang.System.arraycopy(buf4item, 0, bufs[i], 0, this._aryFieldsDef[i]);
		}
	}
	var fromP=0;
	var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize);//ファイルから読み込むバファー
	for(var i=0;i<this._aryFieldsDef.length;i++){
		if (this._aryEncoding[i]=="Cp939WithoutShiftInOut"){
			java.lang.System.arraycopy(bufs[i], 1, buf, fromP, this._aryFieldsDef[i]);
		}else{
			java.lang.System.arraycopy(bufs[i], 0, buf, fromP, this._aryFieldsDef[i]);
		}
		fromP+=this._aryFieldsDef[i];
	}
	return buf;
};


