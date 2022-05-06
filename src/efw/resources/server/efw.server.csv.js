/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to read CSV.<br>
 * @param {String}
 *			path: required<br>
 * @param {String}
 *			separator: optional<br>
 * @param {String}
 *			delimiter: optional<br>
 * @param {String}
 *			encoding: optional<br>
 * @param {Number}
 *			offsetBytes: optional<br>
 * @param {Number}
 *			offsetRows: optional<br>
 * @param {Number}
 *			skipRows: optional<br>
 * @param {Number}
 *			rowsToRead: optional<br>
 * @author Chang Kejun
 */
function CSVReader(path, separator, delimiter, encoding, skipRows, rowsToRead, offsetBytes, offsetRows) {
	if (this.constructor.name!="CSVReader"){throw new Packages.efw.NewKeywordWasForgottenException("CSVReader");}
	this._path = path;
	if (separator != null){this._separator = separator;}
	if (delimiter != null){this._delimiter = delimiter;}
	if (encoding != null){this._encoding = encoding;}
	if (skipRows != null){this._skipRows = skipRows;}
	if (rowsToRead != null){this._rowsToRead = rowsToRead;}
	if (offsetBytes != null){this._offsetBytes = offsetBytes;}
	if (offsetRows != null){this._offsetRows = offsetRows;}
	// compile the regEx str using the custom delimiter/separator
	// dealed with escape regex-specific control chars
	this._match = new RegExp("(D|S|\n|\r|[^DS\r\n]+)"
							 .replace(/S/g, this._separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
							 .replace(/D/g, this._delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
							 , "gm");
};
/**
 * CSV locker for openning reader
 */
var CSVReader_lock = new java.util.concurrent.locks.ReentrantLock();
/**
 * The attr to keep the path.
 */
CSVReader.prototype._path = null;
/**
 * The attr to keep the separator.
 */
CSVReader.prototype._separator = ",";
/**
 * The attr to keep the delimiter.
 */
CSVReader.prototype._delimiter = "\"";
/**
 * The attr to keep the encoding.
 */
CSVReader.prototype._encoding = "UTF-8";
/**
 * The attr to keep the match.
 */
CSVReader.prototype._match = null;
/**
* The attr to keep the offsetBytes.
 */
CSVReader.prototype._offsetBytes = -1;
/**
* The attr to keep the offsetRows.
 */
CSVReader.prototype._offsetRows = -1;
/**
* The attr to keep the skipRows.
 */
CSVReader.prototype._skipRows = -1;
/**
* The attr to keep the rowsToRead.
 */
CSVReader.prototype._rowsToRead = -1;
/**
* The attr to keep the CRLFCode.
 */
CSVReader.prototype._CRLFCode = "\r\n";
/**
 * The function to read all lines into a matrix of arrays.
 * 
 * @param {String}
 *            CRLFCode: optional<br>
 * @returns {Array}
 */
CSVReader.prototype.readAllLines = function(CRLFCode){
	if (CRLFCode!=null&&CRLFCode!=""){
		this._CRLFCode=CRLFCode;
	}
	var aryLinesTemp = file.readAllLines(this._path,this._encoding).split(this._CRLFCode);
	var aryLines = [];

	for (var i = 0; i < aryLinesTemp.length; i++) {
		aryLines.push(this._split(aryLinesTemp[i]));
	}

	return aryLines;
};
/**
 * The function to loop all lines for callback function calling.
 * 
 * @param {Function}
 *            callback: required<br>
 * @param {String}
 *            CRLFCode: optional<br>
 * @returns {Array}
 */
CSVReader.prototype.loopAllLines = function(callback,CRLFCode){
	var br=null;
	if (callback == null) {return;}
	if (CRLFCode!=null&&CRLFCode!=""){
		this._CRLFCode=CRLFCode;
	}
	try{
		try{
			CSVReader_lock.lock();
			br = new Packages.efw.csv.CSVReader(
					new java.io.FileInputStream(Packages.efw.file.FileManager.get(this._path)),
					this._encoding,this._CRLFCode);
		}finally{
			CSVReader_lock.unlock();
		}
		var strLine;
		var intNum = 0;
		
		if (this._offsetBytes!=-1){
			br.skip(this._offsetBytes,this._offsetRows);
		}
		if (this._skipRows!=-1){
			for(var i=0;i<this._skipRows;i++){
				br.readLine();
			}
		}
		while (true) {
			if (this._rowsToRead!=-1 && intNum>=this._rowsToRead) break;
			var strLine = br.readLine();if (strLine==null) break;
			var aryField = this._split(strLine,intNum+(this._skipRows!=-1?this._skipRows:0)+(this._offsetRows!=-1?this._offsetRows:0));
			callback(aryField, intNum+(this._skipRows!=-1?this._skipRows:0)+(this._offsetRows!=-1?this._offsetRows:0));
			intNum++;
		}
		this._offsetBytes=0+br.getCurrentOffsetBytes();
		this._offsetRows=0+br.getCurrentOffsetRows();
	}finally{
		try{
			br.close();
		}catch(e){}
	}
};
/**
 * The inner function to split a string to array 
 * according to the separator and the delimiter.
 * 
 * @param {String}
 *            rowdata: required<br>
 * @returns {Array}
 */
CSVReader.prototype._split = function (rowdata,index) {
	//the array for return
	var entry = [];
	//0:start,
	//1:the opening delimiter has dealed,
	//2:a second delimiter has dealed,
	//3:a un-delimited char has dealed
	var state = 0;
	//to keep all chars in one field
	var value = "";
	
	var separator = this._separator;
	var delimiter = this._delimiter;

	// process control chars individually, use look-ahead on non-control chars
	rowdata.replace(this._match, function(m0) {
		switch (state) {
			// the start of a value
			case 0:
				// null last value
				if (m0 === separator) {
					value += "";
					entry.push(value);value = "";state = 0;
					break;
				}
				// opening delimiter
				if (m0 === delimiter) {
					state = 1;
					break;
				}
				// skip un-delimited new-lines
				if (m0 === "\n" || m0 === "\r") {
					break;
				}
				// un-delimited value
				value += m0;
				state = 3;
				break;

				// delimited input
			case 1:
				// second delimiter? check further
				if (m0 === delimiter) {
					state = 2;
					break;
				}
				// delimited data
				value += m0;
				state = 1;
				break;

				// delimiter found in delimited input
			case 2:
				// escaped delimiter?
				if (m0 === delimiter) {
					value += m0;
					state = 1;
					break;
				}
				// null value
				if (m0 === separator) {
					entry.push(value);value = "";state = 0;
					break;
				}
				// skip un-delimited new-lines
				if (m0 === '\n' || m0 === '\r') {
					break;
				}
				// broken paser?
				throw new Packages.efw.CsvTxtDataException("Illegal state",index,rowdata);
				// un-delimited input
			case 3:
				// null last value
				if (m0 === separator) {
					entry.push(value);value = "";state = 0;
					break;
				}
				// skip un-delimited new-lines
				if (m0 === '\n' || m0 === '\r') {
					break;
				}
				// non-compliant data
				if (m0 === delimiter) {
					throw new Packages.efw.CsvTxtDataException("Illegal quote",index,rowdata);
				}
				// broken parser?
				throw new Packages.efw.CsvTxtDataException("Illegal data",index,rowdata);
			default:
				// shenanigans
				throw new Packages.efw.CsvTxtDataException("Unknown state",index,rowdata);
		}
	});

	// submit the last value
	entry.push(value);value = "";state = 0;
	return entry;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * The class to write CSV.<br>
 * @param {String}
 *			path: required<br>
 * @param {String}
 *			separator: optional<br>
 * @param {String}
 *			delimiter: optional<br>
 * @param {String}
 *			encoding: required<br>
 * @author Chang Kejun
 */
function CSVWriter(path, separator, delimiter, encoding) {
	if (this.constructor.name!="CSVWriter"){throw new Packages.efw.NewKeywordWasForgottenException("CSVWriter");}
	this._path = path;
	if (separator != null){this._separator = separator;}
	if (delimiter != null){this._delimiter = delimiter;}
	if (encoding != null){this._encoding = encoding;}
	this._printWriter = Packages.efw.csv.CSVManager.open(path,this._encoding);
};
/**
 * The attr to keep the path.
 */
CSVWriter.prototype._path = null;
/**
 * The attr to keep the separator.
 */
CSVWriter.prototype._separator = ",";
/**
 * The attr to keep the delimiter.
 */
CSVWriter.prototype._delimiter = "\"";
/**
 * The attr to keep the encoding.
 */
CSVWriter.prototype._encoding = "UTF-8";
/**
 * The attr to keep the java writter.
 */
CSVWriter.prototype._printWriter = null;
/**
 * The function to close the java writter.
 */
CSVWriter.prototype.close = function(){
	Packages.efw.csv.CSVManager.close(this._path);
};
/**
 * The inner function to close the java writter.
 */
CSVWriter.prototype._closeAll = function(){
	Packages.efw.csv.CSVManager.closeAll();
};
/**
 * The function to write all lines into the file.
 * @param {Array}
 *            aryLines: required<br>
 */
CSVWriter.prototype.writeAllLines = function(aryLines){
	var aryTemp = [];

	for (var i = 0; i < aryLines.length; i++) {
		aryTemp.push(this._join(aryLines[i]));
	}

	file.writeAllLines(this._path, aryTemp.join("\r\n"), this._encoding);
};
/**
 * The function to write an array into the file.
 * @param {Array}
 *            aryLine: required<br>
 */
CSVWriter.prototype.writeLine = function(aryLine){
	var strLine = this._join(aryLine);
	this._printWriter.println(strLine);
};
/**
 * The inner function to join an array into a string
 * according to the separator and the delimiter.
 * @param {Array}
 *            aryLine: required<br>
 * @returns {String}
 */
CSVWriter.prototype._join = function(aryLine){
	var lineValues=[];

	for (var i = 0; i < aryLine.length; i++) {
		var strValue = (aryLine[i] === undefined || aryLine[i] === null) ? '' : aryLine[i].toString();
		
		strValue=strValue.replace(/\r/g,"");

		if (strValue.indexOf(this._delimiter) > -1) {
			strValue = strValue.replace(new RegExp(this._delimiter, 'g'), this._delimiter + this._delimiter);
		}

		if (strValue.indexOf(this._delimiter) > -1||strValue.indexOf(this._separator) > -1||strValue.indexOf("\n") > -1) {
			strValue = this._delimiter + strValue + this._delimiter;
		}

		lineValues.push(strValue);
	}

	return lineValues.join(this._separator);
};
