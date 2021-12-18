/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to read TXT.<br>
 * @param {String}
 *			path: required<br>
 * @param {String}
 *			regFieldsDef: required<br>
 * @param {String}
 *			encoding: optional<br>
 * @param {Number}
 *			rowSize: optional<br>
 * @author Liu Xinyu
 */
function TXTReader(path, regFieldsDef, encoding, rowSize) {
	if (this.constructor.name!="TXTReader"){throw new Packages.efw.NewKeywordWasForgottenException("TXTReader");}
	this._path = path;
	this._regFieldsDef = regFieldsDef;
	this._regFieldsDefRegExp = new RegExp(this._regFieldsDef);
	if (encoding != null){this._encoding = encoding;}
	if (rowSize != null){this._rowSize = rowSize;}
};
/**
 * TXT locker for openning reader
 */
var TXTReader_lock = new java.util.concurrent.locks.ReentrantLock();
/**
 * The attr to keep the path.
 */
TXTReader.prototype._path = null;
/**
 * The attr to keep the regFieldsDef.
 */
TXTReader.prototype._regFieldsDef = null;
/**
 * The attr to keep the regFieldsDefRegExp.
 */
TXTReader.prototype._regFieldsDefRegExp = null;
/**
 * The attr to keep the encoding.
 */
TXTReader.prototype._encoding = "UTF-8";
/**
 * The attr to keep the rowSize.
 */
TXTReader.prototype._rowSize = -1;
/**
 * The function to read all lines into a matrix of arrays.
 * 
 * @returns {Array}
 */
TXTReader.prototype.readAllLines = function(){
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
 * @returns {Array}
 */
TXTReader.prototype.loopAllLines = function(callback){
	var br=null;
	if (callback == null) {return;}
	try{
		var strLine;
		var intNum = 0;
		if (this._rowSize==-1){
			try{
				TXTReader_lock.lock();
				br = new java.io.BufferedReader(
							new java.io.InputStreamReader(
								new java.io.FileInputStream(
									Packages.efw.file.FileManager.get(this._path)),
									this._encoding));
			}finally{
				TXTReader_lock.unlock();
			}
			while ((strLine = br.readLine()) != null) {
				var aryField = this._split(strLine,intNum);
				callback(aryField, intNum);
				intNum++;
			}
		}else{
			try{
				TXTReader_lock.lock();
				br = new java.io.FileInputStream(Packages.efw.file.FileManager.get(this._path));
			}finally{
				TXTReader_lock.unlock();
			}
			var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, this._rowSize);//ファイルから読み込むバファー
			var bufs=[];//IBMCp930Cp939用サブバファー
			var c;
			while ((c=br.read(buf)) != -1) {
				strLine="";
				if (this._encoding=="IBMCp930Cp939"){
					var fromP=0;
					for(var i=0;i<c;i++){
						if (buf[i]==14){//Shift In
							if (fromP<i){
								if (bufs[fromP]==null){
									bufs[fromP]=[];
								}
								if(bufs[fromP][i]==null){
									var temp=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, i-fromP);
									bufs[fromP][i]=temp;
								}
								java.lang.System.arraycopy(buf, fromP, bufs[fromP][i], 0, i-fromP);
								strLine+=new java.lang.String(bufs[fromP][i],"Cp930");//英数字と半角カナ
								fromP=i;
								
							}
						}else if(buf[i]==15){//Shift Out
							if (bufs[fromP]==null){
								bufs[fromP]=[];
							}
							if(bufs[fromP][i]==null){
								var temp=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, i-fromP+1);
								bufs[fromP][i]=temp;
							}
							java.lang.System.arraycopy(buf, fromP, bufs[fromP][i], 0, i-fromP+1);
							strLine+=new java.lang.String(bufs[fromP][i],"Cp939");//２byte漢字
							fromP=i+1;
						}
					}
					if (fromP<c){
						if (bufs[fromP]==null){
							bufs[fromP]=[];
						}
						if(bufs[fromP][c]==null){
							var temp=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, c-fromP);
							bufs[fromP][c]=temp;
						}
						java.lang.System.arraycopy(buf, fromP, bufs[fromP][c], 0, c-fromP);
						strLine+=new java.lang.String(bufs[fromP][c],"Cp930");//英数字と半角カナ
						
					}
				}else{
					strLine=""+new java.lang.String(buf,this._encoding);
				}
				var aryField = this._split(strLine,intNum);
				callback(aryField, intNum);
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
/**
 * The inner function to split a string to array 
 * according to the regFieldsDef.
 * 
 * @param {String}
 *            rowdata: required<br>
 * @returns {Array}
 */
TXTReader.prototype._split = function (rowdata,index) {
	var aryField = rowdata.match(this._regFieldsDefRegExp);

	if (aryField == null) {
		throw new Packages.efw.CsvTxtDataException("Illegal data",index,rowdata);
	}

	for (var i = 1; i < aryField.length; i++) {
		aryField[i] = aryField[i].trim();
	}

	aryField.shift();

	return aryField;
};